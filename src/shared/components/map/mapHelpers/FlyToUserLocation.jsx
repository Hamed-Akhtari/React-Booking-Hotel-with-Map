import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function FlyToUserLocation({ position, zoom = 15 }) {
  const map = useMap();

  useEffect(() => {
    if (position && position.lat && position.lng) {
      console.log("Flying to:", position);
      map.flyTo([position.lat, position.lng], zoom, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [map, position, zoom]);

  return null;
}
