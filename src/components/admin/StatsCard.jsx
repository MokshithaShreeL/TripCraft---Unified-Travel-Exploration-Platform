import React from 'react';

export default function StatsCard({ title, value, change, icon: Icon, color = 'teal' }) {
  const colorMap = {
    teal: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    rose: 'bg-rose-500/10 border-rose-500/30 text-rose-400'
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-xl border ${colorMap[color] || colorMap.teal}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div>
        <div className="text-2xl font-black text-white">{value}</div>
        {change && <div className="text-[11px] text-teal-400 mt-1 font-semibold">{change}</div>}
      </div>
    </div>
  );
}
