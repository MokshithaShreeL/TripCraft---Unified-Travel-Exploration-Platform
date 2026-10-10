import React from 'react';

export default function RevenueChart() {
  const months = [
    { m: 'May', rev: 280000, height: '55%' },
    { m: 'Jun', rev: 320000, height: '65%' },
    { m: 'Jul', rev: 290000, height: '58%' },
    { m: 'Aug', rev: 380000, height: '78%' },
    { m: 'Sep', rev: 410000, height: '84%' },
    { m: 'Oct', rev: 485000, height: '100%' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-white">Monthly Platform Revenue</h4>
          <p className="text-xs text-slate-400">Total bookings and transactions volume</p>
        </div>
        <span className="text-xs font-bold text-teal-400">+24.5% vs last quarter</span>
      </div>

      <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-800">
        {months.map((item) => (
          <div key={item.m} className="flex-1 flex flex-col items-center h-full justify-end group">
            <span className="text-[10px] text-teal-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity mb-1">
              ₹{(item.rev / 1000).toFixed(0)}k
            </span>
            <div
              style={{ height: item.height }}
              className="w-full bg-teal-500/80 hover:bg-teal-400 rounded-t-lg transition-all"
            ></div>
            <span className="text-[11px] text-slate-400 mt-2 font-medium">{item.m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
