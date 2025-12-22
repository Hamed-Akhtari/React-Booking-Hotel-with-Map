export default function HotelPopup({ item }) {
  return (
    <div className="hotel-popup-content">
      <div className="hotel-popup-header">
        <h4 className="hotel-popup-name">{item.name}</h4>
        <div className="hotel-popup-location">
          <span>📍</span>
          <span>{item.smart_location || item.host_location}</span>
        </div>
      </div>
      <hr className="hotel-popup-divider" />
      <div className="hotel-popup-details">
        <div className="hotel-popup-detail">
          <span>🏠</span>
          <span>{item.property_type}</span>
        </div>
        <div className="hotel-popup-detail">
          <span>👤</span>
          <span>{item.accommodates} guests</span>
        </div>
        {item.review_scores_rating && (
          <div className="hotel-popup-detail">
            <span>⭐</span>
            <span>{item.review_scores_rating}/100</span>
          </div>
        )}
        <div className="hotel-popup-detail">
          <span>🛏</span>
          <span>{item.beds || 1} bed</span>
        </div>
      </div>

      <div className="hotel-popup-price">
        <span className="hotel-popup-price-amount">€{item.price}</span>
        <span className="hotel-popup-price-unit">per night</span>
      </div>
    </div>
  );
}
