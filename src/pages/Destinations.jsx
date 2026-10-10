import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, ShieldCheck, MapPin } from "lucide-react";
import { DESTINATIONS } from "../data/mockData";
import DestinationCard from "../components/destination/DestinationCard";
import RecentlyViewed from "../components/common/RecentlyViewed";
import { useApp } from "../context/AppContext";

export default function Destinations() {
  const { t } = useApp();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular"); // "popular" | "price_asc" | "price_desc" | "safety"
  const [minRating, setMinRating] = useState(0);

  const categories = ["All", "Hill Station", "Heritage", "Adventure", "Beach", "Island & Marine"];

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.state.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "All" || d.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchRating = d.rating >= minRating;

      return matchSearch && matchCategory && matchRating;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.basePrice - b.basePrice;
      if (sortBy === "price_desc") return b.basePrice - a.basePrice;
      if (sortBy === "safety") return b.safetyScore - a.safetyScore;
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [search, selectedCategory, sortBy, minRating]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
            {t("destinations.title") || "Explore Incredible India"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
            {t("nav.destinations") || "Destinations Directory"}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            {t("destinations.subtitle") || "Vetted travel corridors with real weather reports, safety index ratings, and authentic local guides."}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-navy-950 border border-slate-800 p-4 rounded-2xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("common.search") + "..."}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Sort & Rating Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400">{t("common.filter") || "Sort by"}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="popular">{t("common.popular") || "Most Popular"}</option>
                  <option value="price_asc">{t("common.priceLowHigh") || "Price: Low to High"}</option>
                  <option value="price_desc">{t("common.priceHighLow") || "Price: High to Low"}</option>
                  <option value="safety">{t("common.safetyScore") || "Highest Safety Index"}</option>
                </select>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400">{t("common.rating") || "Rating"}:</span>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                >
                  <option value={0}>{t("hotels.allStars") || "All Ratings"}</option>
                  <option value={4.5}>4.5★ & Above</option>
                  <option value={4.8}>4.8★ & Above</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "bg-teal-600 text-white font-bold"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {cat === "All" ? (t("common.all") || "All") : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Grid */}
        <div>
          <div className="text-xs text-slate-400 mb-4">
            Showing <strong className="text-white">{filteredDestinations.length}</strong> verified destinations
          </div>

          {filteredDestinations.length === 0 ? (
            <div className="bg-navy-950 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <MapPin className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">{t("common.noResults") || "No destinations found"}</h3>
              <p className="text-xs text-slate-400">
                Try loosening your filters or search for popular hubs like Munnar, Jaipur, or Ladakh.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDestinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-16">
        <RecentlyViewed />
      </div>
    </div>
  );
}
