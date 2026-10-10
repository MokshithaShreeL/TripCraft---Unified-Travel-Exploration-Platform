import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  Printer,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building
} from "lucide-react";
import { getFromStorage, saveToStorage, STORAGE_KEYS } from "../utils/storage";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../utils/pricing";
import { downloadInvoice } from "../utils/invoice";

export default function Bookings() {
  const { currency, addToast, addNotification, t } = useApp();

  const [bookings, setBookings] = useState(() => {
    return getFromStorage(STORAGE_KEYS.BOOKINGS, [
      {
        id: "TC-BK-2026-884210",
        createdAt: "2026-09-24T10:15:00.000Z",
        itemTitle: "Munnar Misty Highland Trails & Tea Sanctuary",
        itemType: "package",
        travelDate: "2026-10-18",
        status: "Confirmed",
        adults: 2,
        children: 1,
        childAges: [7],
        rooms: 1,
        fareSummary: {
          grandTotal: 34157,
          gst: 3660
        },
        contactInfo: {
          fullName: "Priya Sharma",
          email: "priya.backpacker@gmail.com",
          phone: "+91 94455 12345"
        }
      }
    ]);
  });

  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = bookings.filter(
    (b) => activeFilter === "All" || b.status.toLowerCase() === activeFilter.toLowerCase()
  );

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking? Fares will be refunded according to policy.")) {
      const updated = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "Cancelled", paymentStatus: "Refund Processed" } : b
      );
      setBookings(updated);
      saveToStorage(STORAGE_KEYS.BOOKINGS, updated);
      addToast(`Booking #${bookingId} cancelled. Refund of 100% initiated to source payment.`, "info");
      addNotification("Refund Initiated", `100% refund initiated for booking #${bookingId}. Will reflect in 24 hours.`, "info");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
              {t("bookings.title") || "Travel Ledger & Receipts"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
              {t("nav.bookings") || "My Bookings & Invoices"}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              {t("bookings.subtitle") || "Inspect confirmed e-tickets, check booking status, print tax invoices, and manage reservation changes."}
            </p>
          </div>

          <div className="flex bg-navy-950 border border-slate-800 p-1 rounded-xl text-xs">
            {["All", "Confirmed", "Cancelled"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  activeFilter === f
                    ? "bg-teal-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filtered.length === 0 ? (
          <div className="bg-navy-950 border border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">{t("bookings.noBookings") || "No bookings recorded"}</h3>
            <p className="text-xs text-slate-400">
              When you reserve packages, hotels, flights, or solo plans, your e-vouchers will display here.
            </p>
            <Link
              to="/packages"
              className="inline-block px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Browse Packages
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="bg-navy-950 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      #{b.id}
                    </span>
                    <span className="text-[11px] text-slate-500">•</span>
                    <span className="text-xs text-slate-400">
                      Booked on {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                        b.status === "Confirmed"
                          ? "bg-teal-950 text-teal-300 border-teal-700"
                          : "bg-rose-950 text-rose-300 border-rose-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div className="md:col-span-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Experience Title
                    </span>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {b.itemTitle}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Travel Date: <strong className="text-white">{b.travelDate}</strong>
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Guest Breakdown
                    </span>
                    <div className="text-slate-300">
                      {b.adults} Adult(s) {b.children > 0 ? `, ${b.children} Child(ren)` : ""}
                    </div>
                    {b.children > 0 && b.childAges && (
                      <div className="text-[10px] text-teal-400 mt-0.5">
                        Child ages: {b.childAges.join(", ")} yrs
                      </div>
                    )}
                  </div>

                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Total Paid (GST incl.)
                    </span>
                    <div className="text-base font-black text-white">
                      {formatCurrency(b.fareSummary?.grandTotal || 0, currency)}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-semibold">
                      Payment: Verified 256-Bit SSL
                    </div>
                  </div>
                </div>

                {/* Voucher Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    Lead: <strong className="text-slate-200">{b.contactInfo?.fullName}</strong> ({b.contactInfo?.email})
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => downloadInvoice(b)}
                      className="px-3 py-1.5 rounded-lg bg-teal-900/60 border border-teal-700 hover:bg-teal-800 text-xs font-semibold text-teal-200 flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / PDF Voucher</span>
                    </button>

                    {b.status === "Confirmed" && (
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/60 text-xs font-semibold text-rose-300 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
