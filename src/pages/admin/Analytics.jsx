import React from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Users,
  Compass,
  ShieldCheck,
  Bot,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/pricing';

import AdminNav from '../../components/admin/AdminNav';
import RevenueChart from '../../components/admin/RevenueChart';

export default function Analytics() {
  const { currency } = useApp();

  const categoryShare = [
    { name: 'Curated Holiday Packages', percentage: 54, color: 'bg-teal-500' },
    { name: 'Verified Partner Hotels', percentage: 28, color: 'bg-blue-500' },
    { name: 'Transit & Vehicle Rentals', percentage: 14, color: 'bg-amber-500' },
    { name: 'Certified Local Guides', percentage: 4, color: 'bg-rose-500' }
  ];

  const topRegions = [
    { region: 'Munnar & Western Ghats', volume: '₹ 8,45,000', bookings: 24, growth: '+28%' },
    { region: 'Jaipur & Rajasthan Heritage', volume: '₹ 6,10,000', bookings: 19, growth: '+22%' },
    { region: 'South Goa Coastal Stays', volume: '₹ 5,80,000', bookings: 18, growth: '+15%' },
    { region: 'Leh Ladakh High Passes', volume: '₹ 4,95,000', bookings: 12, growth: '+35%' },
    { region: 'Andaman & Nicobar Islands', volume: '₹ 4,12,000', bookings: 9, growth: '+19%' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <AdminNav />

        {/* Analytics Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>Financial Telemetry & Platform Performance</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Multi-dimensional revenue insights, traveler conversion funnels, and AI assistant utilization logs.
            </p>
          </div>

          {/* KPI High Level Metric Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-[11px] uppercase font-bold text-slate-400">Average Order Value</span>
              <div className="text-2xl font-black text-white">{formatCurrency(28750, currency)}</div>
              <div className="text-[11px] text-teal-400 flex items-center space-x-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+12.6% YoY growth</span>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-[11px] uppercase font-bold text-slate-400">Solo Safety Compliance</span>
              <div className="text-2xl font-black text-emerald-400">98.4%</div>
              <div className="text-[11px] text-slate-400">55 properties audited</div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-[11px] uppercase font-bold text-slate-400">Traveler Retention</span>
              <div className="text-2xl font-black text-white">68.2%</div>
              <div className="text-[11px] text-teal-400">Repeat booking rate</div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-[11px] uppercase font-bold text-slate-400">Claude AI Chatbot Traffic</span>
              <div className="text-2xl font-black text-cyan-400">1,480 msgs</div>
              <div className="text-[11px] text-slate-400">English, Tamil & Hindi</div>
            </div>
          </div>

          {/* Revenue Chart Section */}
          <RevenueChart />

          {/* Category Breakdown & Top Regions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            
            {/* Category Share */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <PieChart className="w-4 h-4 text-amber-400" />
                <span>Revenue Share by Product Category</span>
              </h3>

              <div className="space-y-3 pt-2">
                {categoryShare.map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">{cat.name}</span>
                      <span className="text-white font-bold">{cat.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                        style={{ width: `${cat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Destinations Leaderboard */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Top Regional Performance</span>
              </h3>

              <div className="divide-y divide-slate-800/80 text-xs">
                {topRegions.map((r, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{r.region}</div>
                      <div className="text-[11px] text-slate-400">{r.bookings} reservations recorded</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-teal-400">{r.volume}</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">{r.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
