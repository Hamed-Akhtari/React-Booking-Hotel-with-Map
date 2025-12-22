import { Outlet } from "react-router-dom";
import Map from "../components/map/Map";
import Loader from "../components/Loader/Loader";

function SidebarMapLayout({
  items = [],
  currentItem = null,
  isLoading = false,
  loadingTitle = "",
  emptyMessage = "No items found",
  emptyDescription = "Try adjusting your criteria",
  showCurrentItemInfo = false,
  renderCurrentItemInfo = null,
}) {
  if (isLoading) return <Loader title={loadingTitle} />;

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h2>{emptyMessage}</h2>
        <p>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="appLayout">
      <div className="sidebar">
        <div className="sidebar-content">
          <Outlet />
        </div>
      </div>
      <div className="map-section map-container">
        <Map markerLocations={items} currentLocation={currentItem} />
        {showCurrentItemInfo &&
          renderCurrentItemInfo &&
          currentItem &&
          renderCurrentItemInfo(currentItem)}
      </div>
    </div>
  );
}

export default SidebarMapLayout;
