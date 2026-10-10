import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Award,
  Sparkles,
  Calendar,
  Heart,
  Briefcase,
  Camera,
  Palette,
  Globe,
  LogOut,
  Edit3,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const {
    currentUser,
    userRole,
    logout,
    theme,
    toggleTheme,
    accentColor,
    setAccentColor,
    lang,
    setLang,
    wishlist,
    userBookings,
    userAlbums,
    addToast,
    t
  } = useApp();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "Traveler",
    phone: currentUser?.phone || "+91 98765 43210",
    bio: currentUser?.bio || "Passionate explorer wandering across incredible destinations.",
    travelStyle: "Cultural Explorer"
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    addToast("Profile details updated successfully!", "success");
  };

  const handleSignOut = () => {
    logout();
    addToast("Signed out successfully", "info");
    navigate("/login");
  };

  const accentOptions = [
    { id: "emerald", label: "Emerald Green", colorClass: "bg-emerald-500" },
    { id: "teal", label: "Coastal Teal", colorClass: "bg-teal-500" },
    { id: "sky", label: "Himalayan Sky", colorClass: "bg-sky-500" },
    { id: "indigo", label: "Royal Indigo", colorClass: "bg-indigo-500" },
    { id: "rose", label: "Desert Rose", colorClass: "bg-rose-500" },
    { id: "amber", label: "Sunset Amber", colorClass: "bg-amber-500" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-teal-400 font-semibold">User Profile & Account</span>
        </div>

        {/* Profile Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-5">
              <div className="relative">
                <img
                  src={
                    currentUser?.avatar ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                  }
                  alt={currentUser?.name || "User Avatar"}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-teal-500/40 shadow-xl"
                />
                <span className="absolute -bottom-1 -right-1 p-1 bg-teal-500 text-slate-950 rounded-lg">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white">
                    {currentUser?.name || "Traveler"}
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {currentUser?.loyaltyTier || "Explorer"} Member
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{currentUser?.email || "user@tripcraft.io"}</span>
                </p>
                <p className="text-xs text-slate-400 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Member since {currentUser?.memberSince || "2024"}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors border border-slate-700 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-teal-400" />
                <span>{isEditing ? "Close Editing" : "Edit Profile"}</span>
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-xl text-xs font-bold transition-colors border border-rose-500/30 flex items-center space-x-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
            <div className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Loyalty Points</span>
              <div className="text-lg font-black text-amber-400 mt-0.5">
                {currentUser?.loyaltyPoints ? currentUser.loyaltyPoints.toLocaleString() : "2,400"} pts
              </div>
            </div>
            <Link
              to="/bookings"
              className="bg-slate-950/50 hover:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-800/80 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Bookings</span>
                <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-white" />
              </div>
              <div className="text-lg font-black text-teal-300 mt-0.5">
                {userBookings?.length || 2} Active / Past
              </div>
            </Link>
            <Link
              to="/wishlist"
              className="bg-slate-950/50 hover:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-800/80 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Saved Places</span>
                <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-white" />
              </div>
              <div className="text-lg font-black text-rose-400 mt-0.5">
                {wishlist?.length || 0} Saved
              </div>
            </Link>
            <Link
              to="/album"
              className="bg-slate-950/50 hover:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-800/80 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">My Albums</span>
                <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-white" />
              </div>
              <div className="text-lg font-black text-sky-400 mt-0.5">
                {userAlbums?.length || 1} Created
              </div>
            </Link>
          </div>
        </div>

        {/* Edit Profile Form (When opened) */}
        {isEditing && (
          <form
            onSubmit={handleSaveProfile}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 animate-in fade-in"
          >
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Edit3 className="w-4 h-4 text-teal-400" />
              <span>Update Personal Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Short Bio</label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Global Settings & Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Appearance & Color Themes */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-400">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Appearance & Theme</h3>
                <p className="text-xs text-slate-400">Customize the application display mode and accents</p>
              </div>
            </div>

            {/* Dark / Light Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Display Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (theme === "light") toggleTheme();
                  }}
                  className={`p-3 rounded-2xl border flex items-center justify-center space-x-2 text-xs font-bold transition-all cursor-pointer ${
                    theme === "dark"
                      ? "bg-slate-800 border-teal-500 text-teal-300 ring-1 ring-teal-500/50"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Moon className="w-4 h-4 text-teal-400" />
                  <span>Dark Mode</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (theme === "dark") toggleTheme();
                  }}
                  className={`p-3 rounded-2xl border flex items-center justify-center space-x-2 text-xs font-bold transition-all cursor-pointer ${
                    theme === "light"
                      ? "bg-slate-800 border-teal-500 text-teal-300 ring-1 ring-teal-500/50"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </button>
              </div>
            </div>

            {/* Accent Color Chooser */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Active Accent Brand Color</label>
                <span className="text-[10px] uppercase font-bold text-teal-400">{accentColor}</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {accentOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setAccentColor(opt.id);
                      addToast(`Applied ${opt.label} accent!`, "success");
                    }}
                    className={`p-2.5 rounded-xl border flex items-center space-x-2 text-xs transition-all cursor-pointer ${
                      accentColor === opt.id
                        ? "bg-slate-800 border-teal-400 text-white ring-1 ring-teal-500/40"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${opt.colorClass}`}></span>
                    <span className="truncate text-[11px] font-medium">{opt.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Regional & Language Settings */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Language & Regional</h3>
                <p className="text-xs text-slate-400">Select application interface language</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { code: "en", label: "English", subtext: "Global English (Default)" },
                { code: "ta", label: "தமிழ்", subtext: "Tamil Native Translation" },
                { code: "hi", label: "हिन्दी", subtext: "Hindi Native Translation" }
              ].map((language) => (
                <div
                  key={language.code}
                  onClick={() => {
                    setLang(language.code);
                    addToast(`Language switched to ${language.label}`, "info");
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    lang === language.code
                      ? "bg-slate-800/90 border-teal-500 ring-1 ring-teal-500/40"
                      : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">{language.label}</div>
                    <div className="text-[10px] text-slate-400">{language.subtext}</div>
                  </div>
                  {lang === language.code && (
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <p>TripCraft automatically synchronizes your chosen preferences across all pages and sessions.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
