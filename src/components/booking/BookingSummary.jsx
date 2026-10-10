import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function BookingSummary({ booking }) {
  if (!booking) return null;

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-bold text-white">{booking.itemTitle}</h4>
          <p className="text-xs text-slate-400">{booking.destination} • {booking.travelDate}</p>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">
          Confirmed
        </span>
      </div>

      <div className="space-y-2 text-xs text-slate-300">
        <div className="flex justify-between">
          <span className="text-slate-400">Total Travelers:</span>
          <span>{booking.adults || 1} Adult(s), {booking.children || 0} Child(ren)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Total Rooms:</span>
          <span>{booking.rooms || 1}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-slate-800 font-bold text-white text-sm">
          <span>Amount Paid:</span>
          <span className="text-teal-400">₹{(booking.fareSummary?.grandTotal || 12000).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
