import { Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { getMarkerIcon } from "./mapIcons/IconFactory";
import BookmarkPopup from "./mapPopups/BookmarkPopup";
import HotelPopup from "./mapPopups/HotelPopup";

export default function MapMarkers({
  markerLocations,
  currentLocation,
  selectedPosition,
  userPosition,
}) {
  const location = useLocation();
  const isHotelPage = location.pathname.startsWith("/hotels");

  return (
    <>
      {/* User location marker */}
      {userPosition && (
        <Marker
          position={userPosition}
          icon={getMarkerIcon({
            isUserPosition: true,
          })}
        >
          <Popup>
            <div className="popup-content">
              <h4>Your Location</h4>
              <p>You are here!</p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Main markers for hotels/bookmarks */}
      {markerLocations.map((item) => (
        <Marker
          key={item.id}
          position={[item.latitude, item.longitude]}
          icon={getMarkerIcon({
            item,
            currentLocation,
            isSelectedPosition: false,
            isUserPosition: false,
          })}
          eventHandlers={{
            mouseover: (e) => e.target.openPopup(),
            mouseout: (e) => e.target.closePopup(),
          }}
        >
          <Popup
            className={`map-popup ${
              isHotelPage ? "hotel-popup" : "bookmark-popup"
            }`}
          >
            {isHotelPage ? (
              <HotelPopup item={item} />
            ) : (
              <BookmarkPopup item={item} />
            )}
          </Popup>
        </Marker>
      ))}

      {/* Selected position marker (for bookmark page) */}
      {selectedPosition && (
        <Marker
          position={[selectedPosition.lat, selectedPosition.lng]}
          icon={getMarkerIcon({
            isSelectedPosition: true,
          })}
        >
          <Popup className="map-popup bookmark-popup">
            <div className="bookmark-popup-content">
              <div className="bookmark-popup-main">
                <div className="bookmark-popup-info">
                  <h4 className="bookmark-popup-title">Selected Location:</h4>
                </div>
              </div>
              <div className="bookmark-popup-coords">
                <span>{Number(selectedPosition.lat).toFixed(4)}</span>
                <span>{Number(selectedPosition.lng).toFixed(4)}</span>
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
}
