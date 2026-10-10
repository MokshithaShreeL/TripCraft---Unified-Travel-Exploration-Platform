import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  ShieldCheck,
  Building,
  Compass,
  Layers,
  Users,
  Shield,
  Clock,
  Sparkles,
  Plane,
  Train,
  Bus,
  Car,
  Eye,
  CheckCircle2,
  DollarSign,
  TrendingDown,
  Info
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useBooking } from "../../context/BookingContext";
import { formatCurrency } from "../../utils/pricing";

export default function SearchResults({
  results = {},
  activeCategory = "all",
  onSelectCategory,
  destinationMeta = null,
  budgetEstimate = null,
  places = [],
  hiddenSpots = [],
  transports = []
}) {
  const { currency, t } = useApp();
  const { openBooking } = useBooking();

  const {
    destinations = [],
    hotels = [],
    packages = [],
    guides = [],
    soloTrips = [],
    totalMatches = 0
  } = results;

  const hasAnyResults =
    totalMatches > 0 ||
    destinations.length > 0 ||
    hotels.length > 0 ||
    places.length > 0 ||
    hiddenSpots.length > 0 ||
    destinationMeta !== null;

  if (!hasAnyResults) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
        <Compass className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-lg font-bold text-white">No Results Found</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          We couldn't find matching destinations, hotels, or packages. Try searching for popular hubs like Munnar, Goa, Jaipur, Leh Ladakh, or Andaman.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* 1. DESTINATION HEADER & VERIFIED METADATA */}
      {destinationMeta && (
        <div className="relative rounded-3xl overflow-hidden border border-teal-500/30 bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  Verified Destination Hub
                </span>
                {destinationMeta.safetyScore && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span>Safety Score: {destinationMeta.safetyScore}/100</span>
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {destinationMeta.name}, {destinationMeta.state}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {destinationMeta.tagline || destinationMeta.description || "Discover verified stays, certified local guides, curated trekking paths, and hidden local gems."}
              </p>
              {destinationMeta.bestTimeToVisit && (
                <div className="text-xs text-slate-400 flex items-center space-x-2 pt-1">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  <span><strong>Best Season:</strong> {destinationMeta.bestTimeToVisit}</span>
                </div>
              )}
            </div>

            {destinationMeta.image && (
              <div className="sm:w-56 h-36 rounded-2xl overflow-hidden border border-slate-700 shrink-0">
                <img
                  src={destinationMeta.image}
                  alt={destinationMeta.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. DYNAMIC BUDGET ESTIMATE CARD */}
      {budgetEstimate && (
        <div className="bg-slate-900/90 border border-teal-500/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-teal-400" />
              <h3 className="text-sm font-bold text-white">
                Smart Trip Budget Estimate ({budgetEstimate.travelers || 2} Travelers, {budgetEstimate.durationDays || 4} Days)
              </h3>
            </div>
            <div className="text-xs text-slate-400">
              Est. Total: <span className="text-base font-black text-teal-300">{formatCurrency(budgetEstimate.total || budgetEstimate.totalEstimatedCost, currency)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Accommodation</span>
              <span className="font-bold text-white mt-1 block">
                {formatCurrency(budgetEstimate.breakdown?.stay || budgetEstimate.accommodation || 12000, currency)}
              </span>
              <span className="text-[10px] text-teal-400">~40% of budget</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Transit & Flights</span>
              <span className="font-bold text-white mt-1 block">
                {formatCurrency(budgetEstimate.breakdown?.transit || budgetEstimate.transport || 7500, currency)}
              </span>
              <span className="text-[10px] text-teal-400">~25% of budget</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Food & Dining</span>
              <span className="font-bold text-white mt-1 block">
                {formatCurrency(budgetEstimate.breakdown?.food || budgetEstimate.food || 6000, currency)}
              </span>
              <span className="text-[10px] text-teal-400">~20% of budget</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Buffer & Activities</span>
              <span className="font-bold text-white mt-1 block">
                {formatCurrency(budgetEstimate.breakdown?.activities || budgetEstimate.activities || 4500, currency)}
              </span>
              <span className="text-[10px] text-amber-400">~15% reserve</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. BEST PLACES & ATTRACTIONS */}
      {places && places.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Compass className="w-4 h-4 text-teal-400" />
            <span>Best Places & Must-Visit Attractions ({places.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map((place, idx) => (
              <div
                key={place.id || idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-teal-500/40 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                      {place.category || "Sightseeing"}
                    </span>
                    {place.rating && (
                      <span className="text-[11px] font-bold text-amber-400 flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{place.rating}</span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                    {place.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {place.description || place.notes}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Entry: {place.entry_fee ? formatCurrency(place.entry_fee, currency) : "Free"}</span>
                  <span className="text-teal-400 font-semibold">{place.best_time || "Morning"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. HIDDEN LOCAL SPOTS */}
      {hiddenSpots && hiddenSpots.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Offbeat & Hidden Spots ({hiddenSpots.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hiddenSpots.map((spot, idx) => (
              <div
                key={spot.id || idx}
                className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 space-y-2 hover:border-amber-400 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                    Secret Haven
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Difficulty: {spot.access_difficulty || "Moderate"}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{spot.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{spot.description}</p>
                {spot.tips && (
                  <div className="text-[11px] text-amber-300/90 italic bg-amber-950/20 p-2 rounded-lg border border-amber-500/20">
                    💡 <strong>Insider Tip:</strong> {spot.tips}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. MULTI-MODAL TRANSPORT COMPARISON */}
      {transports && transports.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Plane className="w-4 h-4 text-teal-400" />
              <span>Multi-Modal Transport Options</span>
            </h3>
            <Link to="/transport" className="text-xs text-teal-400 hover:text-teal-300 font-semibold">
              View transit suite &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {transports.map((tItem, idx) => (
              <div
                key={tItem.id || idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                    {tItem.type === 'flight' && <Plane className="w-3.5 h-3.5" />}
                    {tItem.type === 'train' && <Train className="w-3.5 h-3.5" />}
                    {tItem.type === 'bus' && <Bus className="w-3.5 h-3.5" />}
                    {tItem.type === 'cab' && <Car className="w-3.5 h-3.5" />}
                    <span>{tItem.type || 'Transit'}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1">{tItem.title || tItem.operator || tItem.name}</h4>
                  <div className="text-[11px] text-slate-400 mt-1">{tItem.duration || 'Fast connection'}</div>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-teal-300">{formatCurrency(tItem.price || 1500, currency)}</span>
                  <Link
                    to="/transport"
                    className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-[10px] font-bold"
                  >
                    Compare
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. HOTELS SECTION */}
      {(activeCategory === "all" || activeCategory === "hotels") && hotels.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Building className="w-4 h-4 text-teal-400" />
              <span>Recommended Hotels & Havens ({hotels.length})</span>
            </h3>
            {activeCategory === "all" && hotels.length > 4 && (
              <button
                onClick={() => onSelectCategory("hotels")}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
              >
                View all ({hotels.length})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hotels.slice(0, activeCategory === "all" ? 4 : hotels.length).map((hotel) => (
              <div
                key={hotel.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all flex flex-col group"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-teal-300 border border-teal-500/30">
                    {hotel.type || hotel.hotel_type || "Resort"}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-400 flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <Link
                      to={`/hotels/${hotel.id}`}
                      className="text-sm font-bold text-white hover:text-teal-400 transition-colors line-clamp-1 block"
                    >
                      {hotel.name}
                    </Link>
                    <div className="flex items-center space-x-1 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">{hotel.location || hotel.address}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-white">
                        {formatCurrency(hotel.basePricePerNight || hotel.price_per_night, currency)}
                      </div>
                      <div className="text-[10px] text-slate-500">per night</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/hotels/${hotel.id}`}
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => openBooking(hotel, "hotel")}
                        className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. CERTIFIED LOCAL GUIDES */}
      {(activeCategory === "all" || activeCategory === "guides") && guides.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Users className="w-4 h-4 text-teal-400" />
              <span>Certified Local Guides ({guides.length})</span>
            </h3>
            {activeCategory === "all" && guides.length > 4 && (
              <button
                onClick={() => onSelectCategory("guides")}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
              >
                View all ({guides.length})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guides.slice(0, activeCategory === "all" ? 4 : guides.length).map((guide) => (
              <div
                key={guide.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex items-center space-x-4 transition-all"
              >
                <img
                  src={guide.avatar}
                  alt={guide.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 ring-1 ring-teal-500/30"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-white truncate">{guide.name}</h4>
                    <span className="text-[9px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded border border-teal-500/30">
                      {guide.badge || "Verified Guide"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{guide.specialization || guide.languages}</p>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-extrabold text-teal-300">
                      {formatCurrency(guide.perDayRate || guide.daily_rate, currency)} / day
                    </span>
                    <button
                      onClick={() => openBooking(guide, "guide")}
                      className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                    >
                      Hire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. PACKAGES SECTION */}
      {(activeCategory === "all" || activeCategory === "packages") && packages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Tour Packages ({packages.length})</span>
            </h3>
            {activeCategory === "all" && packages.length > 4 && (
              <button
                onClick={() => onSelectCategory("packages")}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
              >
                View all ({packages.length})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {packages.slice(0, activeCategory === "all" ? 4 : packages.length).map((pkg) => (
              <div
                key={pkg.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all flex flex-col group"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-teal-300">
                    {pkg.duration || `${pkg.duration_days}D / ${pkg.duration_nights}N`}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-400 flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating || 4.9}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{pkg.title}</h4>
                    <p className="text-[11px] text-teal-400/90 font-medium mt-0.5">{pkg.theme}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-white">
                        {formatCurrency(pkg.baseAdultPrice || pkg.price, currency)}
                      </div>
                      <div className="text-[10px] text-slate-500">per traveler</div>
                    </div>
                    <button
                      onClick={() => openBooking(pkg, "package")}
                      className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. SOLO TRIPS SECTION */}
      {(activeCategory === "all" || activeCategory === "solo") && soloTrips.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-teal-400" />
              <span>Solo Travel & Backpacker Trips ({soloTrips.length})</span>
            </h3>
            {activeCategory === "all" && soloTrips.length > 4 && (
              <button
                onClick={() => onSelectCategory("solo")}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
              >
                View all ({soloTrips.length})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {soloTrips.slice(0, activeCategory === "all" ? 4 : soloTrips.length).map((trip) => (
              <div
                key={trip.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all flex flex-col group"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {trip.womenSafe && (
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-teal-500/90 text-slate-950 text-[10px] font-bold flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Women-Safe</span>
                    </div>
                  )}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-teal-300">
                    {trip.duration}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{trip.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{trip.stayType}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-white">
                        {formatCurrency(trip.price, currency)}
                      </div>
                      <div className="text-[10px] text-slate-500">all inclusive</div>
                    </div>
                    <button
                      onClick={() => openBooking(trip, "solo")}
                      className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Join Solo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
