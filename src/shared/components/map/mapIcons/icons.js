import L from "leaflet";

// Red Icon For Selected Location
const selectedIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [30, 46],
  iconAnchor: [15, 46],
  popupAnchor: [1, -34],
  shadowSize: [46, 46],
  className: "selected-marker",
});

// Blue Icon For Hotels & Bookmark
const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [1, -34],
  shadowSize: [42, 42],
  className: "hotel-marker",
});

// Purpule Icon For Current Location (Hotel & Bookmark)
const purpleIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [32, 50],
  iconAnchor: [16, 50],
  popupAnchor: [1, -34],
  shadowSize: [50, 50],
  className: "current-hotel-marker",
});

// آیکون سبز برای موقعیت کاربر
const userIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [26, 40],
  iconAnchor: [13, 40],
  popupAnchor: [1, -34],
  shadowSize: [40, 40],
  className: "user-marker",
});

export { selectedIcon, blueIcon, purpleIcon, userIcon };
