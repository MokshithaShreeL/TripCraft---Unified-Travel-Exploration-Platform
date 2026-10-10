import React from 'react';
import { Plane, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function FlightCard({ flight, onSelect }) {
  if (!flight) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
          <Plane className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-bold text-white">{flight.airline || flight.carrier}</h4>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
              {flight.flightNo || flight.identifier}
            </span>
          </div>
          <div className="text-xs text-slate-400 flex items-center space-x-2 mt-1">
            <span className="font-semibold text-slate-200">{flight.from || flight.from_city}</span>
            <span>→</span>
            <span className="font-semibold text-slate-200">{flight.to || flight.to_city}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{flight.duration}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end space-x-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
        <div className="sm:text-right">
          <div className="text-base font-black text-white">₹{(flight.price || flight.adult_price || 4500).toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-teal-400 font-semibold">{flight.seatsAvailable || 8} seats left</div>
        </div>
        <button
          onClick={() => onSelect(flight)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <span>Select Flight</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
