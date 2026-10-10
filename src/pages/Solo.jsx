import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  Compass,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Lock,
  ArrowRight,
  Search,
  Filter,
  Calendar,
  Clock,
  RotateCcw,
  Heart
} from "lucide-react";
import { DESTINATIONS } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { useBooking } from "../context/BookingContext";
import { searchSoloTrips } from "../utils/searchUtils";
import { formatCurrency } from "../utils/pricing";
import BuddyMatchModal from "../components/solo/BuddyMatchModal";

export default function Solo() {
  const { currency, t } = useApp();
  const { openBooking } = useBooking();

  // Search Filter State
  const [selectedDest, setSelectedDest] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState(20000);
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("Any Month");
  const [buddyModalOpen, setBuddyModalOpen] = useState(false);

  const destinationsList = [
    "All", "Munnar", "Jaipur", "Goa", "Ladakh", "Andaman", "Hampi", "Varanasi", "Rishikesh"
  ];

  const durationsList = [
    { label: "All Durations", value: "All" },
    { label: "3 Days / 2 Nights", value: "3 Days" },
    { label: "4 Days / 3 Nights", value: "4 Days" },
    { label: "5 Days / 4 Nights", value: "5 Days" },
    { label: "6 Days / 5 Nights", value: "6 Days" }
  ];

  const travelStylesList = [
    "All",
    "Trekker",
    "Cultural",
    "Ocean",
    "Stargazing",
    "Scuba",
    "Ghats",
    "Yoga"
  ];

  const filteredTrips = useMemo(() => {
    return searchSoloTrips({
      destination: selectedDest,
      duration: selectedDuration,
      budgetMax: selectedBudget,
      travelStyle: selectedStyle
    });
  }, [selectedDest, selectedDuration, selectedBudget, selectedStyle]);

  const handleResetFilters = () => {
    setSelectedDest("All");
    setSelectedDuration("All");
    setSelectedBudget(20000);
    setSelectedStyle("All");
    setSelectedMonth("Any Month");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header & Trust Signals */}
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 border border-teal-500/30 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center space-x-1.5 text-teal-400 text-xs font-bold uppercase tracking-wider bg-teal-950 px-3 py-1 rounded-full border border-teal-500/40">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("hero.badge") || "Solo Safety Assurance Engine"}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              {t("solo.title") || "Solo Travel, Empowered & Uncompromised"}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t("solo.subtitle") || "Zero single supplement penalties. Audited women-safe accommodations with 24/7 security desks, group sunrise hikes, and verified cohort buddy matching."}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs">
              <div className="flex items-center space-x-2 text-teal-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>{t("solo.zeroSupplement") || "Zero Single Supplement"}</span>
              </div>
              <div className="flex items-center space-x-2 text-teal-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>{t("solo.womenSafeScore") || "24/7 Security Reception"}</span>
              </div>
              <div className="flex items-center space-x-2 text-teal-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>{t("solo.emergencySOS") || "Emergency SOS Integration"}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setBuddyModalOpen(true)}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-900/30 flex items-center space-x-2 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>{t("solo.findBuddies") || "Find Solo Travel Buddies"}</span>
              </button>
            </div>
          </div>

          {/* Emergency SOS Direct Helpline Card */}
          <div className="bg-navy-950 p-6 rounded-2xl border border-slate-800 text-left text-xs space-y-3 shrink-0 w-full md:w-72 shadow-lg">
            <div className="text-[10px] uppercase font-bold text-amber-400 flex items-center space-x-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t("solo.emergencySOS") || "24/7 Travel SOS Direct"}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">All-India Police:</span>
                <strong className="text-white font-bold">112</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Women Helpline:</span>
                <strong className="text-teal-400 font-bold">1091</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tourist Helpline:</span>
                <strong className="text-white font-bold">1363</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Solo Travel Search Bar & Filters */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
          <div className="text-xs uppercase font-bold text-teal-400 flex items-center space-x-1.5">
            <Search className="w-4 h-4" />
            <span>{t("common.search") || "Search & Filter Solo Expeditions"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            {/* Destination */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1">{t("solo.whereTo") || "Destination"}</label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-teal-500"
              >
                {destinationsList.map((d) => (
                  <option key={d} value={d}>
                    {d === "All" ? (t("destinations.allCategories") || "All Destinations") : d}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Month */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Travel Season</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="Any Month">Any Season</option>
                <option value="October 2026">October 2026 (Autumn)</option>
                <option value="November 2026">November 2026 (Festive)</option>
                <option value="December 2026">December 2026 (Winter)</option>
                <option value="January 2027">January 2027 (New Year)</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1">{t("solo.duration") || "Duration"}</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-teal-500"
              >
                {durationsList.map((dur) => (
                  <option key={dur.value} value={dur.value}>{dur.label}</option>
                ))}
              </select>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1">{t("solo.travelStyle") || "Travel Style"}</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="All">{t("common.all") || "All Styles"}</option>
                <option value="Trekker">Nature & Trekker</option>
                <option value="Cultural">Heritage & Cultural</option>
                <option value="Ocean">Beach & Coastal</option>
                <option value="Stargazing">Adventure & Astronomy</option>
                <option value="Yoga">Mindful Yoga & Wellness</option>
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <div className="flex justify-between text-slate-400 font-semibold mb-1">
                <span>{t("solo.budget") || "Max Budget"}</span>
                <span className="text-teal-400 font-bold">{formatCurrency(selectedBudget, currency)}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="20000"
                step="1000"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer mt-2"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
            <span>{t("solo.foundCount", { count: filteredTrips.length }) || `Showing ${filteredTrips.length} verified solo itineraries`}</span>
            <button
              onClick={handleResetFilters}
              className="flex items-center space-x-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("common.resetFilters") || "Reset Filters"}</span>
            </button>
          </div>
        </div>

        {/* Curated Solo Travel Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/20 group"
            >
              {/* Image & Trust Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-slate-950/80 backdrop-blur-sm text-teal-400 border border-teal-500/40 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-teal-400" />
                    <span>{t("solo.safetyIndex", { score: trip.safetyScore }) || `Safety Score ${trip.safetyScore}/100`}</span>
                  </span>
                  {trip.womenSafe && (
                    <span className="bg-slate-950/80 backdrop-blur-sm text-rose-400 border border-rose-500/40 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1">
                      <Heart className="w-3 h-3 fill-rose-400" />
                      <span>{t("solo.womenSafeScore") || "Women-Safe Verified"}</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-200 flex items-center justify-between">
                  <span className="bg-slate-900/90 px-2 py-0.5 rounded text-[11px] font-medium">
                    {trip.duration}
                  </span>
                  <span className="bg-slate-900/90 px-2 py-0.5 rounded text-[11px] font-medium text-teal-400">
                    {t("solo.zeroSupplement") || "Zero Supplement Fee"}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-1">
                    {trip.title}
                  </h3>
                  <div className="text-xs text-slate-300 font-medium">
                    {trip.stayType}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {trip.itineraryHighlight}
                  </p>

                  {/* Social Cohort Activities */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {trip.socialActivities.map((act, i) => (
                      <span
                        key={i}
                        className="bg-slate-800/80 text-teal-300 text-[10px] px-2 py-0.5 rounded border border-slate-700/60"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Booking CTA */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-base font-black text-white">
                      {formatCurrency(trip.price, currency)}
                    </div>
                    <div className="text-[10px] text-slate-400">Solo traveler all-inclusive</div>
                  </div>

                  <button
                    onClick={() => openBooking(trip, "solo")}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-900/30 flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>{t("solo.bookSolo") || "Book Solo Trip"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Trips Found */}
        {filteredTrips.length === 0 && (
          <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-4">
            <Compass className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Solo Trips Match Your Search</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Try adjusting your destination, style, or budget slider to discover more curated solo adventures.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      <BuddyMatchModal
        isOpen={buddyModalOpen}
        onClose={() => setBuddyModalOpen(false)}
      />
    </div>
  );
}
