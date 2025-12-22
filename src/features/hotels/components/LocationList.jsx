import { Link } from "react-router-dom";
import Loader from "../../../shared/components/Loader/Loader";
import { useHotels } from "../Context/HotelsProvider";

function LocationList() {
  const { isLoading, hotels } = useHotels();

  if (isLoading) return <Loader />;

  if (hotels.length === 0) {
    return (
      <div className="locations-empty">
        <h2>No locations found</h2>
        <p>Try searching for other destinations</p>
      </div>
    );
  }

  return (
    <div className="locations-container">
      <div className="locations-header">
        <h1 className="locations-title">Explore Nearby Locations</h1>
        <p className="locations-subtitle">Discover amazing places to stay</p>
      </div>

      <div className="locations-grid">
        {hotels.slice(0, 6).map((hotel) => (
          <Link
            key={hotel.id}
            to={`/hotels/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}
            className="location-card-link"
          >
            <div className="location-card">
              <div className="location-image-container">
                <img
                  src={hotel.xl_picture_url || hotel.medium_url}
                  alt={hotel.name}
                  className="location-image"
                  loading="lazy"
                />
                <div className="location-overlay"></div>
              </div>
              <div className="location-info">
                <div className="location-header">
                  <h3 className="location-name">{hotel.name}</h3>
                  <div className="location-rating">
                    <span className="rating-star">⭐</span>
                    <span className="rating-score">
                      {hotel.review_scores_rating
                        ? `${hotel.review_scores_rating}/100`
                        : "New"}
                    </span>
                  </div>
                </div>
                <p className="location-address">
                  📍 {hotel.smart_location || `${hotel.city}, ${hotel.country}`}
                </p>
                <div className="location-features">
                  <span className="feature">🏠 {hotel.property_type}</span>
                  <span className="feature">
                    👤 {hotel.accommodates} guests
                  </span>
                  <span className="feature">
                    🛏 {hotel.bedrooms || 1} bedroom
                  </span>
                </div>
                <div className="location-price">
                  <span className="price-amount">€{hotel.price}</span>
                  <span className="price-unit"> / night</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="view-all-container">
        <Link to="/hotels" className="view-all-btn">
          View All Locations →
        </Link>
      </div>
    </div>
  );
}

export default LocationList;
