import React, { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Compass, SlidersHorizontal } from "lucide-react";
import SearchBar from "../components/search/SearchBar";
import SearchFilters from "../components/search/SearchFilters";
import SearchResults from "../components/search/SearchResults";
import { DESTINATIONS, HOTELS, PACKAGES, LOCAL_GUIDES, SOLO_TRIPS } from "../data/mockData";
import { useApp } from "../context/AppContext";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useApp();

  const urlQuery = searchParams.get("q") || "";
  const urlDest = searchParams.get("destination") || "All";

  const [activeCategory, setActiveCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(35000);
  const [minRating, setMinRating] = useState(0);
  const [childFriendlyOnly, setChildFriendlyOnly] = useState(false);
  const [womenSafeOnly, setWomenSafeOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Compute matched results
  const filteredData = useMemo(() => {
    const q = urlQuery.trim().toLowerCase();
    const dest = urlDest.toLowerCase();

    // 1. Destinations
    const destinations = DESTINATIONS.filter((d) => {
      const matchQ = !q || d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q) || d.category.toLowerCase().includes(q);
      const matchDest = dest === "all" || d.name.toLowerCase().includes(dest) || d.state.toLowerCase().includes(dest);
      const matchRating = d.rating >= minRating;
      const matchPrice = d.basePrice <= maxPrice;
      return matchQ && matchDest && matchRating && matchPrice;
    });

    // 2. Hotels
    let hotels = HOTELS.filter((h) => {
      const matchQ = !q || h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q) || h.type.toLowerCase().includes(q);
      const matchDest = dest === "all" || h.location.toLowerCase().includes(dest) || (h.destinationId && h.destinationId.toLowerCase().includes(dest));
      const matchRating = h.rating >= minRating;
      const matchPrice = h.basePricePerNight <= maxPrice;
      const matchChild = !childFriendlyOnly || h.childFriendly;
      return matchQ && matchDest && matchRating && matchPrice && matchChild;
    });

    // 3. Packages
    let packages = PACKAGES.filter((p) => {
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.theme.toLowerCase().includes(q);
      const matchDest = dest === "all" || (p.destinationId && p.destinationId.toLowerCase().includes(dest));
      const matchRating = p.rating >= minRating;
      const matchPrice = p.baseAdultPrice <= maxPrice;
      return matchQ && matchDest && matchRating && matchPrice;
    });

    // 4. Guides
    let guides = LOCAL_GUIDES.filter((g) => {
      const matchQ = !q || g.name.toLowerCase().includes(q) || g.city.toLowerCase().includes(q) || g.specialization.toLowerCase().includes(q);
      const matchDest = dest === "all" || g.city.toLowerCase().includes(dest) || g.state.toLowerCase().includes(dest);
      const matchRating = g.rating >= minRating;
      return matchQ && matchDest && matchRating;
    });

    // 5. Solo Trips
    let soloTrips = SOLO_TRIPS.filter((s) => {
      const matchQ = !q || s.title.toLowerCase().includes(q) || s.stayType.toLowerCase().includes(q);
      const matchDest = dest === "all" || (s.destinationId && s.destinationId.toLowerCase().includes(dest));
      const matchPrice = s.price <= maxPrice;
      const matchWomen = !womenSafeOnly || s.womenSafe;
      return matchQ && matchDest && matchPrice && matchWomen;
    });

    // Sorting
    if (sortBy === "rating") {
      hotels.sort((a, b) => b.rating - a.rating);
      packages.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price_asc") {
      hotels.sort((a, b) => a.basePricePerNight - b.basePricePerNight);
      packages.sort((a, b) => a.baseAdultPrice - b.baseAdultPrice);
    } else if (sortBy === "price_desc") {
      hotels.sort((a, b) => b.basePricePerNight - a.basePricePerNight);
      packages.sort((a, b) => b.baseAdultPrice - a.baseAdultPrice);
    }

    const totalMatches = destinations.length + hotels.length + packages.length + guides.length + soloTrips.length;

    return {
      destinations,
      hotels,
      packages,
      guides,
      soloTrips,
      totalMatches
    };
  }, [urlQuery, urlDest, minRating, maxPrice, childFriendlyOnly, womenSafeOnly, sortBy]);

  const counts = {
    all: filteredData.totalMatches,
    destinations: filteredData.destinations.length,
    hotels: filteredData.hotels.length,
    packages: filteredData.packages.length,
    guides: filteredData.guides.length,
    solo: filteredData.soloTrips.length
  };

  const handleResetFilters = () => {
    setMaxPrice(35000);
    setMinRating(0);
    setChildFriendlyOnly(false);
    setWomenSafeOnly(false);
    setSortBy("popular");
    setActiveCategory("all");
  };

  const handleSearchSubmit = ({ query, destination, guests }) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (destination !== "All") params.set("destination", destination);
    if (guests.adults) params.set("adults", guests.adults);
    if (guests.children) params.set("children", guests.children);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-teal-400 font-semibold">Universal Search</span>
        </div>

        {/* Search Bar Container */}
        <div>
          <SearchBar
            initialQuery={urlQuery}
            initialDestination={urlDest}
            onSearchSubmit={handleSearchSubmit}
          />
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {urlQuery ? `Search Results for "${urlQuery}"` : "Explore All Travel Journeys"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Found {filteredData.totalMatches} travel options across India
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 flex items-center space-x-2 cursor-pointer self-start"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
            <span>Filters ({filteredData.totalMatches})</span>
          </button>
        </div>

        {/* Layout: Sidebar Filters + Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filters Sidebar */}
          <div className={`lg:block ${mobileFilterOpen ? "block" : "hidden"}`}>
            <SearchFilters
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              counts={counts}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              minRating={minRating}
              onMinRatingChange={setMinRating}
              childFriendlyOnly={childFriendlyOnly}
              onChildFriendlyChange={setChildFriendlyOnly}
              womenSafeOnly={womenSafeOnly}
              onWomenSafeChange={setWomenSafeOnly}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Results Main Area */}
          <div className="lg:col-span-3">
            <SearchResults
              results={filteredData}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
