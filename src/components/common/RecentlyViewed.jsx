import React from "react";
import { Link } from "react-router-dom";
import { History, Star, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useBooking } from "../../context/BookingContext";
import { formatCurrency } from "../../utils/pricing";

export default function RecentlyViewed() {
  const { recentlyViewed, currency } = useApp();
  const { openBooking } = useBooking();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <div className="bg-slate-900 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-4">
          <History className="w-4 h-4" />
          <span>Recently Explored By You</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentlyViewed.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="bg-navy-950 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between p-3"
            >
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src={item.heroImage || item.image || "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=200&q=80"}
                  alt={item.name || item.title}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">
                    {item.name || item.title}
                  </h4>
                  <div className="flex items-center space-x-1 text-[11px] text-amber-400 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{item.rating || 4.9}</span>
                  </div>
                  <div className="text-[11px] font-bold text-teal-400 mt-0.5">
                    From {formatCurrency(item.basePrice || item.baseAdultPrice || 3500, currency)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <Link
                  to={item.category ? `/destinations/${item.id}` : "/packages"}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                <button
                  onClick={() => openBooking(item, item.category ? "package" : "package")}
                  className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded text-[11px] font-bold transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
