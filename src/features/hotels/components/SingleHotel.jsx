import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { HiArrowLeft } from "react-icons/hi";
import Loader from "../../../shared/components/Loader/Loader";
import { useHotels } from "../context/HotelsProvider";

function SingleHotel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (!currentHotel) return <Loader title="Hotel Details" />;

  const renderRatingStars = (rating) => {
    if (!rating) return "No rating";
    const stars = Math.round(rating / 20);
    return "⭐".repeat(stars) + ` (${rating}/100)`;
  };

  const renderGuestInfo = () => {
    const { accommodates, guests_included, extra_people } = currentHotel;
    let info = `Capacity: ${accommodates} guests`;

    if (guests_included > 1) {
      info += ` (${guests_included} included in price)`;
    }

    if (extra_people > 0) {
      info += ` - Extra person: $${extra_people}`;
    }

    return info;
  };

  return (
    <div className="single-hotel">
      <div className="hotel-container">
        {/* Main Header */}
        <div className="hotel-header">
          <h1 className="hotel-title">{currentHotel.name}</h1>
          <div className="hotel-subtitle">
            <span className="location">
              📍{" "}
              {currentHotel.smart_location ||
                `${currentHotel.city}, ${currentHotel.country}`}
            </span>
            <span className="reviews">
              ⭐{" "}
              {currentHotel.review_scores_rating
                ? `${currentHotel.review_scores_rating}/100`
                : "No rating"}{" "}
              • {currentHotel.number_of_reviews || 0} reviews
            </span>
          </div>
        </div>

        {/* Gallery */}
        <div className="gallery">
          <img
            src={currentHotel.xl_picture_url || currentHotel.medium_url}
            alt={currentHotel.name}
            className="main-image"
          />
        </div>

        {/* Main Info */}
        <div className="hotel-info-grid">
          <div className="info-card">
            <h3>🛌 Property Type</h3>
            <p>
              {currentHotel.property_type} • {currentHotel.room_type}
            </p>
          </div>

          <div className="info-card">
            <h3>👥 Accommodation</h3>
            <p>{renderGuestInfo()}</p>
            <small>
              Bedrooms: {currentHotel.bedrooms || 1} • Beds:{" "}
              {currentHotel.beds || 1}
            </small>
          </div>

          <div className="info-card">
            <h3>🚿 Bathrooms</h3>
            <p>{currentHotel.bathrooms || 1} full bathroom(s)</p>
          </div>

          <div className="info-card">
            <h3>📅 Minimum Stay</h3>
            <p>{currentHotel.minimum_nights} nights</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="pricing-card">
          <div className="price-display">
            <span className="price">${currentHotel.price}</span>
            <span className="price-unit">/ night</span>
          </div>

          <div className="fee-details">
            {currentHotel.cleaning_fee && (
              <div className="fee-row">
                <span>Cleaning fee:</span>
                <span>${currentHotel.cleaning_fee}</span>
              </div>
            )}

            {currentHotel.security_deposit && (
              <div className="fee-row">
                <span>Security deposit:</span>
                <span>${currentHotel.security_deposit}</span>
              </div>
            )}

            <div className="policy-row">
              <span>Cancellation Policy:</span>
              <span
                className={`policy-tag ${currentHotel.cancellation_policy}`}
              >
                {currentHotel.cancellation_policy === "flexible"
                  ? "Flexible"
                  : currentHotel.cancellation_policy === "moderate"
                  ? "Moderate"
                  : currentHotel.cancellation_policy === "strict"
                  ? "Strict"
                  : currentHotel.cancellation_policy}
              </span>
            </div>
          </div>

          <button className="book-btn" onClick={() => alert("Booked!")}>
            Book Now
          </button>
        </div>

        {/* Description */}
        <div className="description-section">
          <h3>📖 About this property</h3>
          <p className="summary">{currentHotel.summary}</p>
          {currentHotel.description && (
            <p className="full-description">{currentHotel.description}</p>
          )}
          {currentHotel.space && (
            <div className="space-description">
              <h4>The Space:</h4>
              <p>{currentHotel.space}</p>
            </div>
          )}
        </div>

        {/* Amenities */}
        {currentHotel.amenities && currentHotel.amenities.length > 0 && (
          <div className="amenities-section">
            <h3>✨ Amenities</h3>
            <div className="amenities-grid">
              {currentHotel.amenities.slice(0, 12).map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <span className="amenity-icon">
                    {amenity.includes("Internet")
                      ? "🌐"
                      : amenity.includes("TV")
                      ? "📺"
                      : amenity.includes("Kitchen")
                      ? "🍳"
                      : amenity.includes("Heating")
                      ? "🔥"
                      : amenity.includes("Washer")
                      ? "🧺"
                      : "✓"}
                  </span>
                  <span>
                    {amenity.replace(
                      "translation missing: en.hosting_amenity_",
                      "Special amenity "
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Host Info */}
        <div className="host-section">
          <h3>👤 Host</h3>
          <div className="host-info">
            <img
              src={
                currentHotel.host_picture_url || currentHotel.host_thumbnail_url
              }
              alt={currentHotel.host_name}
              className="host-avatar"
            />
            <div className="host-details">
              <h4>{currentHotel.host_name}</h4>
              {currentHotel.host_about && (
                <p className="host-bio">{currentHotel.host_about}</p>
              )}
              <div className="host-stats">
                {currentHotel.host_since && (
                  <span>
                    Host since:{" "}
                    {new Date(currentHotel.host_since).getFullYear()}
                  </span>
                )}
                {currentHotel.host_total_listings_count > 1 && (
                  <span>
                    • {currentHotel.host_total_listings_count} other listings
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {currentHotel.review_scores_rating && (
          <div className="reviews-section">
            <h3>📝 Guest Reviews</h3>
            <div className="review-scores">
              <div className="score-item">
                <span>Overall rating:</span>
                <strong>
                  {renderRatingStars(currentHotel.review_scores_rating)}
                </strong>
              </div>
              <div className="score-item">
                <span>Cleanliness:</span>
                <strong>{currentHotel.review_scores_cleanliness}/10</strong>
              </div>
              <div className="score-item">
                <span>Location:</span>
                <strong>{currentHotel.review_scores_location}/10</strong>
              </div>
              <div className="score-item">
                <span>Value:</span>
                <strong>{currentHotel.review_scores_value}/10</strong>
              </div>
            </div>
          </div>
        )}

        {/* House Rules */}
        {currentHotel.house_rules && (
          <div className="rules-section">
            <h3>📜 House Rules</h3>
            <p className="rules-text">{currentHotel.house_rules}</p>
          </div>
        )}

        {/* Access & Transit */}
        {(currentHotel.access || currentHotel.transit) && (
          <div className="access-section">
            <h3>🚪 Access & Transportation</h3>
            {currentHotel.access && (
              <div className="access-item">
                <h4>Access:</h4>
                <p>{currentHotel.access}</p>
              </div>
            )}
            {currentHotel.transit && (
              <div className="access-item">
                <h4>Public Transit:</h4>
                <p>{currentHotel.transit}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="back-btn-floating"
        aria-label="Go back"
      >
        <HiArrowLeft className="back-icon" />
      </button>
    </div>
  );
}

export default SingleHotel;
