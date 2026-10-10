import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Star,
  ShieldCheck,
  CloudSun,
  CheckCircle2,
  Heart,
  Share2,
  Building,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { DESTINATIONS, HOTELS, PACKAGES } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { useBooking } from "../context/BookingContext";
import { formatCurrency } from "../utils/pricing";

export default function DestinationDetails() {
  const { id } = useParams();
  const { currency, isInWishlist, toggleWishlist, addToast, t } = useApp();
  const { openBooking } = useBooking();

  const destination = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];
  const [activePhoto, setActivePhoto] = useState(destination.heroImage);

  // Similar destinations
  const similarDestinations = DESTINATIONS.filter(
    (d) => d.id !== destination.id && (d.category === destination.category || Math.abs(d.basePrice - destination.basePrice) < 2500)
  ).slice(0, 2);

  // Matching hotels and packages
  const matchingHotels = HOTELS.filter((h) => h.destinationId === destination.id);
  const matchingPackages = PACKAGES.filter((p) => p.destinationId === destination.id);

  const isFavorited = isInWishlist(destination.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/destinations" className="hover:text-white">Destinations</Link>
          <span>/</span>
          <span className="text-teal-400 font-semibold">{destination.name}</span>
        </div>

        {/* Title & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {destination.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{destination.state}, India</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              {destination.name}
            </h1>
            <p className="text-xs text-slate-300 mt-1 italic">
              "{destination.tagline}"
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleWishlist(destination.id)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center space-x-1.5 text-xs transition-colors"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-500 text-rose-500" : ""}`} />
              <span>{isFavorited ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                addToast("Destination URL copied to clipboard!");
              }}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center space-x-1.5 text-xs transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-[340px] sm:h-[440px] rounded-2xl overflow-hidden relative border border-slate-800 shadow-xl">
            <img
              src={activePhoto}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
            {destination.gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setActivePhoto(img)}
                className={`h-24 sm:h-32 lg:h-[135px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all shrink-0 w-32 sm:w-44 lg:w-full ${
                  activePhoto === img ? "border-teal-500 scale-[0.98]" : "border-slate-800 opacity-75 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`${destination.name} thumbnail`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Info & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Details, Weather, Safety, Highlights */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description */}
            <div className="bg-navy-950 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white">About {destination.name}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {destination.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Best Time To Visit</span>
                  <span className="font-bold text-white">{destination.bestTimeToVisit}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Suggested Duration</span>
                  <span className="font-bold text-white">{destination.suggestedDuration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Ideal Travelers</span>
                  <span className="font-bold text-teal-400">{destination.idealFor.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Weather & Solo Safety Score */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Weather Widget */}
              <div className="bg-navy-950 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <CloudSun className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Current Weather</div>
                  <div className="text-xl font-black text-white">{destination.weather.temp}</div>
                  <div className="text-xs text-slate-300">{destination.weather.condition} • {destination.weather.humidity} humidity</div>
                </div>
              </div>

              {/* Safety Widget */}
              <div className="bg-navy-950 border border-teal-500/30 p-5 rounded-2xl flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-teal-400">Solo Safety Index</div>
                  <div className="text-xl font-black text-white">{destination.safetyScore} / 100</div>
                  <div className="text-xs text-slate-300">Women-Safe Score: <strong>{destination.womenSafeScore}%</strong> (24/7 Monitored)</div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-navy-950 border border-slate-800 p-6 rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-white">Curated Local Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {destination.highlights.map((h, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compare with Similar Destinations */}
            {similarDestinations.length > 0 && (
              <div className="bg-navy-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Compare with Similar Destinations</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarDestinations.map((sim) => (
                    <div key={sim.id} className="bg-slate-900 border border-slate-700/80 p-4 rounded-xl flex items-center space-x-3">
                      <img src={sim.heroImage} alt={sim.name} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1 overflow-hidden">
                        <h4 className="text-xs font-bold text-white truncate">{sim.name}</h4>
                        <div className="text-[10px] text-slate-400">{sim.category} • {sim.weather.temp}</div>
                        <div className="text-xs font-bold text-teal-400 mt-1">
                          From {formatCurrency(sim.basePrice, currency)}
                        </div>
                      </div>
                      <Link
                        to={`/destinations/${sim.id}`}
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] font-semibold"
                      >
                        Compare
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Booking Action Panel & Available Options */}
          <div className="space-y-6">
            {/* Sticky Booking CTA Card */}
            <div className="bg-navy-950 border border-teal-500/40 p-6 rounded-2xl shadow-xl space-y-4 sticky top-24">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Base Experience Rate</span>
                <span className="text-xs font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-700">
                  Dynamic Realism
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-black text-white">
                {formatCurrency(destination.basePrice, currency)}
                <span className="text-xs font-normal text-slate-400 ml-1.5">/ adult</span>
              </div>

              <p className="text-[11px] text-slate-400">
                Children (2-11) priced at 60% with verified bed concessions. 12% GST calculated transparently in modal.
              </p>

              <button
                onClick={() => openBooking(destination, "package")}
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white rounded-xl font-bold text-xs shadow-lg transition-all"
              >
                Book Custom Trip to {destination.name}
              </button>

              <div className="text-[11px] text-slate-400 space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Free cancellation up to 72 hours prior</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Instant confirmed e-ticket voucher & invoice</span>
                </div>
              </div>
            </div>

            {/* Matching Hotels in this Destination */}
            {matchingHotels.length > 0 && (
              <div className="bg-navy-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                  <Building className="w-4 h-4 text-teal-400" />
                  <span>Verified Hotels in {destination.name}</span>
                </h4>
                {matchingHotels.map((h) => (
                  <div key={h.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <h5 className="text-xs font-bold text-white truncate max-w-[180px]">{h.name}</h5>
                      <span className="text-xs font-bold text-teal-400">{formatCurrency(h.basePricePerNight, currency)}</span>
                    </div>
                    <button
                      onClick={() => openBooking(h, "hotel")}
                      className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold"
                    >
                      Reserve Hotel
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
