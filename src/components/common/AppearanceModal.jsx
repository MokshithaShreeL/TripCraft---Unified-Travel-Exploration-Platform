import React from "react";
import {
  Palette,
  Sun,
  Moon,
  Laptop,
  Check,
  X,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AppearanceModal() {
  const {
    appearanceModalOpen,
    setAppearanceModalOpen,
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    addToast,
    t
  } = useApp();

  if (!appearanceModalOpen) return null;

  const themes = [
    {
      id: "dark",
      name: t("appearance.dark") || "Dark",
      desc: "Deep night contrast for comfortable evening browsing",
      icon: Moon
    },
    {
      id: "light",
      name: t("appearance.light") || "Light",
      desc: "Bright, clean daylight clarity for sunlit reading",
      icon: Sun
    },
    {
      id: "system",
      name: t("appearance.system") || "System Default",
      desc: "Automatically syncs with your operating system preference",
      icon: Laptop
    }
  ];

  const accents = [
    { id: "teal", name: "Emerald Teal", colorHex: "#14b8a6", bgClass: "bg-teal-500" },
    { id: "blue", name: "Ocean Blue", colorHex: "#3b82f6", bgClass: "bg-blue-500" },
    { id: "purple", name: "Royal Purple", colorHex: "#a855f7", bgClass: "bg-purple-500" },
    { id: "orange", name: "Sunset Orange", colorHex: "#f97316", bgClass: "bg-orange-500" },
    { id: "rose", name: "Ruby Rose", colorHex: "#f43f5e", bgClass: "bg-rose-500" },
    { id: "green", name: "Forest Green", colorHex: "#22c55e", bgClass: "bg-emerald-500" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div
        className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-slate-100 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {t("appearance.title") || "Appearance & Theme Settings"}
              </h3>
              <p className="text-xs text-slate-400">
                {t("appearance.subtitle") || "Customize how TripCraft looks on your device."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setAppearanceModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Mode Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            {t("appearance.theme") || "Color Theme"}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themes.map((th) => {
              const Icon = th.icon;
              const isSelected = theme === th.id;
              return (
                <div
                  key={th.id}
                  onClick={() => {
                    setTheme(th.id);
                    addToast(`Theme set to ${th.name}`, "info");
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? "bg-slate-950 border-teal-500 ring-2 ring-teal-500/50 text-white"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-5 h-5 ${isSelected ? "text-teal-400" : "text-slate-400"}`} />
                    {isSelected && <Check className="w-4 h-4 text-teal-400" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{th.name}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{th.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accent Color Palette Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            {t("appearance.accentColor") || "Accent Color (6 Colors)"}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {accents.map((acc) => {
              const isSelected = accentColor === acc.id;
              return (
                <div
                  key={acc.id}
                  onClick={() => {
                    setAccentColor(acc.id);
                    addToast(`Accent color set to ${acc.name}`, "info");
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center space-x-3 ${
                    isSelected
                      ? "bg-slate-950 border-slate-600 ring-2 ring-offset-2 ring-offset-slate-900 ring-teal-500 text-white"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full ${acc.bgClass} flex items-center justify-center shadow shrink-0`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-xs font-medium truncate">{acc.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Interactive Preview Card */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Live Accent Preview
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Munnar Tea Sanctuary Tour</div>
              <div className="text-[11px] text-slate-400">Previewing your personalized theme elements</div>
            </div>
            <button
              type="button"
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow transition-all cursor-pointer"
              style={{ backgroundColor: accents.find((a) => a.id === accentColor)?.colorHex }}
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={() => setAppearanceModalOpen(false)}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
