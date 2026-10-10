import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MapPin,
  TrendingUp,
  LogOut,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, addToast } = useApp();

  const handleSignOut = () => {
    logout();
    addToast('Logged out of Administrator Portal', 'info');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Traveler Directory', path: '/admin/users', icon: Users },
    { label: 'Bookings Ledger', path: '/admin/bookings', icon: Calendar },
    { label: 'Destinations & Safety', path: '/admin/destinations', icon: MapPin },
    { label: 'Financial Analytics', path: '/admin/analytics', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Administrator Portal</span>
            </span>
            <span className="text-xs text-slate-400">
              Authenticated as: <strong className="text-white">{currentUser?.name || 'Administrator'}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            TripCraft Governance & Control Center
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Real-time transaction monitors, traveler ledger management, destination safety ratings, and platform telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer shadow-md"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl text-xs overflow-x-auto scrollbar-none gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/admin/dashboard' && location.pathname === '/admin');
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
