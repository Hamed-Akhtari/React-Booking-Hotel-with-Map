import { useLocation } from "react-router-dom";
import AnimatedCenter from "./AnimatedCenter";
import DetectClick from "./DetectClick";
import FitBoundsToMarkers from "./FitBoundsToMarkers";
import FlyToUserLocation from "./FlyToUserLocation";

export default function MapHelpers({
  GeoLocationPosition,
  markerLocations,
  currentLocation,
  isBookmarkPage,
  isHotelPage,
  setSelectedPosition,
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hasLatLng = searchParams.has("lat") && searchParams.has("lng");
  return (
    <>
      {/* Move To User Location */}
      {GeoLocationPosition && (
        <FlyToUserLocation position={GeoLocationPosition} />
      )}

      {/* Fit bounds for multiple markers */}
      {(isBookmarkPage || (isHotelPage && !hasLatLng)) && (
        <FitBoundsToMarkers markerLocations={markerLocations} />
      )}

      {/* Enable click detection on bookmark page */}
      {location.pathname.startsWith("/bookmark") && (
        <DetectClick setSelectedPosition={setSelectedPosition} />
      )}

      {/* Animate to current location */}
      {currentLocation && !(isBookmarkPage || (isHotelPage && !hasLatLng)) && (
        <AnimatedCenter
          markerLocations={markerLocations}
          currentLocation={currentLocation}
        />
      )}
    </>
  );
}
