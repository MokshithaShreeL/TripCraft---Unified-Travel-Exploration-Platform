import React from 'react';

export default function BookingTable({ bookings }) {
  if (!bookings || bookings.length === 0) {
    return <div className="text-xs text-slate-500 py-4 text-center">No bookings recorded</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
          <tr>
            <th className="py-3 px-4">Booking ID</th>
            <th className="py-3 px-4">Experience / Item</th>
            <th className="py-3 px-4">Destination</th>
            <th className="py-3 px-4">Travel Date</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
              <td className="py-3 px-4 font-mono text-teal-400">{b.id}</td>
              <td className="py-3 px-4 font-semibold text-white">{b.item_title || b.itemTitle}</td>
              <td className="py-3 px-4 text-slate-300">{b.destination}</td>
              <td className="py-3 px-4 text-slate-400">{b.travel_date || b.travelDate}</td>
              <td className="py-3 px-4">
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold">
                  {b.status || 'Confirmed'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
