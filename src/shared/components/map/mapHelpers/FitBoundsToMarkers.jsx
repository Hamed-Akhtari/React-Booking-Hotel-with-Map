import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function FitBoundsToMarkers({ markerLocations }) {
  const map = useMap();

  useEffect(() => {
    if (markerLocations.length > 0) {
      const bounds = L.latLngBounds(
        markerLocations.map((marker) => [marker.latitude, marker.longitude])
      );

      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15,
        animate: true,
        duration: 1,
      });
    }
  }, [map, markerLocations]);

  return null;
}
