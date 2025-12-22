import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarksProvider";
import Loader from "../../../shared/components/Loader/Loader";
import { HiArrowLeft } from "react-icons/hi";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, isLoading, currentBookmark } = useBookmark();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading || !currentBookmark) return <Loader title="Bookmark" />;

  return (
    <div className="single-bookmark">
      {/* Floating Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="back-btn-floating"
        aria-label="Go back"
      >
        <HiArrowLeft className="back-icon" />
      </button>

      <div className="bookmark-container">
        {/* Header */}
        <div className="bookmark-header">
          <div className="bookmark-title-section">
            <h1 className="bookmark-title">{currentBookmark.cityName}</h1>
            <div className="country-flag">
              <ReactCountryFlag
                svg
                countryCode={currentBookmark.countryCode}
                style={{
                  fontSize: "2em",
                  lineHeight: "2em",
                }}
                title={currentBookmark.country}
              />
            </div>
          </div>

          <div className="bookmark-subtitle">
            <span className="country">📍 {currentBookmark.country}</span>
            <span className="coordinates">
              🗺️ {parseFloat(currentBookmark.latitude).toFixed(4)},{" "}
              {parseFloat(currentBookmark.longitude).toFixed(4)}
            </span>
          </div>
        </div>

        {/* Location Details */}
        <div className="bookmark-info-grid">
          <div className="info-card">
            <h3>🌍 Country</h3>
            <p>{currentBookmark.country}</p>
            <small>Country Code: {currentBookmark.countryCode}</small>
          </div>

          <div className="info-card">
            <h3>📍 Coordinates</h3>
            <p>
              Latitude: {parseFloat(currentBookmark.latitude).toFixed(6)}
              <br />
              Longitude: {parseFloat(currentBookmark.longitude).toFixed(6)}
            </p>
          </div>

          <div className="info-card">
            <h3>🏙️ City</h3>
            <p>{currentBookmark.cityName}</p>
            <small>Full Location: {currentBookmark.host_location}</small>
          </div>
        </div>

        {/* Actions */}
        <div className="action-buttons">
          <button
            className="find-hotels-btn"
            onClick={() =>
              navigate(`/hotels?destination=${currentBookmark.cityName}`)
            }
          >
            🏨 Find Hotels Nearby
          </button>
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <h3>ℹ️ About This Location</h3>
          <div className="info-content">
            <p>
              This bookmark saves the location of{" "}
              <strong>{currentBookmark.cityName}</strong> in{" "}
              <strong>{currentBookmark.country}</strong>. You can use this saved
              location to quickly find accommodations or explore the area.
            </p>
            <div className="info-tips">
              <h4>💡 Tips:</h4>
              <ul>
                <li>
                  Use &#34;Find Hotels Nearby&#34; to search for accommodations
                  in this area
                </li>
                <li>
                  This bookmark helps you quickly return to important locations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBookmark;
