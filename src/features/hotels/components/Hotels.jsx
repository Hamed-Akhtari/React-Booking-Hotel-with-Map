import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";

function Hotels() {
  const { hotels, currentHotel } = useHotels();

  return (
    <div className="hotels-container">
      <div className="hotels-header">
        <h1 className="hotels-title">Available Stays</h1>
        <p className="hotels-count">{hotels.length} properties found</p>
      </div>

      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <Link
            key={hotel.id}
            to={`/hotels/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}
            className={`hotel-card-link ${
              hotel.id === currentHotel?.id ? "current-hotel" : ""
            }`}
          >
            <div className="hotel-card">
              {/* Hotel Image */}
              <div className="hotel-image-container">
                <img
                  src={
                    hotel.xl_picture_url ||
                    hotel.medium_url ||
                    hotel.thumbnail_url
                  }
                  alt={hotel.name}
                  className="hotel-image"
                  loading="lazy"
                />
                {hotel.id === currentHotel?.id && (
                  <div className="current-badge">Viewing</div>
                )}
              </div>

              {/* Hotel Info */}
              <div className="hotel-info">
                <div className="hotel-header-info">
                  <h3 className="hotel-name">{hotel.name}</h3>
                  <div className="hotel-rating">
                    <span className="rating-star">⭐</span>
                    <span className="rating-score">
                      {hotel.review_scores_rating
                        ? `${hotel.review_scores_rating}/100`
                        : "New"}
                    </span>
                    <span className="review-count">
                      ({hotel.number_of_reviews || 0})
                    </span>
                  </div>
                </div>

                <p className="hotel-location">
                  📍 {hotel.smart_location || `${hotel.city}, ${hotel.country}`}
                </p>

                <p className="hotel-type">
                  {hotel.property_type} • {hotel.room_type}
                </p>

                <div className="hotel-capacity">
                  <span className="capacity-item">
                    👤 {hotel.accommodates} guests
                  </span>
                  <span className="capacity-item">
                    🛏 {hotel.bedrooms || 1} bedroom
                  </span>
                  <span className="capacity-item">
                    🛌 {hotel.beds || 1} bed
                  </span>
                </div>

                {/* Amenities Preview */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="amenities-preview">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="amenity-tag">
                        {amenity.includes("Internet")
                          ? "WiFi"
                          : amenity.includes("Kitchen")
                          ? "Kitchen"
                          : amenity.includes("TV")
                          ? "TV"
                          : amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="amenity-more">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Price & Book */}
                <div className="hotel-footer">
                  <div className="price-section">
                    <span className="price-amount">€{hotel.price}</span>
                    <span className="price-unit"> / night</span>
                  </div>
                  <button className="view-details-btn">View Details →</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
