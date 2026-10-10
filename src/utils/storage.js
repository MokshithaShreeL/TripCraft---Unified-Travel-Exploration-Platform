// Safe LocalStorage Utility for TripCraft

export const STORAGE_KEYS = {
  AUTH_USER: "tripcraft_auth_user",
  JWT_TOKEN: "tripcraft_jwt_token",
  BOOKINGS: "tripcraft_bookings",
  WISHLIST: "tripcraft_wishlist",
  NOTIFICATIONS: "tripcraft_notifications",
  RECENTLY_VIEWED: "tripcraft_recently_viewed",
  SAVED_ITINERARY: "tripcraft_saved_itinerary",
  BUDGET_LOG: "tripcraft_budget_log",
  MEETUP_PROPOSALS: "tripcraft_meetup_proposals",
  USER_ALBUMS: "tripcraft_user_albums",
  LANGUAGE: "tripcraft_lang",
  CURRENCY: "tripcraft_curr"
};

export function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.warn(`Error reading key ${key} from localStorage:`, err);
    return defaultValue;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error saving key ${key} to localStorage:`, err);
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`Error removing key ${key} from localStorage:`, err);
  }
}
