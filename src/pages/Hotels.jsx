import React, { useState, useMemo } from "react";
import {
  Building,
  Star,
  ShieldCheck,
  Users,
  Check,
  Search,
  Filter,
  ArrowRight,
  MapPin,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useBooking } from "../context/BookingContext";
import { searchHotels } from "../utils/searchUtils";
import { formatCurrency } from "../utils/pricing";

export default function Hotels() {
  const { currency, t } = useApp();
  const { openBooking } = useBooking();

  const [search, setSearch] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("All");
  const [childFriendlyOnly, setChildFriendlyOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [selectedAmenity, setSelectedAmenity] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const destinationsList = [
    { label: "All Destinations", value: "All" },
    { label: "Munnar", value: "Munnar" },
    { label: "Jaipur", value: "Jaipur" },
    { label: "Goa", value: "Goa" },
    { label: "Ladakh", value: "Ladakh" },
    { label: "Andaman", value: "Andaman" },
    { label: "Hampi", value: "Hampi" },
    { label: "Varanasi", value: "Varanasi" },
    { label: "Rishikesh", value: "Rishikesh" }
  ];

  const amenitiesList = [
    "All",
    "Complimentary Breakfast Buffet",
    "Free High-Speed WiFi",
    "Kids Play Area & Games Room",
    "Ayurvedic Spa & Wellness",
    "Swimming Pool",
    "Doctor on Call"
  ];

  const filteredHotels = useMemo(() => {
    return searchHotels({
      query: search,
      destination: selectedDestination,
      maxPrice: maxPrice,
      minRating: minRating,
      childFriendlyOnly: childFriendlyOnly,
      selectedAmenity: selectedAmenity,
      sortBy: sortBy
    });
  }, [search, selectedDestination, maxPrice, minRating, childFriendlyOnly, selectedAmenity, sortBy]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedDestination("All");
    setChildFriendlyOnly(false);
    setMinRating(0);
    setMaxPrice(30000);
    setSelectedAmenity("All");
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs uppercase font-bold text-teal-400 tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{t("hotels.title") || "Verified Stays & Heritage Havens"}</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
              {t("nav.hotels") || "Hotels, Heritage Havens & Eco Resorts"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {t("hotels.subtitle") || "Inspected properties enforcing transparent room occupancy rules (max 3 guests per room) and family child concessions."}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-400 font-medium">
              {selectedDestination !== "All"
                ? (t("hotels.foundCount", { count: filteredHotels.length, location: selectedDestination }) || `${filteredHotels.length} hotels found in ${selectedDestination}`)
                : (t("hotels.allFound", { count: filteredHotels.length }) || `${filteredHotels.length} verified hotels available`)}
            </span>
          </div>
        </div>

        {/* Destination Quick Filters (Pills) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {destinationsList.map((dest) => (
            <button
              key={dest.value}
              onClick={() => setSelectedDestination(dest.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDestination === dest.value
                  ? "bg-teal-600 text-white shadow-md shadow-teal-900/40 font-bold"
                  : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {dest.value === "All" ? (t("destinations.allCategories") || dest.label) : dest.label}
            </button>
          ))}
        </div>

        {/* Filter Controls Toolbar */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("hotels.searchPlaceholder") || "Search hotel name, location, or resort type..."}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Amenity Filter */}
            <div>
              <select
                value={selectedAmenity}
                onChange={(e) => setSelectedAmenity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
              >
                {amenitiesList.map((a) => (
                  <option key={a} value={a}>
                    {a === "All" ? "All Amenities" : a}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
              >
                <option value="popular">Most Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Secondary Filter Row: Price, Rating, Child-Friendly, Reset */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              
              {/* Child-Friendly Toggle */}
              <label className="flex items-center space-x-2 bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl cursor-pointer hover:border-slate-600 transition-colors">
                <input
                  type="checkbox"
                  checked={childFriendlyOnly}
                  onChange={(e) => setChildFriendlyOnly(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-200 font-medium">{t("hotels.childFriendlyOnly") || "Child-Friendly Only (Concessions)"}</span>
              </label>

              {/* Min Rating */}
              <div className="flex items-center space-x-2 bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-xl">
                <span className="text-slate-400">{t("hotels.minRating") || "Min Rating"}:</span>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value={0}>{t("hotels.allStars") || "Any Rating"}</option>
                  <option value={4.0}>4.0+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.8}>4.8+ Stars (Top Rated)</option>
                </select>
              </div>

              {/* Max Price Slider */}
              <div className="flex items-center space-x-3 bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-xl">
                <span className="text-slate-400">{t("hotels.maxNightly") || "Max Nightly"}:</span>
                <span className="text-teal-400 font-bold">{formatCurrency(maxPrice, currency)}</span>
                <input
                  type="range"
                  min="2000"
                  max="30000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 accent-teal-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Reset Filters Button */}
            <button
              onClick={handleResetFilters}
              className="flex items-center space-x-1.5 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("common.resetFilters") || "Reset Filters"}</span>
            </button>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/20"
            >
              {/* Hotel Image & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-slate-950/80 backdrop-blur-sm text-teal-400 border border-teal-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-teal-400" />
                    <span>{t("common.verifiedPartner") || "Verified Partner"}</span>
                  </span>
                  {hotel.childFriendly && (
                    <span className="bg-slate-950/80 backdrop-blur-sm text-sky-400 border border-sky-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {t("hotels.childFriendlyOnly") || "Child Concession (40% OFF)"}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm text-amber-400 border border-amber-500/30 text-xs font-bold px-2 py-0.5 rounded-md flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{hotel.rating}</span>
                  <span className="text-slate-400 text-[10px]">({hotel.reviewsCount})</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 flex items-center justify-between">
                  <span className="bg-slate-900/90 px-2 py-0.5 rounded text-[11px] text-slate-300">
                    {hotel.type}
                  </span>
                  <span className="bg-slate-900/90 px-2 py-0.5 rounded text-[11px] text-slate-300 flex items-center space-x-1">
                    <Users className="w-3 h-3 text-slate-400" />
                    <span>{t("hotels.maxOccupancy", { count: hotel.maxOccupancyPerRoom || 3 }) || `Max ${hotel.maxOccupancyPerRoom || 3} guests/room`}</span>
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-1">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{hotel.location}</span>
                  </div>

                  {/* Amenities Highlights */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-800/80 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700/60"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-[10px] text-slate-500 self-center">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing & Booking CTA */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-base font-black text-white">
                      {formatCurrency(hotel.basePricePerNight, currency)}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {t("common.perNight") || "per night"} • {t("common.inclusiveTaxes") || "incl. 12% GST"}
                    </div>
                  </div>

                  <button
                    onClick={() => openBooking(hotel, "hotel")}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-900/30 flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>{t("common.reserve") || "Reserve Room"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Hotels Found State */}
        {filteredHotels.length === 0 && (
          <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-4">
            <Building className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">{t("common.noResults") || "No Hotels Found"}</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              We couldn't find any hotels matching your current filter criteria. Try resetting filters or expanding your budget range.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              {t("common.resetFilters") || "Reset All Filters"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
