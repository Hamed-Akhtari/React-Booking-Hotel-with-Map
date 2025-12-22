import { useHotels } from "../Context/HotelsProvider";
import SidebarMapLayout from "../../../shared/layout/SidebarMapLayout";

function HotelLayout() {
  const { hotels, currentHotel, isLoading } = useHotels();
  const renderHotelInfo = (hotel) => <CurrentHotelInfo currentHotel={hotel} />;

  return (
    <SidebarMapLayout
      items={hotels}
      currentItem={currentHotel}
      isLoading={isLoading}
      emptyMessage="No Hotels Found"
      emptyDescription="Try Adjusting Your Search Criteria"
      showCurrentItemInfo={true}
      renderCurrentItemInfo={renderHotelInfo}
      loadingTitle="Hotels"
    />
  );
}

export default HotelLayout;

function CurrentHotelInfo({ currentHotel }) {
  return (
    <div className="current-hotel-card">
      <h4 className="hotel-name">{currentHotel.name}</h4>

      <div className="hotel-basic-info">
        <div className="info-row">
          <span className="rating">
            <span className="star">⭐</span>
            <span className="score">
              {currentHotel.review_scores_rating
                ? `${currentHotel.review_scores_rating}/100`
                : "New"}
            </span>
          </span>

          <span className="location">
            <span className="pin">📍</span>
            {currentHotel.smart_location}
          </span>
        </div>

        <div className="info-row">
          <span className="detail">
            <span className="icon">🏠</span>
            <span className="text">{currentHotel.property_type}</span>
          </span>

          <span className="detail">
            <span className="icon">👤</span>
            <span className="text">{currentHotel.accommodates} guests</span>
          </span>

          <span className="detail price">
            <span className="amount">€{currentHotel.price}</span>
            <span className="unit">/ night</span>
          </span>
        </div>
      </div>
    </div>
  );
}
