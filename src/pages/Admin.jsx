import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Layers,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  Filter,
  RefreshCw,
  LogOut,
  Building,
  Award,
  Star,
  MapPin
} from "lucide-react";
import { DESTINATIONS, PACKAGES, DEMO_USERS, HOTELS, LOCAL_GUIDES } from "../data/mockData";
import { getFromStorage, saveToStorage, STORAGE_KEYS } from "../utils/storage";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../utils/pricing";

export default function Admin() {
  const { currency, addToast, logout, currentUser, t } = useApp();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState(() => {
    return getFromStorage(STORAGE_KEYS.BOOKINGS, [
      {
        id: "TC-BK-2026-884210",
        createdAt: "2026-09-24T10:15:00.000Z",
        itemTitle: "Munnar Misty Highland Trails & Tea Sanctuary",
        travelDate: "2026-10-18",
        status: "Confirmed",
        adults: 2,
        children: 1,
        fareSummary: { grandTotal: 34157 },
        contactInfo: { fullName: "Priya Sharma", email: "priya.backpacker@gmail.com" }
      },
      {
        id: "TC-BK-2026-551902",
        createdAt: "2026-09-23T14:20:00.000Z",
        itemTitle: "Jaipur Royal Forts & Culinary Splendor",
        travelDate: "2026-10-25",
        status: "Confirmed",
        adults: 2,
        children: 2,
        fareSummary: { grandTotal: 32396 },
        contactInfo: { fullName: "Vikram Iyer", email: "vikram.family@tripcraft.io" }
      },
      {
        id: "TC-BK-2026-102941",
        createdAt: "2026-09-21T09:00:00.000Z",
        itemTitle: "Blanket Luxury Rainforest Resort & Spa",
        travelDate: "2026-11-04",
        status: "Completed",
        adults: 2,
        children: 0,
        fareSummary: { grandTotal: 19936 },
        contactInfo: { fullName: "Ananya Roy", email: "ananya.luxury@gmail.com" }
      }
    ]);
  });

  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" | "users" | "hotels" | "guides" | "revenue"

  // KPI Calculations
  const totalRevenue = bookings.reduce(
    (acc, curr) => acc + (curr.fareSummary?.grandTotal || 0),
    0
  );

  const handleUpdateStatus = (bookingId, newStatus) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    saveToStorage(STORAGE_KEYS.BOOKINGS, updated);
    addToast(`Booking #${bookingId} marked as ${newStatus}`, "success");
  };

  const handleAdminSignOut = () => {
    logout();
    addToast("Logged out of Administrator Portal", "info");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Administrator Dedicated Header Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Administrator Portal
              </span>
              <span className="text-xs text-slate-400">Authenticated as: <strong className="text-white">{currentUser?.name}</strong></span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              TripCraft Governance & Control Dashboard
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Real-time transaction monitors, traveler ledger management, partner hotel verifications, and financial ledger governance.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleAdminSignOut}
              className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <LogOut className="w-4 h-4" />
              <span>Admin Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl text-xs overflow-x-auto scrollbar-none gap-1">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === "bookings" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Bookings Ledger ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === "users" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Traveler Directory ({DEMO_USERS.length})
          </button>
          <button
            onClick={() => setActiveTab("hotels")}
            className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === "hotels" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Verified Hotels ({HOTELS.length})
          </button>
          <button
            onClick={() => setActiveTab("guides")}
            className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === "guides" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Certified Guides ({LOCAL_GUIDES.length})
          </button>
        </div>

        {/* Real-World KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Gross Platform Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {formatCurrency(totalRevenue, currency)}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center space-x-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% this month</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Confirmed Reservations</span>
              <Calendar className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {bookings.length} Bookings
            </div>
            <div className="text-[11px] text-teal-400">
              <span>All 100% verified</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Active Verified Properties</span>
              <Building className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {HOTELS.length} Hotels
            </div>
            <div className="text-[11px] text-amber-400">
              <span>Enforcing 3 guests/room cap</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Government Certified Guides</span>
              <Award className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {LOCAL_GUIDES.length} Guides
            </div>
            <div className="text-[11px] text-sky-400">
              <span>Across 8 Indian States</span>
            </div>
          </div>
        </div>

        {/* TAB 1: BOOKINGS LEDGER */}
        {activeTab === "bookings" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Transaction & Reservation Ledger</h3>
                <p className="text-xs text-slate-400">Inspect real passenger records, room allocations, and dispatch status</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Booking Ref</th>
                    <th className="py-3 px-4">Experience / Item</th>
                    <th className="py-3 px-4">Primary Traveler</th>
                    <th className="py-3 px-4">Travel Date</th>
                    <th className="py-3 px-4">Party</th>
                    <th className="py-3 px-4">Total Paid</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{b.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-white max-w-xs truncate">{b.itemTitle}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200">{b.contactInfo?.fullName}</div>
                        <div className="text-[10px] text-slate-400">{b.contactInfo?.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{b.travelDate}</td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {b.adults}A {b.children > 0 && `+ ${b.children}C`}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400">
                        {formatCurrency(b.fareSummary?.grandTotal || 0, currency)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.status === "Confirmed"
                            ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                            : b.status === "Completed"
                            ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {b.status !== "Completed" && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, "Completed")}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-300 rounded-lg text-[10px] font-bold transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}
                        {b.status !== "Cancelled" && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, "Cancelled")}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 rounded-lg text-[10px] font-bold transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TRAVELER DIRECTORY */}
        {activeTab === "users" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white">Registered Travelers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEMO_USERS.map((usr) => (
                <div key={usr.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
                  <img src={usr.avatar} alt={usr.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{usr.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{usr.email}</div>
                    <div className="text-[10px] text-amber-400 font-semibold mt-1">
                      Tier: {usr.loyaltyTier} ({usr.loyaltyPoints} points)
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">Role: {usr.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VERIFIED HOTELS */}
        {activeTab === "hotels" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Verified Hotels Inventory Control</h3>
                <p className="text-xs text-slate-400">All 38 properties enforcing transparent room occupancy rules</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HOTELS.map((hotel) => (
                <div key={hotel.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex space-x-3 items-center">
                  <img src={hotel.image} alt={hotel.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{hotel.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{hotel.location}</div>
                    <div className="text-[10px] text-teal-400 font-semibold mt-0.5">
                      {formatCurrency(hotel.basePricePerNight, currency)} / night • Max {hotel.maxOccupancyPerRoom || 3} guests
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFIED GUIDES */}
        {activeTab === "guides" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white">Government-Certified Local Guides Directory</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LOCAL_GUIDES.map((g) => (
                <div key={g.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex space-x-3 items-center">
                  <img src={g.avatar} alt={g.name} className="w-14 h-14 rounded-full object-cover shrink-0 border border-teal-500" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{g.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{g.city} • {g.specialization}</div>
                    <div className="text-[10px] text-teal-400 font-semibold mt-0.5">
                      {formatCurrency(g.perDayRate, currency)} / day • {g.experienceYears} yrs exp
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
