import { blueIcon, purpleIcon, selectedIcon, userIcon } from "./icons";

export function getMarkerIcon({
  item,
  currentLocation,
  isSelectedPosition = false,
  isUserPosition = false,
}) {
  // 1. User's current location (green icon)
  if (isUserPosition) {
    return userIcon;
  }

  // 2. Selected position when adding bookmark (red icon)
  if (isSelectedPosition) {
    return selectedIcon;
  }

  // 3. Current selected hotel/bookmark (purple icon)
  if (currentLocation && item && currentLocation.id === item.id) {
    return purpleIcon;
  }

  // 4. Default blue icon for all other markers
  return blueIcon;
}

export function getUserLocationIcon() {
  return userIcon;
}

export function getSelectedPositionIcon() {
  return selectedIcon;
}

export function getCurrentItemIcon() {
  return purpleIcon;
}

export function getDefaultIcon() {
  return blueIcon;
}

export function getHotelIcon(item, currentHotel) {
  if (currentHotel && item.id === currentHotel.id) {
    return purpleIcon;
  }
  return blueIcon;
}

export function getBookmarkIcon(item, currentBookmark) {
  if (currentBookmark && item.id === currentBookmark.id) {
    return purpleIcon;
  }
  return blueIcon;
}

export default {
  getMarkerIcon,
  getUserLocationIcon,
  getSelectedPositionIcon,
  getCurrentItemIcon,
  getDefaultIcon,
  getHotelIcon,
  getBookmarkIcon,
};
