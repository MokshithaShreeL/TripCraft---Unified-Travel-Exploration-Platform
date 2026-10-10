import React from 'react';
import { Building, Star, MapPin, ArrowRight } from 'lucide-react';

export default function HotelCard({ hotel, onBook }) {
  if (!hotel) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-2xl overflow-hidden transition-all flex flex-col group">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-400 flex items-center space-x-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{hotel.rating}</span>
        </div>
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-teal-500/80 backdrop-blur-md text-[10px] font-bold text-white">
          {hotel.type}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h4 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-1">{hotel.name}</h4>
          <div className="flex items-center space-x-1 text-xs text-slate-400 mt-1">
            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate">{hotel.location}</span>
          </div>
        </div>
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-sm font-black text-white">₹{(hotel.basePricePerNight || hotel.base_price_per_night || 5000).toLocaleString('en-IN')}</div>
            <div className="text-[10px] text-slate-500">per night</div>
          </div>
          <button
            onClick={() => onBook(hotel)}
            className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold cursor-pointer"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
