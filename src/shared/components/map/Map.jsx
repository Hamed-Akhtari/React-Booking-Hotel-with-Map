import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";
import "leaflet/dist/leaflet.css";
import { useBookmark } from "../../../features/bookmarks/context/BookmarksProvider";
import { useHotels } from "../../../features/hotels/Context/HotelsProvider";
import MapControls from "../map/MapControls";
import MapMarkers from "../map/MapMarkers";
import MapHelpers from "../map/mapHelpers/MapHelpers";

function Map({ markerLocations, currentLocation }) {
  const [mapCenter, setMapCenter] = useState([52.3676, 4.9041]);
  const [zoom, setZoom] = useState(13);
  const [lat, lng] = useUrlLocation();
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  // const [mapInstance, setMapInstance] = useState(null);
  const location = useLocation();
  const isBookmarkPage = location.pathname === "/bookmark";
  const isHotelPage = location.pathname.startsWith("/hotels");
  const searchParams = new URLSearchParams(location.search);
  const hasLatLng = searchParams.has("lat") && searchParams.has("lng");

  const {
    isLoading: isLoadingGeoPosition,
    position: GeoLocationPosition,
    getPosition,
  } = useGeoLocation();

  const { dispatch } = useBookmark();
  const { setCurrentHotel } = useHotels();

  // Clear current selection when on bookmark page
  useEffect(() => {
    if ((isBookmarkPage || (isHotelPage && !hasLatLng)) && currentLocation) {
      dispatch({ type: "currentBookmark/cleared" });
      setCurrentHotel(null);
    }
  }, [
    isBookmarkPage,
    isHotelPage,
    hasLatLng,
    currentLocation,
    dispatch,
    setCurrentHotel,
  ]);

  // Clear selected position on bookmark page
  useEffect(() => {
    if (isBookmarkPage) {
      setSelectedPosition(null);
    }
  }, [location.pathname, markerLocations.length, isBookmarkPage]);

  // Set map center from URL
  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
      setZoom(17);
    }
  }, [lat, lng]);

  // Set user position from geolocation
  useEffect(() => {
    if (GeoLocationPosition?.lat && GeoLocationPosition?.lng) {
      setUserPosition([GeoLocationPosition.lat, GeoLocationPosition.lng]);
    }
  }, [GeoLocationPosition]);

  const handleLocationClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    getPosition();
  };

  // const handleZoomIn = () => mapInstance?.zoomIn();
  // const handleZoomOut = () => mapInstance?.zoomOut();

  return (
    <div className="map-section">
      <MapControls
        onLocationClick={handleLocationClick}
        // onZoomIn={handleZoomIn}
        // onZoomOut={handleZoomOut}
        isLoadingGeoPosition={isLoadingGeoPosition}
      />

      <MapContainer
        className="map"
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        // whenCreated={(map) => setMapInstance(map)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Map Helpers */}
        <MapHelpers
          GeoLocationPosition={GeoLocationPosition}
          markerLocations={markerLocations}
          currentLocation={currentLocation}
          isBookmarkPage={isBookmarkPage}
          isHotelPage={isHotelPage}
          setSelectedPosition={setSelectedPosition}
        />

        {/* Map Markers */}
        <MapMarkers
          markerLocations={markerLocations}
          currentLocation={currentLocation}
          selectedPosition={selectedPosition}
          userPosition={userPosition}
        />

        {/* Map attribution */}
        <div className="map-attribution right">
          © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
          contributors
        </div>
      </MapContainer>
    </div>
  );
}

export default Map;
