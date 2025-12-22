import ReactCountryFlag from "react-country-flag";

export default function BookmarkPopup({ item }) {
  return (
    <div className="bookmark-popup-content">
      <div className="bookmark-popup-main">
        <ReactCountryFlag
          svg
          countryCode={item.countryCode}
          className="bookmark-popup-flag"
        />
        <div className="bookmark-popup-info">
          <h4 className="bookmark-popup-title">{item.cityName}</h4>
          <p className="bookmark-popup-country">{item.country}</p>
        </div>
      </div>
      <div className="bookmark-popup-coords">
        <span>{Number(item.latitude).toFixed(4)}</span>
        <span>{Number(item.longitude).toFixed(4)}</span>
      </div>
    </div>
  );
}
