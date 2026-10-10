import React, { useState } from 'react';
import { Calendar, Search, Filter, Printer, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../../utils/storage';
import { formatCurrency } from '../../utils/pricing';
import { downloadInvoice } from '../../utils/invoice';

import AdminNav from '../../components/admin/AdminNav';

export default function Bookings() {
  const { currency, addToast } = useApp();

  const [bookings, setBookings] = useState(() => {
    return getFromStorage(STORAGE_KEYS.BOOKINGS, [
      {
        id: 'TC-BK-2026-884210',
        createdAt: '2026-09-24T10:15:00.000Z',
        itemTitle: 'Munnar Misty Highland Trails & Tea Sanctuary',
        itemType: 'package',
        destination: 'Munnar, Kerala',
        travelDate: '2026-10-18',
        status: 'Confirmed',
        adults: 2,
        children: 1,
        fareSummary: { grandTotal: 34157, gst: 3660 },
        contactInfo: { fullName: 'Priya Sharma', email: 'priya.backpacker@gmail.com', phone: '+91 94455 12345' }
      },
      {
        id: 'TC-BK-2026-551902',
        createdAt: '2026-09-23T14:20:00.000Z',
        itemTitle: 'Jaipur Royal Forts & Culinary Splendor',
        itemType: 'package',
        destination: 'Jaipur, Rajasthan',
        travelDate: '2026-10-25',
        status: 'Confirmed',
        adults: 2,
        children: 2,
        fareSummary: { grandTotal: 32396, gst: 3471 },
        contactInfo: { fullName: 'Vikram Iyer', email: 'vikram.family@tripcraft.io', phone: '+91 98200 45678' }
      },
      {
        id: 'TC-BK-2026-102941',
        createdAt: '2026-09-21T09:00:00.000Z',
        itemTitle: 'Blanket Luxury Rainforest Resort & Spa',
        itemType: 'hotel',
        destination: 'Munnar, Kerala',
        travelDate: '2026-11-04',
        status: 'Completed',
        adults: 2,
        children: 0,
        fareSummary: { grandTotal: 19936, gst: 2136 },
        contactInfo: { fullName: 'Ananya Roy', email: 'ananya.luxury@gmail.com', phone: '+91 99300 78901' }
      },
      {
        id: 'TC-BK-2026-339811',
        createdAt: '2026-09-18T16:45:00.000Z',
        itemTitle: 'Royal Enfield Himalayan 450 Rental',
        itemType: 'vehicle',
        destination: 'Leh Ladakh',
        travelDate: '2026-10-10',
        status: 'Confirmed',
        adults: 1,
        children: 0,
        fareSummary: { grandTotal: 9000, gst: 964 },
        contactInfo: { fullName: 'Arjun Kumar', email: 'arjun@example.com', phone: '+91 98765 43211' }
      }
    ]);
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredBookings = bookings.filter((b) => {
    const matchStatus =
      filterStatus === 'All' || b.status.toLowerCase() === filterStatus.toLowerCase();
    const matchSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.itemTitle && b.itemTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.contactInfo?.fullName && b.contactInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.destination && b.destination.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchStatus && matchSearch;
  });

  const handleUpdateStatus = (bookingId, newStatus) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    saveToStorage(STORAGE_KEYS.BOOKINGS, updated);
    addToast(`Booking #${bookingId} status updated to ${newStatus}`, 'success');
  };

  const totalValue = bookings.reduce(
    (acc, b) => acc + (b.fareSummary?.grandTotal || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <AdminNav />

        {/* Bookings Ledger Control Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Central Bookings & Reservations Ledger</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Audit confirmed travel vouchers, process modifications, and verify financial escrow clearances.
              </p>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex items-center space-x-3 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                Bookings: <strong className="text-white">{bookings.length}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300">
                Ledger Total: <strong className="text-white">{formatCurrency(totalValue, currency)}</strong>
              </span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-slate-800/80">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Booking ID, Guest Name, or Experience..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
              {['All', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    filterStatus === status
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Table with Interactive Status Selector & Print Action */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Traveler / Lead</th>
                  <th className="py-3 px-4">Experience Title</th>
                  <th className="py-3 px-4">Travel Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-xs text-slate-500">
                      No matching reservations recorded in ledger.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono text-teal-400 font-bold">{b.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{b.contactInfo?.fullName || 'Traveler'}</div>
                        <div className="text-[11px] text-slate-400">{b.contactInfo?.email}</div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        {b.itemTitle}
                        <div className="text-[10px] text-slate-500 capitalize">{b.itemType || 'Package'}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{b.travelDate}</td>
                      <td className="py-3 px-4 font-bold text-white">
                        {formatCurrency(b.fareSummary?.grandTotal || 0, currency)}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            b.status === 'Confirmed'
                              ? 'bg-teal-950 text-teal-300 border-teal-700'
                              : b.status === 'Completed'
                              ? 'bg-blue-950 text-blue-300 border-blue-700'
                              : 'bg-rose-950 text-rose-300 border-rose-700'
                          }`}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => downloadInvoice(b)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg text-[10px] font-semibold inline-flex items-center space-x-1 cursor-pointer transition-colors"
                        >
                          <Printer className="w-3 h-3" />
                          <span>Voucher</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
