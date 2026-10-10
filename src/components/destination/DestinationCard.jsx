import React from "react";
import { Link } from "react-router-dom";
import { Star, ShieldCheck, Heart, MapPin, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useBooking } from "../../context/BookingContext";
import { formatCurrency } from "../../utils/pricing";

export default function DestinationCard({ destination }) {
  const { isInWishlist, toggleWishlist, currency, trackRecentlyViewed, t } = useApp();
  const { openBooking } = useBooking();

  const isFavorited = isInWishlist(destination.id);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl transition-all group flex flex-col justify-between">
      {/* Top Image & Micro-Badges */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30"></div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(destination.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900 transition-colors"
          title={isFavorited ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited ? "fill-rose-500 text-rose-500" : "text-white"
            }`}
          />
        </button>

        {/* Safety Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-teal-900/80 backdrop-blur-md border border-teal-500/30 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
          <ShieldCheck className="w-3 h-3" />
          <span>Safety {destination.safetyScore}/100</span>
        </div>

        {/* Bottom overlay info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">
              {destination.category}
            </span>
            <h3 className="text-lg font-bold text-white leading-tight">
              {destination.name}
            </h3>
            <span className="text-xs text-slate-300 flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{destination.state}</span>
            </span>
          </div>

          <div className="flex items-center space-x-1 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{destination.rating}</span>
          </div>
        </div>
      </div>

      {/* Card Content & CTAs */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {destination.description}
        </p>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">
              Starting from
            </div>
            <div className="text-base font-black text-white">
              {formatCurrency(destination.basePrice, currency)}
              <span className="text-[10px] font-normal text-slate-400 ml-1">/ person</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to={`/destinations/${destination.id}`}
              onClick={() => trackRecentlyViewed(destination)}
              className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              onClick={() => {
                trackRecentlyViewed(destination);
                openBooking(destination, "package");
              }}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white transition-colors"
            >
              {t("common.bookNow")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
