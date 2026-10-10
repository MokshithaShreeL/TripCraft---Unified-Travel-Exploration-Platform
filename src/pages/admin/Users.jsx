import React, { useState } from 'react';
import { Users as UsersIcon, Search, Filter, ShieldCheck, UserPlus, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEMO_USERS } from '../../data/mockData';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../../utils/storage';

import AdminNav from '../../components/admin/AdminNav';
import UserTable from '../../components/admin/UserTable';

export default function Users() {
  const { addToast } = useApp();

  const [users, setUsers] = useState(() => {
    return getFromStorage('tripcraft_admin_users', [
      { id: 'usr_priya_01', name: 'Priya Sharma', email: 'priya@example.com', role: 'user', language: 'en', is_active: true, phone: '9876543210' },
      { id: 'usr_arjun_02', name: 'Arjun Kumar', email: 'arjun@example.com', role: 'user', language: 'ta', is_active: true, phone: '9876543211' },
      { id: 'usr_meera_03', name: 'Meera Rajan', email: 'meera@example.com', role: 'user', language: 'hi', is_active: true, phone: '9876543212' },
      { id: 'usr_rahul_04', name: 'Rahul Singh', email: 'rahul@example.com', role: 'user', language: 'en', is_active: true, phone: '9876543213' },
      { id: 'usr_sneha_05', name: 'Sneha Menon', email: 'sneha@example.com', role: 'user', language: 'ta', is_active: true, phone: '9876543214' },
      { id: 'usr_admin_00', name: 'Admin User', email: 'admin@tripcraft.in', role: 'admin', language: 'en', is_active: true, phone: '9876543200' }
    ]);
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole =
      roleFilter === 'All' ||
      (roleFilter === 'admin' && u.role === 'admin') ||
      (roleFilter === 'user' && u.role === 'user') ||
      (roleFilter === 'active' && u.is_active !== false) ||
      (roleFilter === 'disabled' && u.is_active === false);

    return matchSearch && matchRole;
  });

  const handleToggleStatus = (userId) => {
    const updated = users.map((u) =>
      u.id === userId ? { ...u, is_active: !u.is_active } : u
    );
    setUsers(updated);
    saveToStorage('tripcraft_admin_users', updated);
    const target = updated.find((u) => u.id === userId);
    addToast(`User ${target.name} ${target.is_active ? 'activated' : 'deactivated'} successfully`, 'success');
  };

  const activeCount = users.filter((u) => u.is_active !== false).length;
  const adminCount = users.filter((u) => u.role === 'admin').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <AdminNav />

        {/* Directory Controls & Summary Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
                <UsersIcon className="w-5 h-5 text-amber-400" />
                <span>Traveler & Administrator Directory</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Manage registered user accounts, toggle permissions, and audit authentication activity.
              </p>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex items-center space-x-3 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                Total: <strong className="text-white">{users.length}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-teal-950/60 border border-teal-800 text-teal-300">
                Active: <strong className="text-white">{activeCount}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-300">
                Admins: <strong className="text-white">{adminCount}</strong>
              </span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-slate-800/80">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by traveler name or email address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="w-full sm:w-56">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="All">All Roles & States</option>
                <option value="user">Travelers Only</option>
                <option value="admin">Administrators Only</option>
                <option value="active">Active Only</option>
                <option value="disabled">Disabled Accounts</option>
              </select>
            </div>
          </div>

          {/* User Table Component */}
          <UserTable users={filteredUsers} onToggleStatus={handleToggleStatus} />
        </div>

      </div>
    </div>
  );
}
