import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, ShieldCheck, Star, ExternalLink, Edit2, CheckCircle2 } from 'lucide-react';
import { DESTINATIONS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/pricing';

import AdminNav from '../../components/admin/AdminNav';

export default function Destinations() {
  const { currency, addToast } = useApp();

  const [destinations, setDestinations] = useState(() => {
    return DESTINATIONS.map((d) => ({
      ...d,
      safetyScore: d.safetyScore || 92,
      isActive: true
    }));
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [safetyFilter, setSafetyFilter] = useState('All');
  const [editingDest, setEditingDest] = useState(null);
  const [tempScore, setTempScore] = useState(90);

  const filtered = destinations.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase());

    const matchSafety =
      safetyFilter === 'All' ||
      (safetyFilter === '90plus' && d.safetyScore >= 90) ||
      (safetyFilter === 'under90' && d.safetyScore < 90);

    return matchSearch && matchSafety;
  });

  const handleUpdateScore = (destId, newScore) => {
    const scoreNum = Math.min(100, Math.max(50, Number(newScore)));
    setDestinations((prev) =>
      prev.map((d) => (d.id === destId ? { ...d, safetyScore: scoreNum } : d))
    );
    setEditingDest(null);
    addToast(`Solo Safety Score for ${destId} updated to ${scoreNum}/100`, 'success');
  };

  const handleToggleActive = (destId) => {
    setDestinations((prev) =>
      prev.map((d) => (d.id === destId ? { ...d, isActive: !d.isActive } : d))
    );
    addToast('Destination active state toggled', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <AdminNav />

        {/* Header Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Destination Registry & Safety Audit</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Oversee 24 active destinations, audit solo traveler safety ratings, and inspect hotel capacity.
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                Total: <strong className="text-white">{destinations.length}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-teal-950/60 border border-teal-800 text-teal-300">
                Avg Safety: <strong className="text-white">92.4 / 100</strong>
              </span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-slate-800/80">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search destination name or Indian state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="w-full sm:w-56">
              <select
                value={safetyFilter}
                onChange={(e) => setSafetyFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="All">All Safety Scores</option>
                <option value="90plus">High Safety Tier (90+)</option>
                <option value="under90">Moderate Tier (&lt; 90)</option>
              </select>
            </div>
          </div>

          {/* Table of Destinations */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Solo Safety Score</th>
                  <th className="py-3 px-4">Base Fare</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img
                        src={d.image}
                        alt={d.name}
                        className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-800"
                      />
                      <div>
                        <div className="font-bold text-white">{d.name}</div>
                        <div className="text-[10px] text-slate-400 capitalize">{d.category || 'Highlands'}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-medium">{d.state}</td>
                    <td className="py-3 px-4">
                      {editingDest === d.id ? (
                        <div className="flex items-center space-x-1.5">
                          <input
                            type="number"
                            min="50"
                            max="100"
                            value={tempScore}
                            onChange={(e) => setTempScore(e.target.value)}
                            className="w-16 bg-slate-950 border border-amber-500 rounded px-2 py-0.5 text-xs text-white font-bold"
                          />
                          <button
                            onClick={() => handleUpdateScore(d.id, tempScore)}
                            className="px-2 py-0.5 bg-amber-500 text-slate-950 rounded text-[10px] font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              d.safetyScore >= 90
                                ? 'bg-teal-950 text-teal-300 border border-teal-700'
                                : 'bg-amber-950 text-amber-300 border border-amber-700'
                            }`}
                          >
                            {d.safetyScore} / 100
                          </span>
                          <button
                            onClick={() => {
                              setEditingDest(d.id);
                              setTempScore(d.safetyScore);
                            }}
                            className="text-slate-500 hover:text-amber-400"
                            title="Edit Safety Score"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      {formatCurrency(d.startingPrice || 12000, currency)}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleActive(d.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                          d.isActive
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {d.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/destinations/${d.id}`}
                        target="_blank"
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-semibold inline-flex items-center space-x-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View Page</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
