import React from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ArrowRight, Compass } from "lucide-react";
import { DESTINATIONS, PACKAGES, HOTELS } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { useBooking } from "../context/BookingContext";
import { formatCurrency } from "../utils/pricing";

export default function Wishlist() {
  const { wishlist, toggleWishlist, currency, t } = useApp();
  const { openBooking } = useBooking();

  // Aggregate wishlisted items across destinations, packages, and hotels
  const allItems = [...DESTINATIONS, ...PACKAGES, ...HOTELS];
  const savedItems = allItems.filter((item) => wishlist.includes(item.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs uppercase font-bold text-rose-400 tracking-wider">
            {t("wishlist.title") || "Curated Saved Experiences"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
            {t("nav.wishlist") || "My Wishlist"} ({savedItems.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            {t("wishlist.subtitle") || "Review your shortlisted destinations, packages, and luxury stays. Book instantly when you're ready to travel."}
          </p>
        </div>

        {savedItems.length === 0 ? (
          <div className="bg-navy-950 border border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">{t("wishlist.emptyWishlist") || "Your wishlist is currently empty"}</h3>
            <p className="text-xs text-slate-400">
              Browse our destinations or packages and tap the heart icon to save your favorites for later!
            </p>
            <Link
              to="/destinations"
              className="inline-block px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              {t("common.explore") || "Explore Destinations"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((item) => {
              const title = item.name || item.title;
              const image = item.heroImage || item.image;
              const price = item.basePrice || item.baseAdultPrice || item.basePricePerNight;

              return (
                <div
                  key={item.id}
                  className="bg-navy-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] relative">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 text-rose-400 hover:text-white transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {item.description || item.tagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase">Tariff from</div>
                        <div className="text-base font-black text-white">
                          {formatCurrency(price, currency)}
                        </div>
                      </div>

                      <button
                        onClick={() => openBooking(item, item.category ? "package" : "hotel")}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
