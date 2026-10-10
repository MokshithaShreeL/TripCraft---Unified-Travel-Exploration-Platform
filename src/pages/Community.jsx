import React, { useState } from "react";
import { Users, MapPin, Calendar, ShieldCheck, MessageSquare, Plus, ArrowRight, Heart } from "lucide-react";
import { COMMUNITY_BUDDIES } from "../data/mockData";
import BuddyMatchModal from "../components/solo/BuddyMatchModal";
import { useApp } from "../context/AppContext";

export default function Community() {
  const { addToast, t } = useApp();
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [selectedDest, setSelectedDest] = useState("All");

  const destinations = ["All", "Munnar", "Hampi", "Leh Ladakh"];

  const filteredBuddies = COMMUNITY_BUDDIES.filter(
    (b) => selectedDest === "All" || b.destination === selectedDest
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
            {t("community.title") || "Traveler Lounge & Meetup Engine"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
            {t("nav.community") || "Community & Buddy Matcher"}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            {t("community.subtitle") || "Connect with verified solo adventurers planning journeys at the same time. Split outstation cabs, share mountain treks, and explore together safely."}
          </p>
        </div>

        {/* Destination Filters */}
        <div className="flex flex-wrap gap-2">
          {destinations.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDest(d)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedDest === d
                  ? "bg-teal-600 text-white font-bold"
                  : "bg-navy-950 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {d === "All" ? (t("common.all") || "All") : d}
            </button>
          ))}
        </div>

        {/* Buddy Match Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBuddies.map((buddy) => (
            <div
              key={buddy.id}
              className="bg-navy-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={buddy.avatar}
                      alt={buddy.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-500/50"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                        <span>{buddy.name}</span>
                        {buddy.verifiedId && (
                          <ShieldCheck className="w-4 h-4 text-teal-400" title="Govt ID Verified" />
                        )}
                      </h4>
                      <div className="text-[11px] text-teal-400 font-medium">
                        {buddy.travelStyle}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    {buddy.destination}
                  </span>
                </div>

                <div className="mt-3 flex items-center space-x-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{buddy.plannedDates}</span>
                </div>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  "{buddy.bio}"
                </p>

                {/* Looking for tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {buddy.lookingFor.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-slate-900 border border-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setSelectedBuddy(buddy)}
                  className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Propose Meetup / Split Cab</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal if open */}
        {selectedBuddy && (
          <BuddyMatchModal
            buddy={selectedBuddy}
            onClose={() => setSelectedBuddy(null)}
          />
        )}
      </div>
    </div>
  );
}
