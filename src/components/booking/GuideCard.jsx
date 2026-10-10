import React from 'react';
import { User, Star, ShieldCheck, ArrowRight } from 'lucide-react';

export default function GuideCard({ guide, onHire }) {
  if (!guide) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-4 flex items-center space-x-4 transition-all">
      <img
        src={guide.avatar}
        alt={guide.name}
        className="w-16 h-16 rounded-2xl object-cover shrink-0 ring-1 ring-teal-500/30"
      />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center space-x-2">
          <h4 className="text-xs font-bold text-white truncate">{guide.name}</h4>
          <span className="text-[9px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded border border-teal-500/30">
            {guide.badge || 'Verified'}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 truncate">{guide.specialization}</p>
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="font-extrabold text-teal-300">
            ₹{(guide.perDayRate || guide.per_day_rate || 2000).toLocaleString('en-IN')} / day
          </span>
          <button
            onClick={() => onHire(guide)}
            className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-[10px] font-bold cursor-pointer"
          >
            Hire
          </button>
        </div>
      </div>
    </div>
  );
}
