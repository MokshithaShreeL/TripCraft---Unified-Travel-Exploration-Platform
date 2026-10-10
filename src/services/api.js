// TripCraft Unified REST API Client (Connecting to Node.js/Express + MySQL Backend with Graceful Local Fallback)

import { DEMO_USERS, DESTINATIONS, PACKAGES, HOTELS, TRANSPORT_DATA, PHOTO_ALBUMS } from "../data/mockData";
import { getFromStorage, saveToStorage, STORAGE_KEYS } from "../utils/storage";

const API_BASE_URL = "http://localhost:5000/api";

// Helper to base64url encode JSON
function base64UrlEncode(obj) {
  const jsonStr = JSON.stringify(obj);
  return btoa(unescape(encodeURIComponent(jsonStr)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Generate realistic simulated JWT Token
export function generateJWT(user) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    loyaltyTier: user.loyaltyTier || user.loyalty_tier || "Silver",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 // 7 days
  };
  const mockSignature = "tc_sig_" + Math.random().toString(36).substring(2, 18);
  return `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.${mockSignature}`;
}

// Parse simulated JWT
export function decodeJWT(token) {
  try {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(base64))));
  } catch (e) {
    return null;
  }
}

// Simulated network latency helper
const delay = (ms = 250) => new Promise((res) => setTimeout(res, ms));

export const apiService = {
  // Authentication
  async loginWithCredentials(email, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        saveToStorage(STORAGE_KEYS.AUTH_USER, data.user);
        saveToStorage(STORAGE_KEYS.JWT_TOKEN, data.token);
        return data;
      }
    } catch (networkErr) {
      console.info("Backend server offline, executing local authentication engine.");
    }

    // Fallback authentication
    await delay(350);
    const user = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      throw new Error("Invalid email or password. Please verify credentials.");
    }
    const token = generateJWT(user);
    saveToStorage(STORAGE_KEYS.AUTH_USER, user);
    saveToStorage(STORAGE_KEYS.JWT_TOKEN, token);
    return { user, token };
  },

  async loginWithOAuth(provider = "google") {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/oauth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider })
      });
      if (res.ok) {
        const data = await res.json();
        saveToStorage(STORAGE_KEYS.AUTH_USER, data.user);
        saveToStorage(STORAGE_KEYS.JWT_TOKEN, data.token);
        return data;
      }
    } catch (networkErr) {
      console.info("Backend server offline, executing local OAuth simulation.");
    }

    await delay(450);
    const user = DEMO_USERS[1]; // Priya Sharma
    const token = generateJWT(user);
    saveToStorage(STORAGE_KEYS.AUTH_USER, user);
    saveToStorage(STORAGE_KEYS.JWT_TOKEN, token);
    return { user, token, provider };
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
  },

  // Destinations & Inventory
  async getDestinations() {
    try {
      const res = await fetch(`${API_BASE_URL}/destinations`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) return json.data;
      }
    } catch (e) {
      // fallback
    }
    await delay(200);
    return DESTINATIONS;
  },

  async getDestinationById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/destinations/${id}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // fallback
    }
    await delay(150);
    return DESTINATIONS.find((d) => d.id === id) || null;
  },

  async getPackages() {
    await delay(200);
    return PACKAGES;
  },

  async getHotels() {
    await delay(200);
    return HOTELS;
  },

  async getTransport() {
    await delay(200);
    return TRANSPORT_DATA;
  },

  // Bookings
  async getBookings() {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // fallback
    }
    await delay(250);
    return getFromStorage(STORAGE_KEYS.BOOKINGS, []);
  },

  async createBooking(bookingData) {
    try {
      const token = getFromStorage(STORAGE_KEYS.JWT_TOKEN);
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
      if (res.ok) {
        const json = await res.json();
        const current = getFromStorage(STORAGE_KEYS.BOOKINGS, []);
        saveToStorage(STORAGE_KEYS.BOOKINGS, [json.data, ...current]);
        return json.data;
      }
    } catch (e) {
      // fallback
    }

    await delay(600);
    const newBooking = {
      id: `TC-BK-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      paymentStatus: "Paid",
      ...bookingData
    };
    const current = getFromStorage(STORAGE_KEYS.BOOKINGS, []);
    const updated = [newBooking, ...current];
    saveToStorage(STORAGE_KEYS.BOOKINGS, updated);
    return newBooking;
  },

  async updateBookingStatus(bookingId, newStatus) {
    try {
      await fetch(`${API_BASE_URL}/admin/bookings/${bookingId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      // fallback
    }
    const current = getFromStorage(STORAGE_KEYS.BOOKINGS, []);
    const updated = current.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b));
    saveToStorage(STORAGE_KEYS.BOOKINGS, updated);
    return updated;
  },

  // API Developer Key generation
  generateApiKey(label = "Sandbox Key") {
    const key = `tc_live_${Math.random().toString(36).substring(2, 15)}_${Date.now().toString(36)}`;
    return {
      key,
      label,
      created: new Date().toISOString(),
      quota: "10,000 req/month",
      status: "Active"
    };
  }
};
