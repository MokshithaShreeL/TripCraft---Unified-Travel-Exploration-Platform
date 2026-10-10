import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Compass, SlidersHorizontal, Loader2 } from "lucide-react";
import axios from "axios";
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
  const adultsParam = searchParams.get("adults") || "2";
  const childrenParam = searchParams.get("children") || "0";

  const [activeCategory, setActiveCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(35000);
  const [minRating, setMinRating] = useState(0);
  const [childFriendlyOnly, setChildFriendlyOnly] = useState(false);
  const [womenSafeOnly, setWomenSafeOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Live Backend Data State
  const [backendData, setBackendData] = useState(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // Fetch from /api/search on search params update
  useEffect(() => {
    let isMounted = true;
    const fetchLiveSearch = async () => {
      const searchTerm = urlDest !== "All" ? urlDest : urlQuery;
      if (!searchTerm) {
        setBackendData(null);
        return;
      }

      setIsLoadingApi(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/search`, {
          params: {
            destination: searchTerm,
            adults: adultsParam,
            children: childrenParam
          },
          timeout: 4000
        });

        if (isMounted && res.data?.success) {
          setBackendData(res.data);
        }
      } catch (err) {
        console.warn("Live API /api/search offline or fallback mode:", err?.message);
      } finally {
        if (isMounted) setIsLoadingApi(false);
      }
    };

    fetchLiveSearch();
    return () => {
      isMounted = false;
    };
  }, [urlQuery, urlDest, adultsParam, childrenParam]);

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

    // 2. Hotels (Prefer backend live hotels if returned)
    const baseHotels = (backendData?.hotels && backendData.hotels.length > 0)
      ? backendData.hotels.map(h => ({
          id: h.id,
          name: h.name,
          location: h.address || h.location || (backendData.destination?.name + ", " + backendData.destination?.state),
          type: h.hotel_type || "Resort",
          rating: h.rating || 4.8,
          basePricePerNight: h.price_per_night || 4500,
          image: h.image || (h.rooms && h.rooms[0]?.image) || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
          childFriendly: true,
          amenities: typeof h.amenities === 'string' ? JSON.parse(h.amenities || '[]') : ['Free WiFi', 'Breakfast']
        }))
      : HOTELS;

    let hotels = baseHotels.filter((h) => {
      const matchQ = !q || h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q) || h.type.toLowerCase().includes(q);
      const matchDest = dest === "all" || h.location.toLowerCase().includes(dest) || (h.destinationId && h.destinationId.toLowerCase().includes(dest));
      const matchRating = h.rating >= minRating;
      const matchPrice = h.basePricePerNight <= maxPrice;
      const matchChild = !childFriendlyOnly || h.childFriendly;
      return matchQ && matchDest && matchRating && matchPrice && matchChild;
    });

    // 3. Packages (Combine with backend if available)
    const basePackages = (backendData?.packages && backendData.packages.length > 0)
      ? backendData.packages.map(p => ({
          id: p.id,
          title: p.title,
          theme: p.theme || "Curated Discovery",
          duration: `${p.duration_days}D / ${p.duration_nights}N`,
          baseAdultPrice: p.price || 15000,
          rating: 4.9,
          image: p.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        }))
      : PACKAGES;

    let packages = basePackages.filter((p) => {
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.theme.toLowerCase().includes(q);
      const matchDest = dest === "all" || (p.destinationId && p.destinationId.toLowerCase().includes(dest));
      const matchRating = p.rating >= minRating;
      const matchPrice = p.baseAdultPrice <= maxPrice;
      return matchQ && matchDest && matchRating && matchPrice;
    });

    // 4. Guides (Combine with backend if available)
    const baseGuides = (backendData?.guides && backendData.guides.length > 0)
      ? backendData.guides.map(g => ({
          id: g.id,
          name: g.name,
          city: backendData.destination?.name || "Local",
          state: backendData.destination?.state || "India",
          specialization: g.specialization,
          rating: g.rating || 4.9,
          perDayRate: g.daily_rate || 2200,
          badge: g.badge || "Verified Expert",
          avatar: g.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
        }))
      : LOCAL_GUIDES;

    let guides = baseGuides.filter((g) => {
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

    return {
      destinations,
      hotels,
      packages,
      guides,
      soloTrips,
      totalMatches: destinations.length + hotels.length + packages.length + guides.length + soloTrips.length
    };
  }, [urlQuery, urlDest, maxPrice, minRating, childFriendlyOnly, womenSafeOnly, sortBy, backendData]);

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Search Bar at Top */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl">
          <SearchBar
            initialDestination={urlDest !== "All" ? urlDest : ""}
            initialQuery={urlQuery}
            buttonText={t("common.search") || "Search"}
          />
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-extrabold text-teal-400 tracking-wider">
                TripCraft Search Engine
              </span>
              {isLoadingApi && (
                <span className="flex items-center space-x-1 text-[11px] text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/30">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Syncing Live DB</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {urlDest !== "All" ? `Search Results for "${urlDest}"` : urlQuery ? `Search Results for "${urlQuery}"` : "Explore All Travel Journeys"}
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
              destinationMeta={backendData?.destination}
              budgetEstimate={backendData?.budgetEstimate}
              places={backendData?.places}
              hiddenSpots={backendData?.hiddenSpots}
              transports={backendData?.transports}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
