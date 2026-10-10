import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Plus,
  Minus,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { DESTINATIONS } from "../../data/mockData";
import { useApp } from "../../context/AppContext";

export default function SearchBar({
  initialQuery = "",
  initialDestination = "All",
  initialAdults = 2,
  initialChildren = 0,
  initialRooms = 1,
  onSearchSubmit,
  compact = false
}) {
  const navigate = useNavigate();
  const { t } = useApp();

  const [query, setQuery] = useState(initialQuery);
  const [destination, setDestination] = useState(initialDestination);
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const [guests, setGuests] = useState({
    adults: initialAdults,
    children: initialChildren,
    rooms: initialRooms
  });
  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);
  const [destSuggestionsOpen, setDestSuggestionsOpen] = useState(false);

  const popoverRef = useRef(null);
  const destRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setGuestPopoverOpen(false);
      }
      if (destRef.current && !destRef.current.contains(e.target)) {
        setDestSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalGuests = guests.adults + guests.children;

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (destination !== "All") params.set("destination", destination);
    if (guests.adults) params.set("adults", guests.adults);
    if (guests.children) params.set("children", guests.children);
    if (guests.rooms) params.set("rooms", guests.rooms);

    if (onSearchSubmit) {
      onSearchSubmit({
        query: query.trim(),
        destination,
        guests,
        dates
      });
    } else {
      navigate(`/search?${params.toString()}`);
    }
  };

  const updateGuests = (field, delta) => {
    setGuests((prev) => {
      const current = prev[field];
      const min = field === "adults" || field === "rooms" ? 1 : 0;
      const max = field === "rooms" ? 5 : 10;
      const next = Math.max(min, Math.min(max, current + delta));
      return { ...prev, [field]: next };
    });
  };

  const popularDestinations = [
    "Munnar", "Goa", "Jaipur", "Ladakh", "Andaman", "Varanasi", "Rishikesh", "Hampi"
  ];

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-3 sm:p-4 shadow-2xl transition-all ${
        compact ? "max-w-4xl" : "max-w-5xl"
      } mx-auto`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        
        {/* Where To / Search Query */}
        <div ref={destRef} className="relative p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <label className="text-[10px] uppercase font-bold text-teal-400 tracking-wider block">
            {t("common.whereTo") || "Where to?"}
          </label>
          <div className="flex items-center space-x-2 mt-0.5">
            <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setDestSuggestionsOpen(true);
              }}
              onFocus={() => setDestSuggestionsOpen(true)}
              placeholder="e.g. Munnar, Beach, Palace"
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Destination Suggestions Popover */}
          {destSuggestionsOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Popular Destinations</span>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {popularDestinations.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => {
                      setQuery(dest);
                      setDestination(dest);
                      setDestSuggestionsOpen(false);
                    }}
                    className="text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-300 transition-colors cursor-pointer flex items-center space-x-1.5"
                  >
                    <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                    <span className="truncate">{dest}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* When / Travel Dates */}
        <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <label className="text-[10px] uppercase font-bold text-teal-400 tracking-wider block">
            When
          </label>
          <div className="flex items-center space-x-2 mt-0.5">
            <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              type="date"
              value={dates.checkIn}
              onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
              className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>

        {/* Guests & Rooms Popover Trigger */}
        <div ref={popoverRef} className="relative p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <label className="text-[10px] uppercase font-bold text-teal-400 tracking-wider block">
            Guests & Rooms
          </label>
          <button
            type="button"
            onClick={() => setGuestPopoverOpen(!guestPopoverOpen)}
            className="flex items-center justify-between w-full mt-0.5 text-left text-xs sm:text-sm text-slate-200 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-slate-500 shrink-0" />
              <span>
                {totalGuests} Guest{totalGuests > 1 ? "s" : ""}, {guests.rooms} Room{guests.rooms > 1 ? "s" : ""}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Guest Count Popover Modal */}
          {guestPopoverOpen && (
            <div className="absolute top-full left-0 sm:right-0 sm:left-auto w-72 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Adults</div>
                  <div className="text-[10px] text-slate-400">Ages 13 and above</div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <button
                    type="button"
                    disabled={guests.adults <= 1}
                    onClick={() => updateGuests("adults", -1)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white w-4 text-center">{guests.adults}</span>
                  <button
                    type="button"
                    onClick={() => updateGuests("adults", 1)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-bold text-white">Children</div>
                  <div className="text-[10px] text-slate-400">Ages 0 to 12</div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <button
                    type="button"
                    disabled={guests.children <= 0}
                    onClick={() => updateGuests("children", -1)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white w-4 text-center">{guests.children}</span>
                  <button
                    type="button"
                    onClick={() => updateGuests("children", 1)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-bold text-white">Rooms</div>
                  <div className="text-[10px] text-slate-400">Private accommodation</div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <button
                    type="button"
                    disabled={guests.rooms <= 1}
                    onClick={() => updateGuests("rooms", -1)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white w-4 text-center">{guests.rooms}</span>
                  <button
                    type="button"
                    onClick={() => updateGuests("rooms", 1)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setGuestPopoverOpen(false)}
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xl shadow-teal-900/40 flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>{t("common.search") || "Find Journeys"}</span>
          </button>
        </div>

      </div>
    </form>
  );
}
