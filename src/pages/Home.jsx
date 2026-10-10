import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Compass,
  Search,
  Calendar,
  Users,
  ShieldCheck,
  Camera,
  Layers,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle,
  Clock,
  Heart,
  Award
} from "lucide-react";
import { DESTINATIONS, PACKAGES, SOLO_TRIPS } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { useBooking } from "../context/BookingContext";
import DestinationCard from "../components/destination/DestinationCard";
import RecentlyViewed from "../components/common/RecentlyViewed";
import { formatCurrency } from "../utils/pricing";

export default function Home() {
  const { currency, t } = useApp();
  const { openBooking } = useBooking();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split("T")[0];
  });
  const [partySize, setPartySize] = useState(2);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/destinations");
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Hero Section */}
      <section className="relative min-h-[580px] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80"
            alt="Munnar Landscape"
            className="w-full h-full object-cover scale-105 filter brightness-[0.38]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t("hero.badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            {t("hero.title")}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* Interactive Search Bar Panel */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-slate-900/90 border border-slate-700/80 p-3 sm:p-4 rounded-2xl shadow-2xl backdrop-blur-md max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-3 text-left"
          >
            {/* Destination Input */}
            <div className="sm:col-span-5 bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2">
              <label className="block text-[10px] uppercase font-bold text-slate-400">
                {t("solo.whereTo")}
              </label>
              <div className="flex items-center space-x-2 mt-0.5">
                <Compass className="w-4 h-4 text-teal-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Munnar, Jaipur, Ladakh, Goa..."
                  className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Travel Date */}
            <div className="sm:col-span-3 bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2">
              <label className="block text-[10px] uppercase font-bold text-slate-400">
                {t("hero.checkIn")}
              </label>
              <div className="flex items-center space-x-2 mt-0.5">
                <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer"
                />
              </div>
            </div>

            {/* Party Size */}
            <div className="sm:col-span-2 bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2">
              <label className="block text-[10px] uppercase font-bold text-slate-400">
                {t("hero.guests")}
              </label>
              <div className="flex items-center space-x-2 mt-0.5">
                <Users className="w-4 h-4 text-teal-400 shrink-0" />
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                  className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer"
                >
                  <option value={1} className="bg-slate-900">1 Solo</option>
                  <option value={2} className="bg-slate-900">2 Guests</option>
                  <option value={3} className="bg-slate-900">3 Guests</option>
                  <option value={4} className="bg-slate-900">4+ Group</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 flex items-center">
              <button
                type="submit"
                className="w-full h-full min-h-[44px] bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{t("common.search")}</span>
              </button>
            </div>
          </form>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-slate-400 text-[11px]">{t("hero.trending")}</span>
            {["Munnar", "Jaipur", "Ladakh", "Goa", "Hampi"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  navigate(`/destinations?q=${tag}`);
                }}
                className="bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-slate-700 text-[11px] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Value Pillars Banner */}
      <section className="bg-slate-900/80 py-10 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Price Realism Yield
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Dynamic seasonal pricing calculations with transparent 40% child discount concessions.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {t("solo.title")}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Audited 24/7 security desks, women-safe ratings, zero single supplement penalties.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {t("nav.albums")}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Upload your travel photos, choose photo limits (250–2000), and create interactive keepsake books.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {t("nav.guides")}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Explore with 12 government-certified heritage storytellers, trek leads, and local photography experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
              {t("nav.destinations")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {t("destinations.title")}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {t("destinations.subtitle")}
            </p>
          </div>

          <Link
            to="/destinations"
            className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center space-x-1.5"
          >
            <span>{t("common.explore")} All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.slice(0, 4).map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* Curated Tour Packages Showcase */}
      <section className="bg-slate-900/40 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                {t("nav.packages")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {t("packages.title")}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {t("packages.subtitle")}
              </p>
            </div>

            <Link
              to="/packages"
              className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center space-x-1.5"
            >
              <span>{t("common.viewDetails")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col sm:flex-row shadow-lg"
              >
                <div className="sm:w-2/5 relative">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 sm:h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-bold text-teal-300 border border-slate-700">
                    {pkg.duration}
                  </div>
                </div>

                <div className="sm:w-3/5 p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[10px] uppercase font-bold text-teal-400">
                        {pkg.theme}
                      </span>
                      <span className="flex items-center space-x-1 text-amber-400 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{pkg.rating} ({pkg.reviewsCount})</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {pkg.title}
                    </h3>

                    {/* Day-by-day highlight preview */}
                    <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                      {pkg.itinerary.slice(0, 2).map((item) => (
                        <div key={item.day} className="flex items-start space-x-2">
                          <span className="text-teal-400 font-bold shrink-0">Day {item.day}:</span>
                          <span className="truncate">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">{t("common.perPerson")}</div>
                      <div className="text-lg font-black text-white">
                        {formatCurrency(pkg.baseAdultPrice, currency)}
                      </div>
                    </div>

                    <button
                      onClick={() => openBooking(pkg, "package")}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-900/30 cursor-pointer"
                    >
                      {t("common.bookNow")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solo Traveler Safety Hub Callout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-slate-900 border border-teal-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-5 relative z-10">
            <span className="inline-flex items-center space-x-1.5 text-teal-400 text-xs font-bold uppercase tracking-wider bg-teal-950/60 px-3 py-1 rounded-full border border-teal-500/40">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("solo.safetyIndex", { score: 95 })}</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {t("solo.title")}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t("solo.subtitle")}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/solo"
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-lg flex items-center space-x-2"
              >
                <span>{t("solo.searchBtn")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/community"
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                {t("solo.findBuddies")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed items */}
      <RecentlyViewed />
    </div>
  );
}
