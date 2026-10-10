import React, { useState } from "react";
import {
  Layers,
  Star,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { PACKAGES } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { useBooking } from "../context/BookingContext";
import { formatCurrency } from "../utils/pricing";

export default function Packages() {
  const { currency, t } = useApp();
  const { openBooking } = useBooking();

  const [selectedTheme, setSelectedTheme] = useState("All");

  const themes = ["All", "Nature & Hill Station", "Heritage & Culture", "Adventure & High Altitude", "Island & Marine"];

  const filteredPackages = PACKAGES.filter(
    (p) => selectedTheme === "All" || p.theme === selectedTheme
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
            {t("packages.title") || "All-Inclusive Itineraries"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
            {t("nav.packages") || "Curated Tour Packages"}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            {t("packages.subtitle") || "Complete hassle-free vacation packages with private transfers, 4-star boutique resorts, verified licensed guides, and group tier discounts."}
          </p>
        </div>

        {/* Theme Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedTheme === theme
                  ? "bg-teal-600 text-white font-bold"
                  : "bg-navy-950 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {theme === "All" ? (t("common.all") || "All") : theme}
            </button>
          ))}
        </div>

        {/* Package Detailed Cards */}
        <div className="space-y-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-navy-950 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Package Media & Highlights */}
              <div className="lg:col-span-5 relative flex flex-col justify-between p-6">
                <div className="absolute inset-0 z-0">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover filter brightness-[0.35]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent"></div>
                </div>

                <div className="relative z-10 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40">
                      {pkg.theme}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {pkg.title}
                  </h3>

                  <div className="flex items-center space-x-1 text-xs text-amber-400 font-bold pt-1">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{pkg.rating} ({pkg.reviewsCount} verified traveler reviews)</span>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="relative z-10 pt-6 mt-6 border-t border-slate-800/80 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-teal-400 font-bold uppercase">
                      Group of 4+: 10% instant discount
                    </div>
                    <div className="text-2xl font-black text-white">
                      {formatCurrency(pkg.baseAdultPrice, currency)}
                      <span className="text-xs font-normal text-slate-400 ml-1">/ {t("common.adults") || "adult"}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openBooking(pkg, "package")}
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg"
                  >
                    {t("common.bookNow") || "Book Experience"}
                  </button>
                </div>
              </div>

              {/* Day-by-Day Timeline & Inclusions/Exclusions */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-slate-900/60 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-teal-400" />
                    <span>Day-by-Day Itinerary Schedule</span>
                  </h4>

                  <div className="space-y-4">
                    {pkg.itinerary.map((day) => (
                      <div key={day.day} className="flex items-start space-x-3 text-xs">
                        <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
                          {day.day}
                        </div>
                        <div>
                          <h5 className="font-bold text-white">{day.title}</h5>
                          <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                            {day.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-teal-400 font-bold text-[11px] uppercase tracking-wider block mb-2">
                      Inclusions
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span className="truncate">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider block mb-2">
                      Exclusions
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-400">
                      {pkg.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-center space-x-1.5">
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="truncate">{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
