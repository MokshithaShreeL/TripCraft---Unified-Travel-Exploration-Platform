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
  ArrowRight,
  Clock,
  Heart
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useBooking } from "../../context/BookingContext";
import { formatCurrency } from "../../utils/pricing";

export default function SearchResults({
  results = {},
  activeCategory = "all",
  onSelectCategory
}) {
  const { currency, isInWishlist, toggleWishlist, t } = useApp();
  const { openBooking } = useBooking();

  const {
    destinations = [],
    hotels = [],
    packages = [],
    guides = [],
    soloTrips = [],
    totalMatches = 0
  } = results;

  if (totalMatches === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
        <Compass className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-lg font-bold text-white">No Results Found</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          We couldn't find matching destinations, hotels, or packages. Try clearing filters or searching for key hubs like Munnar, Goa, Jaipur, or Ladakh.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* DESTINATIONS SECTION */}
      {(activeCategory === "all" || activeCategory === "destinations") && destinations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Compass className="w-4 h-4 text-teal-400" />
              <span>Destinations ({destinations.length})</span>
            </h3>
            {activeCategory === "all" && destinations.length > 4 && (
              <button
                onClick={() => onSelectCategory("destinations")}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
              >
                View all ({destinations.length})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {destinations.slice(0, activeCategory === "all" ? 4 : destinations.length).map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.id}`}
                className="group bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl overflow-hidden transition-all flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-400 flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{dest.rating}</span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-teal-500/80 backdrop-blur-md text-[10px] font-bold text-white">
                    {dest.category}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">
                      {dest.name}, {dest.state}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{dest.tagline}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Starting from</span>
                    <span className="font-extrabold text-teal-300">
                      {formatCurrency(dest.basePrice, currency)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* HOTELS SECTION */}
      {(activeCategory === "all" || activeCategory === "hotels") && hotels.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Building className="w-4 h-4 text-teal-400" />
              <span>Hotels & Havens ({hotels.length})</span>
            </h3>
            {activeCategory === "all" && hotels.length > 4 && (
              <button
                onClick={() => onSelectCategory("hotels")}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
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
                    {hotel.type}
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
                      <span className="truncate">{hotel.location}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-white">
                        {formatCurrency(hotel.basePricePerNight, currency)}
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

      {/* PACKAGES SECTION */}
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
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
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
                    {pkg.duration}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-400 flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating}</span>
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
                        {formatCurrency(pkg.baseAdultPrice, currency)}
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

      {/* GUIDES SECTION */}
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
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
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
                      {guide.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{guide.specialization}</p>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-extrabold text-teal-300">
                      {formatCurrency(guide.perDayRate, currency)} / day
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

      {/* SOLO TRIPS SECTION */}
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
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
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
