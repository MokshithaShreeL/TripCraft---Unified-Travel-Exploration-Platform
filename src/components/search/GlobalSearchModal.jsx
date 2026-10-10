import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  Compass,
  Building,
  Layers,
  Users,
  Shield,
  ArrowRight,
  Star,
  MapPin,
  Clock
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { searchAll } from "../../utils/searchUtils";
import { formatCurrency } from "../../utils/pricing";

export default function GlobalSearchModal() {
  const { searchModalOpen, setSearchModalOpen, currency, t } = useApp();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Keyboard shortcut listener (Ctrl+K or Cmd+K to open, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      } else if (e.key === "Escape" && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  const results = searchAll(query);

  const handleSelect = (url) => {
    setSearchModalOpen(false);
    navigate(url);
  };

  const trendingTerms = ["Munnar", "Jaipur", "Goa", "Ladakh", "Hampi", "Andaman", "Varanasi"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center space-x-3 bg-navy-950/60">
          <Search className="w-5 h-5 text-teal-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, hotels, heritage packages, local guides, or solo trips..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Categories */}
        <div className="flex items-center space-x-2 px-5 py-2.5 bg-slate-900 border-b border-slate-800 text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              activeCategory === "all"
                ? "bg-teal-500 text-white font-bold"
                : "bg-slate-800/80 text-slate-400 hover:text-white"
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setActiveCategory("destinations")}
            className={`px-3 py-1 rounded-full font-medium transition-all flex items-center space-x-1 ${
              activeCategory === "destinations"
                ? "bg-teal-500 text-white font-bold"
                : "bg-slate-800/80 text-slate-400 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Destinations ({results.destinations.length})</span>
          </button>
          <button
            onClick={() => setActiveCategory("hotels")}
            className={`px-3 py-1 rounded-full font-medium transition-all flex items-center space-x-1 ${
              activeCategory === "hotels"
                ? "bg-teal-500 text-white font-bold"
                : "bg-slate-800/80 text-slate-400 hover:text-white"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Hotels ({results.hotels.length})</span>
          </button>
          <button
            onClick={() => setActiveCategory("packages")}
            className={`px-3 py-1 rounded-full font-medium transition-all flex items-center space-x-1 ${
              activeCategory === "packages"
                ? "bg-teal-500 text-white font-bold"
                : "bg-slate-800/80 text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Packages ({results.packages.length})</span>
          </button>
          <button
            onClick={() => setActiveCategory("guides")}
            className={`px-3 py-1 rounded-full font-medium transition-all flex items-center space-x-1 ${
              activeCategory === "guides"
                ? "bg-teal-500 text-white font-bold"
                : "bg-slate-800/80 text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Local Guides ({results.guides.length})</span>
          </button>
          <button
            onClick={() => setActiveCategory("solo")}
            className={`px-3 py-1 rounded-full font-medium transition-all flex items-center space-x-1 ${
              activeCategory === "solo"
                ? "bg-teal-500 text-white font-bold"
                : "bg-slate-800/80 text-slate-400 hover:text-white"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Solo Trips ({results.soloTrips.length})</span>
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {/* Trending Suggestions when no query is typed */}
          {!query && (
            <div className="space-y-3">
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Trending Destinations
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTerms.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-teal-600/30 hover:border-teal-500/50 border border-slate-700 rounded-xl text-xs text-slate-200 transition-colors flex items-center space-x-1.5"
                  >
                    <MapPin className="w-3 h-3 text-teal-400" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Destinations Section */}
          {(activeCategory === "all" || activeCategory === "destinations") && results.destinations.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs uppercase font-bold text-teal-400 flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Destinations ({results.destinations.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {results.destinations.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => handleSelect(`/destinations/${d.id}`)}
                    className="flex items-center space-x-3 p-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-teal-500/50 rounded-xl cursor-pointer transition-all"
                  >
                    <img src={d.heroImage} alt={d.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{d.name}, {d.state}</div>
                      <div className="text-[11px] text-slate-400 truncate">{d.tagline}</div>
                      <div className="text-[10px] text-teal-400 font-semibold mt-0.5">
                        {formatCurrency(d.basePrice, currency)} • Safety {d.safetyScore}/100
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotels Section */}
          {(activeCategory === "all" || activeCategory === "hotels") && results.hotels.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs uppercase font-bold text-teal-400 flex items-center space-x-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>Verified Hotels & Resorts ({results.hotels.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {results.hotels.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => handleSelect("/hotels")}
                    className="flex items-center space-x-3 p-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-teal-500/50 rounded-xl cursor-pointer transition-all"
                  >
                    <img src={h.image} alt={h.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{h.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{h.location}</div>
                      <div className="text-[10px] text-amber-400 font-semibold flex items-center space-x-1 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{h.rating} ({h.reviewsCount}) • {formatCurrency(h.basePricePerNight, currency)} / night</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local Guides Section */}
          {(activeCategory === "all" || activeCategory === "guides") && results.guides.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs uppercase font-bold text-teal-400 flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Certified Local Guides ({results.guides.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {results.guides.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => handleSelect("/guides")}
                    className="flex items-center space-x-3 p-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-teal-500/50 rounded-xl cursor-pointer transition-all"
                  >
                    <img src={g.avatar} alt={g.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{g.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{g.city} • {g.specialization}</div>
                      <div className="text-[10px] text-teal-400 font-semibold mt-0.5">
                        {formatCurrency(g.perDayRate, currency)} / day • {g.experienceYears} yrs exp
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packages Section */}
          {(activeCategory === "all" || activeCategory === "packages") && results.packages.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs uppercase font-bold text-teal-400 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Travel Packages ({results.packages.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {results.packages.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect("/packages")}
                    className="flex items-center space-x-3 p-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-teal-500/50 rounded-xl cursor-pointer transition-all"
                  >
                    <img src={p.image} alt={p.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{p.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{p.duration} • {p.theme}</div>
                      <div className="text-[10px] text-teal-400 font-semibold mt-0.5">
                        {formatCurrency(p.baseAdultPrice, currency)} / person
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solo Trips Section */}
          {(activeCategory === "all" || activeCategory === "solo") && results.soloTrips.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs uppercase font-bold text-teal-400 flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Solo Safe Experiences ({results.soloTrips.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {results.soloTrips.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleSelect("/solo")}
                    className="flex items-center space-x-3 p-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-teal-500/50 rounded-xl cursor-pointer transition-all"
                  >
                    <img src={s.image} alt={s.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{s.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{s.stayType}</div>
                      <div className="text-[10px] text-teal-400 font-semibold mt-0.5">
                        Safety {s.safetyScore}/100 • {formatCurrency(s.price, currency)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results Fallback */}
          {query && results.totalMatches === 0 && (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-600" />
              <div className="text-sm font-semibold text-slate-300">
                No matching results found for "{query}"
              </div>
              <p className="text-xs max-w-sm mx-auto">
                Try searching for popular destinations like Munnar, Jaipur, Goa, Ladakh, or hotel types.
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-navy-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">ESC</kbd> to close</span>
            <span>•</span>
            <span>Instant search across 38+ hotels, 12 certified guides, and all Indian destinations</span>
          </div>
        </div>
      </div>
    </div>
  );
}
