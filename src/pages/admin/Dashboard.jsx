import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Database,
  Bot,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getFromStorage, STORAGE_KEYS } from '../../utils/storage';
import { formatCurrency } from '../../utils/pricing';
import { DESTINATIONS, DEMO_USERS, HOTELS, LOCAL_GUIDES } from '../../data/mockData';

import AdminNav from '../../components/admin/AdminNav';
import StatsCard from '../../components/admin/StatsCard';
import RevenueChart from '../../components/admin/RevenueChart';
import BookingTable from '../../components/admin/BookingTable';

export default function Dashboard() {
  const { currency } = useApp();

  const [bookings] = useState(() => {
    return getFromStorage(STORAGE_KEYS.BOOKINGS, [
      {
        id: 'TC-BK-2026-884210',
        createdAt: '2026-09-24T10:15:00.000Z',
        itemTitle: 'Munnar Misty Highland Trails & Tea Sanctuary',
        destination: 'Munnar, Kerala',
        travelDate: '2026-10-18',
        status: 'Confirmed',
        adults: 2,
        children: 1,
        fareSummary: { grandTotal: 34157 }
      },
      {
        id: 'TC-BK-2026-551902',
        createdAt: '2026-09-23T14:20:00.000Z',
        itemTitle: 'Jaipur Royal Forts & Culinary Splendor',
        destination: 'Jaipur, Rajasthan',
        travelDate: '2026-10-25',
        status: 'Confirmed',
        adults: 2,
        children: 2,
        fareSummary: { grandTotal: 32396 }
      },
      {
        id: 'TC-BK-2026-102941',
        createdAt: '2026-09-21T09:00:00.000Z',
        itemTitle: 'Blanket Luxury Rainforest Resort & Spa',
        destination: 'Munnar, Kerala',
        travelDate: '2026-11-04',
        status: 'Completed',
        adults: 2,
        children: 0,
        fareSummary: { grandTotal: 19936 }
      }
    ]);
  });

  const totalRevenue = bookings.reduce(
    (acc, curr) => acc + (curr.fareSummary?.grandTotal || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <AdminNav />

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Platform Revenue"
            value={formatCurrency(totalRevenue, currency)}
            change="+18.4% vs last period"
            icon={DollarSign}
            color="teal"
          />
          <StatsCard
            title="Confirmed Bookings"
            value={`${bookings.length} Orders`}
            change="100% Escrow Protected"
            icon={Calendar}
            color="blue"
          />
          <StatsCard
            title="Registered Travelers"
            value={`${DEMO_USERS.length} Active`}
            change="5 Pre-Seeded + Admin"
            icon={Users}
            color="amber"
          />
          <StatsCard
            title="Live Destinations"
            value={`${DESTINATIONS.length} Regions`}
            change="All With Safety Scores"
            icon={MapPin}
            color="rose"
          />
        </div>

        {/* Analytics & Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column: Revenue Chart & Recent Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <RevenueChart />

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Recent Traveler Reservations</h3>
                  <p className="text-xs text-slate-400">Latest transactions registered in the MySQL ledger</p>
                </div>
                <Link
                  to="/admin/bookings"
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1"
                >
                  <span>View All Bookings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <BookingTable bookings={bookings.slice(0, 5)} />
            </div>
          </div>

          {/* Sidebar: System Telemetry & Quick Management */}
          <div className="space-y-6">
            
            {/* System Status Pill Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-teal-400">
                <Activity className="w-4 h-4" />
                <span>Backend Architecture Status</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">MySQL 96 Database</div>
                      <div className="text-[10px] text-slate-400">localhost:3306 • tripcraft_db</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                    CONNECTED
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <Bot className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-bold text-white">Claude AI Sonnet API</div>
                      <div className="text-[10px] text-slate-400">Multilingual Chat & Itinerary</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-bold">
                    ONLINE
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-bold text-white">Solo Safety SOS Gateway</div>
                      <div className="text-[10px] text-slate-400">1091 / 112 Dispatch Ready</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Management Shortcuts */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Direct Management</h4>
              <div className="space-y-2">
                <Link
                  to="/admin/users"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold text-slate-200 transition-all group"
                >
                  <span className="group-hover:text-amber-400 transition-colors">Manage Registered Users</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                </Link>
                <Link
                  to="/admin/bookings"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold text-slate-200 transition-all group"
                >
                  <span className="group-hover:text-amber-400 transition-colors">Manage Bookings & Cancellations</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                </Link>
                <Link
                  to="/admin/destinations"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold text-slate-200 transition-all group"
                >
                  <span className="group-hover:text-amber-400 transition-colors">Audit Destination Safety Scores</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                </Link>
                <Link
                  to="/admin/analytics"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold text-slate-200 transition-all group"
                >
                  <span className="group-hover:text-amber-400 transition-colors">View Revenue & Growth Analytics</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
