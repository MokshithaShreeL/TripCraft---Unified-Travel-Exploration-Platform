import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Compass,
  Calendar,
  Shield,
  Users,
  Camera,
  Layers,
  PieChart,
  Heart,
  Bell,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  CheckCircle,
  Settings,
  Sparkles,
  Search,
  Palette,
  MoreHorizontal
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/pricing";

export default function Navbar() {
  const {
    currentUser,
    demoUsers,
    quickSwitchUser,
    logout,
    lang,
    setLang,
    languageNames,
    currency,
    setCurrency,
    wishlist,
    notifications,
    unreadNotificationsCount,
    markAllNotificationsAsRead,
    setAppearanceModalOpen,
    setSearchModalOpen,
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const userRef = useRef(null);
  const notifRef = useRef(null);
  const moreRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Primary navigation links visible on desktop
  const primaryNavLinks = [
    { to: "/destinations", label: t("nav.destinations"), icon: Compass },
    { to: "/packages", label: t("nav.packages"), icon: Layers },
    { to: "/hotels", label: t("nav.hotels"), icon: Compass },
    { to: "/local-guides", label: t("nav.guides") || "Local Guides", icon: Users, badge: "Verified" },
    { to: "/solo", label: t("nav.solo"), icon: Shield, badge: "Safety" },
    { to: "/transport", label: t("nav.transport"), icon: Calendar },
    { to: "/community", label: t("nav.community"), icon: Users }
  ];

  // Secondary navigation links in More dropdown
  const secondaryNavLinks = [
    { to: "/vehicles", label: "Vehicle Rentals", icon: Compass },
    { to: "/album", label: t("nav.albums"), icon: Camera },
    { to: "/itinerary", label: t("nav.itinerary"), icon: Calendar },
    { to: "/budget", label: t("nav.budget"), icon: PieChart }
  ];

  const allNavLinks = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <header className="sticky top-0 z-40 bg-navy-900 border-b border-slate-800 text-white shadow-md">
      {/* Top Utility Bar */}
      <div className="bg-navy-950 px-4 py-1 text-xs text-slate-300 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 text-teal-400 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>Real-World Dynamic Pricing & 256-Bit SSL Booking</span>
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">
            Emergency Women Helpline: <strong className="text-white">1091</strong> | Police: <strong className="text-white">112</strong>
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Appearance Settings Button */}
          <button
            onClick={() => setAppearanceModalOpen(true)}
            className="flex items-center space-x-1.5 text-slate-300 hover:text-teal-400 transition-colors cursor-pointer"
            title="Theme & Appearance Settings"
          >
            <Palette className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Appearance</span>
          </button>

          {/* Currency Switcher */}
          <div className="flex items-center space-x-1">
            <span className="text-slate-400">Curr:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-navy-800 text-slate-200 rounded px-1.5 py-0.5 border border-slate-700 text-xs focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-1">
            <span className="text-slate-400">Lang:</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-navy-800 text-slate-200 rounded px-1.5 py-0.5 border border-slate-700 text-xs focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-900/30 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-teal-400 transition-colors">
                TripCraft
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-teal-400 -mt-1">
                Travel & Safety
              </span>
            </div>
          </Link>

          {/* Global Search Bar Quick Trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl text-xs text-slate-400 transition-all shadow-inner w-44 lg:w-56"
          >
            <Search className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="flex-1 text-left truncate">Search destinations...</span>
            <kbd className="hidden lg:inline px-1 py-0.5 text-[9px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Desktop Navigation Links (Now visible at lg!) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-2 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all relative flex items-center space-x-1 ${
                    isActive
                      ? "bg-teal-600/20 text-teal-400 border border-teal-500/30"
                      : "text-slate-300 hover:text-white hover:bg-navy-800"
                  }`
                }
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="bg-teal-500/20 text-teal-300 text-[9px] font-bold px-1 py-0.1 rounded border border-teal-500/30">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}

            {/* "More" Dropdown for Photo Albums, Itinerary, Budget */}
            <div ref={moreRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-navy-800 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <span>More</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in">
                  {secondaryNavLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMoreDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-teal-400" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Auth Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Icon (Mobile / Tablet) */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors md:hidden"
              title="Global Search"
            >
              <Search className="w-5 h-5 text-teal-400" />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="p-2 text-slate-300 hover:text-rose-400 hover:bg-navy-800 rounded-lg transition-colors relative"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Notification Bell */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
                )}
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-3 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-800">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-300">
                      Notifications ({unreadNotificationsCount})
                    </span>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] text-teal-400 hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-xs text-slate-500">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 hover:bg-slate-800/50 transition-colors text-xs space-y-1 ${
                            !n.read ? "bg-slate-800/30" : ""
                          }`}
                        >
                          <div className="font-semibold text-white flex items-center justify-between">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-500">{n.time}</span>
                          </div>
                          <p className="text-slate-400 text-[11px]">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Auth Area */}
            {currentUser ? (
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1 pl-2 bg-navy-800 hover:bg-navy-700 border border-slate-700 rounded-full transition-colors cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-teal-400"
                  />
                  <span className="text-xs font-semibold text-slate-200 pr-1 hidden sm:inline max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in">
                    <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500"
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-white truncate">
                          {currentUser.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {currentUser.email}
                        </div>
                        <div className="text-[10px] text-amber-400 font-semibold mt-0.5">
                          Tier: {currentUser.loyaltyTier} ({currentUser.loyaltyPoints} pts)
                        </div>
                      </div>
                    </div>

                    {/* Quick navigation */}
                    <div className="py-2 border-b border-slate-800 space-y-1">
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-medium"
                      >
                        <User className="w-3.5 h-3.5 text-teal-400" />
                        <span>My Profile & Preferences</span>
                      </Link>
                      <Link
                        to="/bookings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-teal-400" />
                        <span>My Bookings</span>
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-400" />
                        <span>Saved Wishlist</span>
                      </Link>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setAppearanceModalOpen(true);
                        }}
                        className="w-full flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg text-left transition-colors cursor-pointer"
                      >
                        <Palette className="w-3.5 h-3.5 text-teal-400" />
                        <span>Appearance & Themes</span>
                      </button>
                    </div>

                    {/* Sign Out Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate("/login");
                        }}
                        className="w-full flex items-center justify-center space-x-1.5 py-2 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t("nav.logout")}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-900/40 transition-all flex items-center space-x-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t("nav.login")}</span>
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in">
          <div className="grid grid-cols-2 gap-2">
            {allNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-teal-600/20 text-teal-400 border border-teal-500/30"
                        : "text-slate-300 hover:bg-slate-800"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-teal-400" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAppearanceModalOpen(true);
              }}
              className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white"
            >
              <Palette className="w-4 h-4 text-teal-400" />
              <span>Appearance</span>
            </button>
            {currentUser && (
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-1.5 text-xs text-teal-400 font-semibold"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
