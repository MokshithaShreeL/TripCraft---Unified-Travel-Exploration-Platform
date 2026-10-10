import React from 'react';
import { Car, Users, Fuel, ArrowRight } from 'lucide-react';

export default function VehicleCard({ vehicle, onRent }) {
  if (!vehicle) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-2xl overflow-hidden transition-all flex flex-col group">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-teal-300">
          {vehicle.category}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h4 className="text-sm font-bold text-white">{vehicle.name}</h4>
          <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
            <span className="flex items-center space-x-1">
              <Users className="w-3 h-3 text-slate-500" />
              <span>{vehicle.seating_capacity || 5} Seats</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Fuel className="w-3 h-3 text-slate-500" />
              <span>{vehicle.fuel_type || 'Diesel'}</span>
            </span>
          </div>
        </div>
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-sm font-black text-white">₹{(vehicle.price_per_day || 3500).toLocaleString('en-IN')}</div>
            <div className="text-[10px] text-slate-500">per day</div>
          </div>
          <button
            onClick={() => onRent(vehicle)}
            className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold cursor-pointer"
          >
            Rent Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}
