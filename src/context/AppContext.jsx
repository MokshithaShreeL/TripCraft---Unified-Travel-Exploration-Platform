import React, { createContext, useContext, useState, useEffect } from "react";
import { DEMO_USERS } from "../data/mockData";
import { locales, languageNames, defaultLocale, getNestedTranslation } from "../locales";
import { TRANSLATIONS } from "../data/i18n";
import { getFromStorage, saveToStorage, STORAGE_KEYS } from "../utils/storage";
import { apiService } from "../services/api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Theme state: 'dark' | 'light' | 'system'
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("tripcraft_theme") || "dark";
  });

  // Accent color state: 'teal' | 'blue' | 'purple' | 'orange' | 'rose' | 'green'
  const [accentColor, setAccentColorState] = useState(() => {
    return localStorage.getItem("tripcraft_accent") || "teal";
  });

  // Appearance Modal open/close state
  const [appearanceModalOpen, setAppearanceModalOpen] = useState(false);

  // Global Search Modal open/close state
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Apply Theme & Accent to document element
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("tripcraft_theme", theme);
    localStorage.setItem("tripcraft_accent", accentColor);

    // Apply accent attribute
    root.setAttribute("data-accent", accentColor);

    // Handle theme (light, dark, or system preference)
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else {
      root.setAttribute("data-theme", theme);
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme, accentColor]);

  // Listen for OS theme changes if in 'system' mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (theme === "system") {
        const root = document.documentElement;
        root.setAttribute("data-theme", e.matches ? "dark" : "light");
        if (e.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const setAccentColor = (newAccent) => {
    setAccentColorState(newAccent);
  };

  // Auth state - default to Priya Sharma (Traveler) for authentic travel experience
  const [currentUser, setCurrentUser] = useState(() => {
    return getFromStorage(STORAGE_KEYS.AUTH_USER, DEMO_USERS[1]);
  });
  const [jwtToken, setJwtToken] = useState(() => {
    return getFromStorage(STORAGE_KEYS.JWT_TOKEN, "tripcraft_session_valid");
  });

  // Language state (en, ta, hi)
  const [lang, setLang] = useState(() => {
    return getFromStorage(STORAGE_KEYS.LANGUAGE, defaultLocale);
  });

  // Currency state (INR, USD, EUR)
  const [currency, setCurrency] = useState(() => {
    return getFromStorage(STORAGE_KEYS.CURRENCY, "INR");
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    return getFromStorage(STORAGE_KEYS.WISHLIST, ["dest_munnar", "pkg_jaipur_royal_heritage"]);
  });

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    return getFromStorage(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: "notif_1",
        title: "Welcome to TripCraft",
        message: "Explore dynamic seasonal pricing, solo safety indexes, and verified stays.",
        timestamp: "10 mins ago",
        read: false,
        type: "system"
      },
      {
        id: "notif_2",
        title: "Price Alert: Munnar Highland Trails",
        message: "Weekday fares for Munnar are currently 25% lower than peak weekend rates.",
        timestamp: "2 hours ago",
        read: false,
        type: "promo"
      }
    ]);
  });

  // Recently viewed items (destinations, packages, hotels)
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    return getFromStorage(STORAGE_KEYS.RECENTLY_VIEWED, []);
  });

  // Toast notification system
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state changes to storage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.LANGUAGE, lang);
  }, [lang]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CURRENCY, currency);
  }, [currency]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WISHLIST, wishlist);
  }, [wishlist]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.RECENTLY_VIEWED, recentlyViewed);
  }, [recentlyViewed]);

  // Auth methods - Normal Traveler
  const loginWithCredentials = async (email, password) => {
    try {
      const res = await apiService.loginWithCredentials(email, password);
      setCurrentUser(res.user);
      setJwtToken(res.token);
      saveToStorage(STORAGE_KEYS.AUTH_USER, res.user);
      saveToStorage(STORAGE_KEYS.JWT_TOKEN, res.token);
      addToast(`Welcome back, ${res.user.name}!`, "success");
      return res;
    } catch (err) {
      addToast(err.message || "Invalid email or password", "error");
      throw err;
    }
  };

  // Auth methods - Dedicated Administrator Login
  const adminLogin = async (email, password) => {
    try {
      const res = await apiService.loginWithCredentials(email, password);
      if (res.user.role !== "admin") {
        throw new Error("Access denied. Authorized administrator credentials required.");
      }
      setCurrentUser(res.user);
      setJwtToken(res.token);
      saveToStorage(STORAGE_KEYS.AUTH_USER, res.user);
      saveToStorage(STORAGE_KEYS.JWT_TOKEN, res.token);
      addToast(`Administrator session initialized for ${res.user.name}`, "success");
      return res;
    } catch (err) {
      addToast(err.message || "Invalid administrator credentials", "error");
      throw err;
    }
  };

  const registerUser = async (name, email, password) => {
    const newUser = {
      id: "usr_" + Date.now(),
      name,
      email,
      role: "traveler",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80",
      phone: "+91 98000 00000",
      loyaltyTier: "Silver",
      loyaltyPoints: 500,
      memberSince: "Today",
      bio: "Excited explorer starting journeys with TripCraft."
    };
    setCurrentUser(newUser);
    const token = "tripcraft_session_" + Date.now();
    setJwtToken(token);
    saveToStorage(STORAGE_KEYS.AUTH_USER, newUser);
    saveToStorage(STORAGE_KEYS.JWT_TOKEN, token);
    addToast(`Account created! Welcome to TripCraft, ${name}.`, "success");
    return { user: newUser, token };
  };

  const loginWithOAuth = async (provider = "google") => {
    try {
      const res = await apiService.loginWithOAuth(provider);
      setCurrentUser(res.user);
      setJwtToken(res.token);
      saveToStorage(STORAGE_KEYS.AUTH_USER, res.user);
      saveToStorage(STORAGE_KEYS.JWT_TOKEN, res.token);
      addToast(`Signed in with Google as ${res.user.name}`, "success");
      return res;
    } catch (err) {
      addToast("Sign-in simulation failed", "error");
      throw err;
    }
  };

  const logout = () => {
    apiService.logout();
    setCurrentUser(null);
    setJwtToken(null);
    saveToStorage(STORAGE_KEYS.AUTH_USER, null);
    saveToStorage(STORAGE_KEYS.JWT_TOKEN, null);
    addToast("Signed out successfully", "info");
  };

  // Wishlist toggle
  const toggleWishlist = (itemId) => {
    setWishlist((prev) => {
      const exists = prev.includes(itemId);
      const next = exists ? prev.filter((id) => id !== itemId) : [...prev, itemId];
      addToast(exists ? "Removed from Wishlist" : "Saved to Wishlist", exists ? "info" : "success");
      return next;
    });
  };

  const isInWishlist = (itemId) => wishlist.includes(itemId);

  // Notifications
  const addNotification = (title, message, type = "info") => {
    const newNotif = {
      id: `notif_${Date.now()}`,
      title,
      message,
      timestamp: "Just now",
      read: false,
      type
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast("All notifications marked as read");
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    addToast("Notifications cleared");
  };

  // Recently viewed tracker
  const trackRecentlyViewed = (item) => {
    if (!item || !item.id) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      return [item, ...filtered].slice(0, 10);
    });
  };

  // Translation helper with variable interpolation
  const t = (path, params = {}) => {
    const activeDict = locales[lang] || locales.en;
    let translated = getNestedTranslation(activeDict, path);

    // Fallback to English if missing in chosen language
    if (!translated) {
      translated = getNestedTranslation(locales.en, path);
    }

    // Fallback to legacy TRANSLATIONS if present
    if (!translated) {
      const keys = path.split(".");
      let cur = TRANSLATIONS[lang] || TRANSLATIONS.en;
      for (const k of keys) {
        if (!cur || cur[k] === undefined) {
          let fb = TRANSLATIONS.en;
          for (const fbK of keys) {
            fb = fb?.[fbK];
          }
          cur = fb;
          break;
        }
        cur = cur[k];
      }
      translated = cur;
    }

    if (typeof translated !== "string") {
      return path;
    }

    // Interpolate parameters like {count}, {location}, {name}, {score}, {price}, etc.
    let output = translated;
    Object.keys(params).forEach((key) => {
      output = output.replace(new RegExp(`\\{${key}\\}`, "g"), params[key]);
    });

    return output;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        accentColor,
        setAccentColor,
        appearanceModalOpen,
        setAppearanceModalOpen,
        searchModalOpen,
        setSearchModalOpen,
        currentUser,
        jwtToken,
        isAdmin: currentUser?.role === "admin",
        demoUsers: DEMO_USERS,
        loginWithCredentials,
        adminLogin,
        registerUser,
        loginWithOAuth,
        logout,
        lang,
        setLang,
        languageNames,
        currency,
        setCurrency,
        wishlist,
        toggleWishlist,
        isInWishlist,
        notifications,
        unreadNotificationsCount: notifications.filter((n) => !n.read).length,
        addNotification,
        markAllNotificationsAsRead,
        clearAllNotifications,
        recentlyViewed,
        trackRecentlyViewed,
        toasts,
        addToast,
        removeToast,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
