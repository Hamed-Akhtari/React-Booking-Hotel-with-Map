import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function AnimatedCenter({ markerLocations, currentLocation }) {
  const map = useMap();

  useEffect(() => {
    if (currentLocation) {
      const selectedItem = markerLocations.find(
        (item) => item.id === currentLocation.id
      );
      if (selectedItem) {
        map.flyTo([selectedItem.latitude, selectedItem.longitude], 17, {
          duration: 1.5,
          easeLinearity: 0.25,
        });
      }
    }
  }, [map, markerLocations, currentLocation]);

  return null;
}
