export default function MapControls({
  onLocationClick,
  // onZoomIn,
  // onZoomOut,
  isLoadingGeoPosition,
}) {
  return (
    <div className="map-controls">
      <button
        onClick={onLocationClick}
        className="location-btn"
        disabled={isLoadingGeoPosition}
      >
        {isLoadingGeoPosition ? (
          <>
            <span className="spinner"></span>
            <span>Locating...</span>
          </>
        ) : (
          <>
            <span className="icon">📍</span>
            <span>My Location</span>
          </>
        )}
      </button>
      {/* <div className="zoom-controls">
        <button onClick={onZoomIn} className="zoom-btn">
          <span className="icon">+</span>
        </button>
        <span className="btn-divider"></span>
        <button onClick={onZoomOut} className="zoom-btn">
          <span className="icon">-</span>
        </button>
      </div> */}
    </div>
  );
}
