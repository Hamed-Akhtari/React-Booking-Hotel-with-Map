import { useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";

export default function DetectClick({ setSelectedPosition }) {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      setSelectedPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}
