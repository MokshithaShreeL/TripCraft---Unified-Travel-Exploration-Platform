import React, { useState, useMemo } from "react";
import {
  Users,
  Star,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Languages,
  Award,
  Search,
  Filter,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  X,
  PhoneCall
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useBooking } from "../context/BookingContext";
import { searchGuides } from "../utils/searchUtils";
import { formatCurrency } from "../utils/pricing";

export default function LocalGuides() {
  const { currency, t } = useApp();
  const { openBooking } = useBooking();

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [activeGuideModal, setActiveGuideModal] = useState(null);

  const citiesList = ["All", "Munnar", "Jaipur", "Goa", "Leh Ladakh", "Port Blair & Havelock", "Hampi", "Varanasi", "Rishikesh"];
  const languagesList = ["All", "English", "Hindi", "Tamil", "French", "German", "Portuguese", "Tibetan", "Kannada", "Malayalam"];
  const specializationsList = [
    "All",
    "Heritage & Royal Architecture",
    "Tea Trails & Flora-Fauna",
    "High-Altitude Passes & Monasteries",
    "Portuguese Heritage & Spice Estates",
    "Ancient Ghats & Vedic Philosophy",
    "Marine Coral Ecology & Scuba",
    "Vijayanagara Dynasty & Ruins",
    "Himalayan Yoga & Ganga Trails",
    "Pangong & Nubra Astro-Tourism",
    "Coastal Food & Culinary Walking Tours"
  ];

  const filteredGuides = useMemo(() => {
    return searchGuides({
      query: search,
      city: selectedCity,
      language: selectedLanguage,
      specialization: selectedSpecialization,
      sortBy: sortBy
    });
  }, [search, selectedCity, selectedLanguage, selectedSpecialization, sortBy]);

  const handleHireGuide = (guide) => {
    // Adapt guide object to booking item format
    const bookingItem = {
      id: guide.id,
      title: `${guide.name} - Certified Local Guide (${guide.city})`,
      name: guide.name,
      baseAdultPrice: guide.perDayRate,
      basePrice: guide.perDayRate,
      type: "guide",
      destinationId: guide.destinationId,
      image: guide.avatar,
      duration: "Per Day Service",
      carrier: guide.badge,
      inclusions: [
        "Full Day Personalized Guided Tour (8 Hours)",
        "Certified Historical & Cultural Storytelling",
        "Assistance with Monument Fast-Track Access",
        "Local Insider Dining Recommendations"
      ],
      exclusions: ["Monument Entry Fees", "Personal Transportation / Cab", "Guide Meals & Personal Expenses"]
    };
    openBooking(bookingItem, "package");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center space-x-1.5 text-teal-400 text-xs font-bold uppercase tracking-wider bg-teal-950/80 px-3 py-1 rounded-full border border-teal-500/30">
              <Award className="w-4 h-4 text-teal-400" />
              <span>{t("guides.certifiedBadge") || "Government Certified & Verified Experts"}</span>
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {t("guides.title") || "Certified Local Heritage & Trek Guides"}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t("guides.subtitle") || "Explore India with passionate government-certified heritage storytellers, high-altitude trek leads, dark-sky astronomy guides, and local culinary experts."}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs">
              <div className="flex items-center space-x-1.5 text-teal-300">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>{t("guides.policeVerified") || "100% Police Verified & Ministry Licensed"}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-teal-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Transparent Per-Day Tariffs</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-1 w-full md:w-56 shadow-lg">
            <div className="text-2xl font-black text-teal-400">12 Certified</div>
            <div className="text-xs text-slate-400 font-medium">Guides across 8 States</div>
            <div className="text-[11px] text-amber-400 font-semibold pt-1">
              Avg Rating 4.93 / 5.0
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("guides.searchPlaceholder") || "Search guide name, destination, or language..."}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* City Filter */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
              >
                {citiesList.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Locations" : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
              >
                {languagesList.map((l) => (
                  <option key={l} value={l}>
                    {l === "All" ? "All Languages" : l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Specialization:</span>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                {specializationsList.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-slate-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="rate_asc">Tariff: Low to High</option>
                <option value="rate_desc">Tariff: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/20 group"
            >
              {/* Profile Top Row */}
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="relative shrink-0">
                    <img
                      src={guide.avatar}
                      alt={guide.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/40 group-hover:border-teal-400 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-teal-500 text-slate-950 p-1 rounded-full shadow">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white truncate group-hover:text-teal-400 transition-colors">
                        {guide.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{guide.rating}</span>
                        <span className="text-[10px] text-slate-400">({guide.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{guide.city}, {guide.state}</span>
                    </div>

                    <span className="inline-block mt-1 text-[10px] font-bold text-teal-400 bg-teal-950/80 border border-teal-500/30 px-2 py-0.5 rounded-md">
                      {guide.badge}
                    </span>
                  </div>
                </div>

                {/* Specialization & Bio */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-200">
                    {guide.specialization}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {guide.bio}
                  </p>
                </div>

                {/* Badges: Languages & Experience */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{guide.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{guide.experienceYears} Years Verified Field Experience</span>
                  </div>
                </div>
              </div>

              {/* Pricing & CTAs */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-base font-black text-white">
                    {formatCurrency(guide.perDayRate, currency)}
                  </div>
                  <div className="text-[10px] text-slate-400">{t("common.perDay") || "per day"} (8 hrs)</div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveGuideModal(guide)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                  >
                    {t("guides.viewProfile") || "Profile"}
                  </button>
                  <button
                    onClick={() => handleHireGuide(guide)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-900/30 flex items-center space-x-1"
                  >
                    <span>{t("guides.hireNow") || "Hire Guide"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guide Full Details Modal */}
        {activeGuideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveGuideModal(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start space-x-4">
                <img
                  src={activeGuideModal.avatar}
                  alt={activeGuideModal.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-500"
                />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-500/30">
                    {activeGuideModal.badge}
                  </span>
                  <h3 className="text-xl font-black text-white">{activeGuideModal.name}</h3>
                  <div className="text-xs text-slate-400 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{activeGuideModal.city}, {activeGuideModal.state}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold pt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{activeGuideModal.rating}</span>
                    <span className="text-slate-400 text-[11px]">({activeGuideModal.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-1">
                    About This Guide
                  </h4>
                  <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    {activeGuideModal.bio}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
                    Signature Tour Highlights
                  </h4>
                  <div className="space-y-1.5">
                    {activeGuideModal.highlights?.map((h, i) => (
                      <div key={i} className="flex items-center space-x-2 text-teal-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Languages Spoken</div>
                    <div className="font-bold text-white text-xs mt-0.5">
                      {activeGuideModal.languages.join(", ")}
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Experience</div>
                    <div className="font-bold text-white text-xs mt-0.5">
                      {activeGuideModal.experienceYears} Years Field Guide
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-lg font-black text-white">
                    {formatCurrency(activeGuideModal.perDayRate, currency)}
                  </div>
                  <div className="text-[10px] text-slate-400">per day full tour</div>
                </div>

                <button
                  onClick={() => {
                    const g = activeGuideModal;
                    setActiveGuideModal(null);
                    handleHireGuide(g);
                  }}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-900/40"
                >
                  Hire This Guide Now
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
