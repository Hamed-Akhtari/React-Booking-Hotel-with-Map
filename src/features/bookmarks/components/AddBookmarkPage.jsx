import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarksProvider";
import useUrlLocation from "../../../shared/hooks/useUrlLocation";
import Loader from "../../../shared/components/Loader/Loader";
import {
  HiArrowLeft,
  HiLocationMarker,
  HiGlobe,
  HiFlag,
  HiCheck,
  HiExclamationCircle,
} from "react-icons/hi";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");
  const [latlngError, setLatLngError] = useState("");
  const { createBookmark, isLoading: isCreating } = useBookmark();

  useEffect(() => {
    async function fetchLocationData() {
      if (!lat || !lng) {
        setLatLngError("Please click on a location on the map.");
        return;
      }
      setIsLoadingGeoCoding(true);
      setGeoCodingError("");
      setLatLngError("");
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "📍 This location is not a city! Please click on a different location on the map."
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setCountryCode(data.countryCode || "");
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + ", " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoCoding) return <Loader title="Fetching Location Data" />;

  if (latlngError)
    return (
      <div className="alert-container">
        <div className="alert-card">
          <HiExclamationCircle className="alert-icon" />
          <h2>Location Alert</h2>
          <p className="alert-message">{latlngError}</p>
        </div>
      </div>
    );

  if (geoCodingError)
    return (
      <div className="error-container">
        <div className="error-card">
          <HiExclamationCircle className="error-icon" />
          <h2>Location Error</h2>
          <p className="error-message">{geoCodingError}</p>
          <button onClick={() => navigate("/bookmark")} className="back-btn">
            <HiArrowLeft /> Go Back to Map
          </button>
        </div>
      </div>
    );

  return (
    <div className="add-bookmark-page">
      {/* Floating Back Button */}
      <button
        onClick={() => navigate("/bookmark")}
        className="back-btn-floating"
        aria-label="Go back"
      >
        <HiArrowLeft className="back-icon" />
      </button>

      <div className="add-bookmark-container">
        {/* Header Section */}
        <div className="add-bookmark-header">
          <div className="header-content">
            <h1 className="page-title">
              <HiLocationMarker className="title-icon" />
              Add New Bookmark
            </h1>
            <p className="page-subtitle">
              Save this location to your bookmarks for quick access
            </p>
          </div>

          <div className="location-preview">
            <div className="coordinate-badge">
              <span className="coord-label">Latitude:</span>
              <span className="coord-value">{parseFloat(lat).toFixed(6)}</span>
            </div>
            <div className="coordinate-badge">
              <span className="coord-label">Longitude:</span>
              <span className="coord-value">{parseFloat(lng).toFixed(6)}</span>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="form-card">
          <div className="form-header">
            <h2>
              <HiCheck className="form-icon" />
              Location Details
            </h2>
            <p className="form-description">
              Review and edit the location information below
            </p>
          </div>

          <form className="bookmark-form" onSubmit={handleSubmit}>
            {/* City Input */}
            <div className="form-group">
              <label htmlFor="cityName" className="form-label">
                <HiLocationMarker className="input-icon" />
                City Name
              </label>
              <div className="input-wrapper">
                <input
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  type="text"
                  name="cityName"
                  id="cityName"
                  className="form-input"
                  placeholder="Enter city name"
                  required
                />
                <div className="input-border"></div>
              </div>
              <small className="input-help">
                The city name at this location
              </small>
            </div>

            {/* Country Input */}
            <div className="form-group">
              <label htmlFor="country" className="form-label">
                <HiGlobe className="input-icon" />
                Country
              </label>
              <div className="input-wrapper">
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  name="country"
                  id="country"
                  className="form-input"
                  placeholder="Enter country name"
                  required
                />
                <div className="country-flag-preview">
                  {countryCode && (
                    <ReactCountryFlag
                      svg
                      countryCode={countryCode}
                      style={{
                        fontSize: "1.5em",
                      }}
                      title={country}
                    />
                  )}
                </div>
                <div className="input-border"></div>
              </div>
              <div className="country-info">
                {countryCode && (
                  <>
                    <span className="country-code-badge">
                      <HiFlag /> Country Code: {countryCode}
                    </span>
                    <small className="input-help">
                      Flag will be displayed in bookmarks
                    </small>
                  </>
                )}
              </div>
            </div>

            {/* Preview Card */}
            <div className="preview-card">
              <h3>
                <HiLocationMarker className="preview-icon" />
                Preview
              </h3>
              <div className="preview-content">
                <div className="preview-item">
                  <span className="preview-label">Location:</span>
                  <span className="preview-value">
                    {cityName ? `${cityName}, ${country}` : "Not specified"}
                  </span>
                </div>
                <div className="preview-item">
                  <span className="preview-label">Coordinates:</span>
                  <span className="preview-value">
                    {lat && lng
                      ? `${parseFloat(lat).toFixed(4)}, ${parseFloat(
                          lng
                        ).toFixed(4)}`
                      : "Not available"}
                  </span>
                </div>
                {countryCode && (
                  <div className="preview-item">
                    <span className="preview-label">Country Flag:</span>
                    <div className="flag-preview">
                      <ReactCountryFlag
                        svg
                        countryCode={countryCode}
                        style={{
                          fontSize: "1.5em",
                        }}
                        title={country}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={isCreating || !cityName || !country}
              >
                {isCreating ? (
                  <>
                    <span className="loading-spinner"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <HiCheck /> Add to Bookmarks
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewBookmark;
