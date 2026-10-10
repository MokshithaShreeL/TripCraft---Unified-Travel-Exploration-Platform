import React, { useState } from "react";
import { X, Send, Calendar, MapPin, Users, CheckCircle2 } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function BuddyMatchModal({ buddy, onClose }) {
  const { addToast } = useApp();
  const [meetupType, setMeetupType] = useState("Shared Cab / Transfer");
  const [date, setDate] = useState("2026-10-14");
  const [message, setMessage] = useState(
    "Hi, I'm visiting around the same time. Would love to split transport and hike together!"
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!buddy) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    addToast(`Meetup invitation transmitted to ${buddy.name}!`, "success");
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden text-slate-200">
        <div className="bg-navy-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={buddy.avatar}
              alt={buddy.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500"
            />
            <div>
              <h3 className="text-sm font-bold text-white">
                Propose Travel Meetup with {buddy.name}
              </h3>
              <p className="text-[11px] text-teal-400">
                Destination: {buddy.destination} ({buddy.plannedDates})
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-white">Proposal Dispatched!</h4>
            <p className="text-xs text-slate-400">
              {buddy.name} has been notified. You can chat once they accept your invite.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Meetup & Cost-Sharing Type
              </label>
              <select
                value={meetupType}
                onChange={(e) => setMeetupType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              >
                <option value="Shared Cab / Transfer">Shared Outstation Cab (Split 50%)</option>
                <option value="Trekking Partner">Meesapulimala / Peak Trekking Partner</option>
                <option value="Sightseeing & Cafes">Group Sightseeing & Cafe Hop</option>
                <option value="Photography Excursion">Early Sunrise Photography Excursion</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Proposed Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Introductory Note
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs text-white"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Proposal</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
