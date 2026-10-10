import React from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  Star,
  Check,
  Building,
  Compass,
  Layers,
  Users,
  Shield,
  ArrowUpDown
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function SearchFilters({
  activeCategory = "all",
  onCategoryChange,
  counts = {},
  maxPrice = 35000,
  onMaxPriceChange,
  minRating = 0,
  onMinRatingChange,
  childFriendlyOnly = false,
  onChildFriendlyChange,
  womenSafeOnly = false,
  onWomenSafeChange,
  sortBy = "popular",
  onSortByChange,
  onResetFilters
}) {
  const { t } = useApp();

  const categories = [
    { id: "all", label: "All Results", icon: Compass, count: counts.all || 0 },
    { id: "hotels", label: "Hotels & Stays", icon: Building, count: counts.hotels || 0 },
    { id: "packages", label: "Tour Packages", icon: Layers, count: counts.packages || 0 },
    { id: "destinations", label: "Destinations", icon: Compass, count: counts.destinations || 0 },
    { id: "guides", label: "Local Guides", icon: Users, count: counts.guides || 0 },
    { id: "solo", label: "Solo Trips", icon: Shield, count: counts.solo || 0 }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-6">
      
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-white font-bold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-teal-400" />
          <span>Filters</span>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs text-teal-400 hover:text-teal-300 flex items-center space-x-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Category</label>
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-teal-400" : "text-slate-500"}`} />
                  <span>{cat.label}</span>
                </div>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Cap Slider */}
      <div className="space-y-2 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-slate-300 uppercase tracking-wider">Max Budget</label>
          <span className="font-mono text-teal-400 font-bold">₹{maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="35000"
          step="500"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>₹1,000</span>
          <span>₹35,000+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2 pt-4 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Minimum Rating</label>
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 4.0, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onMinRatingChange(rating)}
              className={`py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center justify-center space-x-1 ${
                minRating === rating
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <span>{rating === 0 ? "Any" : rating}</span>
              {rating > 0 && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Specific Checkbox Filters */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Preferences</label>
        
        <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={childFriendlyOnly}
            onChange={(e) => onChildFriendlyChange(e.target.checked)}
            className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-teal-600 focus:ring-teal-500"
          />
          <span>Family & Child Friendly Only</span>
        </label>

        <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={womenSafeOnly}
            onChange={(e) => onWomenSafeChange(e.target.checked)}
            className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-teal-600 focus:ring-teal-500"
          />
          <span>Verified Women-Safe Only</span>
        </label>
      </div>

      {/* Sort By */}
      <div className="space-y-2 pt-4 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
        >
          <option value="popular">Most Popular & Recommended</option>
          <option value="rating">Highest Guest Rating</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

    </div>
  );
}
