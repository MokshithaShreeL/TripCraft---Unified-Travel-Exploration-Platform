import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Plus, Trash2, CheckCircle2, Clock, MapPin, Download, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../utils/pricing";

export default function Itinerary() {
  const { currency, addToast, t } = useApp();

  const [activeDay, setActiveDay] = useState(1);
  const [activities, setActivities] = useState([
    {
      id: "act_1",
      day: 1,
      time: "06:30 AM",
      title: "Kolukkumalai Sunrise 4x4 Safari",
      location: "Kolukkumalai Peak",
      cost: 1500,
      completed: true,
      notes: "Carry warm fleece jacket; road is extremely rugged."
    },
    {
      id: "act_2",
      day: 1,
      time: "10:30 AM",
      title: "Traditional South Indian Breakfast at Planters Mess",
      location: "Suryanelli",
      cost: 350,
      completed: true,
      notes: "Fresh Appam with vegetable stew & organic estate tea."
    },
    {
      id: "act_3",
      day: 2,
      time: "08:00 AM",
      title: "Eravikulam National Park Safari",
      location: "Rajamala Entry",
      cost: 400,
      completed: false,
      notes: "Pre-booked online permit. Nilgiri Tahr sightings frequent in morning."
    },
    {
      id: "act_4",
      day: 2,
      time: "02:00 PM",
      title: "Tea Museum & Processing Masterclass",
      location: "Nullatanni Estate",
      cost: 250,
      completed: false,
      notes: "Interactive tea tasting session included."
    }
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("12:00 PM");
  const [newLocation, setNewLocation] = useState("");
  const [newCost, setNewCost] = useState(500);

  const currentDayActivities = activities.filter((a) => a.day === activeDay);
  const dayCost = currentDayActivities.reduce((acc, curr) => acc + (curr.cost || 0), 0);

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAct = {
      id: `act_${Date.now()}`,
      day: activeDay,
      time: newTime,
      title: newTitle,
      location: newLocation || "Munnar, Kerala",
      cost: Number(newCost),
      completed: false,
      notes: ""
    };

    setActivities((prev) => [...prev, newAct]);
    setNewTitle("");
    setNewLocation("");
    addToast("Activity appended to itinerary!", "success");
  };

  const toggleCompleted = (id) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const removeActivity = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
    addToast("Activity removed", "info");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
              {t("itinerary.title") || "Smart Day Planner"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
              {t("nav.itinerary") || "Interactive Itinerary Engine"}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              {t("itinerary.subtitle") || "Organize daily activities, time slots, estimated expenses, and transit notes for your dream vacation."}
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <Link
              to="/smart-planner"
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Smart AI Planner</span>
            </Link>
            <button
              onClick={() => addToast("Itinerary exported to printable PDF voucher.", "success")}
              className="px-4 py-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-teal-400 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Voucher</span>
            </button>
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          {[1, 2, 3, 4].map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeDay === d
                  ? "bg-teal-600 text-white shadow-lg"
                  : "bg-navy-950 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Day {d}
            </button>
          ))}
          <div className="text-xs text-slate-400 pl-4 ml-auto">
            Day {activeDay} Budget: <strong className="text-white">{formatCurrency(dayCost, currency)}</strong>
          </div>
        </div>

        {/* Activity List & Add Activity Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Activity Timeline */}
          <div className="lg:col-span-2 space-y-4">
            {currentDayActivities.length === 0 ? (
              <div className="bg-navy-950 border border-slate-800 rounded-2xl p-10 text-center text-xs text-slate-400">
                No activities planned for Day {activeDay} yet. Use the form on the right to add your schedule!
              </div>
            ) : (
              currentDayActivities.map((act) => (
                <div
                  key={act.id}
                  className={`bg-navy-950 border rounded-2xl p-4 transition-all flex items-start justify-between gap-4 ${
                    act.completed
                      ? "border-teal-500/30 bg-teal-950/20"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleCompleted(act.id)}
                      className="mt-0.5 text-teal-400 hover:text-teal-300"
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          act.completed ? "fill-teal-500 text-slate-950" : "text-slate-600"
                        }`}
                      />
                    </button>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-mono text-amber-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{act.time}</span>
                        </span>
                        <span className="text-[11px] text-slate-500">•</span>
                        <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{act.location}</span>
                        </span>
                      </div>
                      <h4
                        className={`text-sm font-bold mt-1 ${
                          act.completed ? "line-through text-slate-400" : "text-white"
                        }`}
                      >
                        {act.title}
                      </h4>
                      {act.notes && (
                        <p className="text-xs text-slate-400 mt-1 italic">
                          "{act.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="text-xs font-bold text-teal-400">
                      {formatCurrency(act.cost, currency)}
                    </span>
                    <button
                      onClick={() => removeActivity(act.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Col: Add Activity Form */}
          <div className="bg-navy-950 border border-slate-800 rounded-3xl p-6 space-y-4 h-fit">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Plus className="w-4 h-4 text-teal-400" />
              <span>Add Day {activeDay} Activity</span>
            </h3>

            <form onSubmit={handleAddActivity} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Activity Name</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Mattupetty Dam Speedboating"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Est. Cost (INR)</label>
                  <input
                    type="number"
                    value={newCost}
                    onChange={(e) => setNewCost(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location / Landmark</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Mattupetty Reservoir"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold transition-all shadow-md mt-2"
              >
                Append to Schedule
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
