import React, { useState, useEffect } from "react";
import {
  Camera,
  Layers,
  BookOpen,
  Sparkles,
  Download,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Palette,
  CheckCircle2,
  Save,
  RotateCcw,
  MapPin,
  Calendar,
  User,
  Heart
} from "lucide-react";
import { useApp } from "../context/AppContext";
import AlbumEditor from "../components/album/AlbumEditor";

export default function Album() {
  const { addToast, addNotification, currentUser, t } = useApp();

  const [activeStep, setActiveStep] = useState(1); // 1: Setup & Limits, 2: Upload Photos, 3: Cover & Layout, 4: Book Viewer
  const [currentPage, setCurrentPage] = useState(0);

  // Default Album State
  const [albumData, setAlbumData] = useState({
    title: "Misty Highlands & Emerald Trails",
    subtitle: "A journey through cloud-kissed peaks, waterfalls, and tea sanctuaries",
    location: "Munnar, Kerala",
    dates: "October 2026",
    author: currentUser?.name || "Rohan Sharma",
    photoLimit: 500, // 250, 500, 1000, 1500, 2000
    coverTheme: "teal", // 'teal' | 'classic' | 'royal' | 'minimal'
    layoutStyle: "grid", // 'grid' | 'classic' | 'masonry' | 'magazine'
    coverPhotoIndex: 0,
    photos: [
      { url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80", caption: "Early morning sun breaking through the mist over Kolukkumalai" },
      { url: "https://images.unsplash.com/photo-1616489953149-808605c31766?auto=format&fit=crop&w=800&q=80", caption: "Cascading Attukad waterfalls roaring after fresh rains" },
      { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80", caption: "Endless emerald slopes of century-old tea estates" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", caption: "Cozy twilight at our heritage tea garden bungalow" },
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", caption: "Panoramic rainforest canyon view at Pallivasal" },
      { url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80", caption: "Winding misty roads leading up to Eravikulam sanctuary" }
    ]
  });

  // Load saved draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tripcraft_album_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.photos && parsed.photos.length > 0) {
          setAlbumData(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load album draft", e);
    }
  }, []);

  const handleSaveDraft = () => {
    try {
      localStorage.setItem("tripcraft_album_draft", JSON.stringify(albumData));
      addToast("Album draft saved securely to local storage!", "success");
      addNotification("Album Draft Saved", `"${albumData.title}" has been saved. You can resume editing anytime.`, "info");
    } catch (e) {
      addToast("Failed to save draft. Note that large uploaded photos should be hosted remotely.", "error");
    }
  };

  const photoLimitTiers = [
    { count: 250, label: "250 Photos", desc: "Ideal for a weekend escape or 3-day getaway", popular: false },
    { count: 500, label: "500 Photos", desc: "Perfect for full-week journeys across India", popular: true },
    { count: 1000, label: "1,000 Photos", desc: "Expedition scale for multi-city explorations", popular: false },
    { count: 1500, label: "1,500 Photos", desc: "Comprehensive family archives & luxury tours", popular: false },
    { count: 2000, label: "2,000 Photos", desc: "Ultimate Grand Voyage travel portfolio", popular: false }
  ];

  const coverThemes = [
    { id: "teal", name: "Wanderlust Teal", bg: "bg-teal-950 border-teal-500/50 text-teal-300", badge: "Modern Accent" },
    { id: "classic", name: "Classic Leather", bg: "bg-amber-950 border-amber-600/50 text-amber-200", badge: "Timeless" },
    { id: "royal", name: "Royal Heritage", bg: "bg-indigo-950 border-indigo-500/50 text-indigo-200", badge: "Regal" },
    { id: "minimal", name: "Monochrome Slate", bg: "bg-slate-900 border-slate-700 text-slate-200", badge: "Minimalist" }
  ];

  const layoutStyles = [
    { id: "grid", name: "Photo Grid (4 per spread)", desc: "Clean balanced grid with captions under every shot" },
    { id: "classic", name: "Classic Storybook", desc: "Large hero photo on left, evocative travel narrative on right" },
    { id: "masonry", name: "Staggered Masonry", desc: "Dynamic collage layout with varied aspect ratios" },
    { id: "magazine", name: "Magazine Editorial", desc: "Full-bleed borderless spreads with bold captions" }
  ];

  // Pagination for book viewer
  // Page 0: Front Cover
  // Page 1 .. N: Content Spreads (2 photos per spread in classic/grid)
  const photosPerSpread = albumData.layoutStyle === "classic" ? 2 : 4;
  const totalContentPages = Math.ceil(albumData.photos.length / photosPerSpread);
  const totalPages = totalContentPages + 2; // +1 front cover, +1 back cover

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  };

  const handleDownloadPDF = () => {
    addToast("Generating print-ready high-resolution photobook PDF...", "info");
    setTimeout(() => {
      addToast(`Photobook "${albumData.title}" prepared for print!`, "success");
      addNotification("Photobook Ready", `Print preview for "${albumData.title}" generated successfully.`, "success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs uppercase font-bold text-teal-400 tracking-wider flex items-center space-x-1.5">
              <Camera className="w-4 h-4 text-teal-400" />
              <span>Personal Travel Keepsake Studio</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
              {t("albums.title") || "Create Your Travel Photo Album"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {t("albums.subtitle") || "Upload your personal travel memories, select your photo volume, customize your layout spreads, and create a lasting keepsake."}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-teal-400" />
              <span>{t("albums.saveDraft") || "Save Draft"}</span>
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-teal-900/30 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t("albums.previewAlbum") || "View Book"}</span>
            </button>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveStep(1)}
            className={`py-2.5 px-3 rounded-xl font-bold transition-all text-center flex items-center justify-center space-x-2 ${
              activeStep === 1 ? "bg-teal-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-950/60 flex items-center justify-center text-[10px]">1</span>
            <span className="truncate">{t("albums.chooseSize") || "Photo Limit"}</span>
          </button>
          <button
            onClick={() => setActiveStep(2)}
            className={`py-2.5 px-3 rounded-xl font-bold transition-all text-center flex items-center justify-center space-x-2 ${
              activeStep === 2 ? "bg-teal-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-950/60 flex items-center justify-center text-[10px]">2</span>
            <span className="truncate">{t("albums.uploadTitle") || "Upload & Captions"} ({albumData.photos.length})</span>
          </button>
          <button
            onClick={() => setActiveStep(3)}
            className={`py-2.5 px-3 rounded-xl font-bold transition-all text-center flex items-center justify-center space-x-2 ${
              activeStep === 3 ? "bg-teal-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-950/60 flex items-center justify-center text-[10px]">3</span>
            <span className="truncate">{t("albums.chooseLayout") || "Cover & Layout"}</span>
          </button>
          <button
            onClick={() => {
              setActiveStep(4);
              setCurrentPage(0);
            }}
            className={`py-2.5 px-3 rounded-xl font-bold transition-all text-center flex items-center justify-center space-x-2 ${
              activeStep === 4 ? "bg-teal-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-950/60 flex items-center justify-center text-[10px]">4</span>
            <span className="truncate">{t("albums.previewAlbum") || "Interactive Photobook"}</span>
          </button>
        </div>

        {/* STEP 1: PHOTO LIMIT SELECTION */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {t("albums.chooseSize") || "Choose Album Photo Limit"}
              </h2>
              <p className="text-xs text-slate-400">
                Select how many memories you want to preserve in this photobook project. You can upload up to this number of photos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {photoLimitTiers.map((tier) => (
                <div
                  key={tier.count}
                  onClick={() => {
                    setAlbumData((prev) => ({ ...prev, photoLimit: tier.count }));
                    addToast(`Selected ${tier.label} capacity limit`, "info");
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 relative ${
                    albumData.photoLimit === tier.count
                      ? "bg-slate-900 border-teal-500 shadow-xl shadow-teal-950/40 ring-1 ring-teal-500"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-2.5 right-4 bg-teal-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      Most Chosen
                    </span>
                  )}

                  <div className="space-y-1">
                    <div className="text-2xl font-black text-white">{tier.label}</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">{tier.desc}</div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-semibold text-teal-400">
                      {albumData.photoLimit === tier.count ? "Active Tier" : "Select Tier"}
                    </span>
                    {albumData.photoLimit === tier.count && (
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setActiveStep(2)}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-900/30 flex items-center space-x-2"
              >
                <span>Continue to Upload Photos</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: UPLOAD & MANAGE PHOTOS */}
        {activeStep === 2 && (
          <AlbumEditor
            albumData={albumData}
            setAlbumData={setAlbumData}
            onSaveDraft={handleSaveDraft}
            onPreviewBook={() => {
              setActiveStep(4);
              setCurrentPage(0);
            }}
          />
        )}

        {/* STEP 3: COVER & LAYOUT CUSTOMIZER */}
        {activeStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Customizer Controls Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white">Cover Details & Typography</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Personalize the front cover stamping and theme of your travel book.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Trip Title</label>
                  <input
                    type="text"
                    value={albumData.title}
                    onChange={(e) => setAlbumData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subtitle / Sub-heading</label>
                  <input
                    type="text"
                    value={albumData.subtitle}
                    onChange={(e) => setAlbumData((prev) => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Destination / Location</label>
                    <input
                      type="text"
                      value={albumData.location}
                      onChange={(e) => setAlbumData((prev) => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Travel Dates / Season</label>
                    <input
                      type="text"
                      value={albumData.dates}
                      onChange={(e) => setAlbumData((prev) => ({ ...prev, dates: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Photographer / Author Name</label>
                  <input
                    type="text"
                    value={albumData.author}
                    onChange={(e) => setAlbumData((prev) => ({ ...prev, author: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Theme Selector */}
                <div className="pt-2">
                  <label className="block text-slate-300 font-semibold mb-2">Cover Binding Theme</label>
                  <div className="grid grid-cols-2 gap-3">
                    {coverThemes.map((th) => (
                      <div
                        key={th.id}
                        onClick={() => setAlbumData((prev) => ({ ...prev, coverTheme: th.id }))}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${th.bg} ${
                          albumData.coverTheme === th.id ? "ring-2 ring-teal-400" : "opacity-75 hover:opacity-100"
                        }`}
                      >
                        <div className="font-bold text-xs">{th.name}</div>
                        <div className="text-[10px] opacity-80">{th.badge}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layout Spreads Selector */}
                <div className="pt-2">
                  <label className="block text-slate-300 font-semibold mb-2">Internal Page Spread Layout</label>
                  <div className="space-y-2">
                    {layoutStyles.map((ly) => (
                      <div
                        key={ly.id}
                        onClick={() => setAlbumData((prev) => ({ ...prev, layoutStyle: ly.id }))}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          albumData.layoutStyle === ly.id
                            ? "bg-slate-950 border-teal-500 text-white"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs">{ly.name}</div>
                          <div className="text-[10px] text-slate-500">{ly.desc}</div>
                        </div>
                        {albumData.layoutStyle === ly.id && (
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => {
                    setActiveStep(4);
                    setCurrentPage(0);
                  }}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2"
                >
                  <span>Preview Full Photobook</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live Cover Preview */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Live Front Cover Preview
              </span>
              <div
                className={`aspect-[4/3] rounded-3xl p-8 border shadow-2xl relative overflow-hidden flex flex-col justify-between ${
                  albumData.coverTheme === "teal"
                    ? "bg-gradient-to-br from-teal-950 via-slate-950 to-teal-950 border-teal-500/40 text-teal-100"
                    : albumData.coverTheme === "classic"
                    ? "bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 border-amber-600/40 text-amber-100"
                    : albumData.coverTheme === "royal"
                    ? "bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 border-indigo-500/40 text-indigo-100"
                    : "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-slate-700 text-slate-100"
                }`}
              >
                {/* Book Spine Texture Edge */}
                <div className="absolute top-0 bottom-0 left-0 w-5 bg-black/40 border-r border-white/10" />

                <div className="relative pl-6 space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-teal-400">
                    TripCraft Keepsake Archive
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {albumData.title || "My Travel Album"}
                  </h2>
                  <p className="text-xs text-slate-300 italic">
                    {albumData.subtitle}
                  </p>
                </div>

                {/* Cover Hero Photo */}
                {albumData.photos[albumData.coverPhotoIndex] && (
                  <div className="relative pl-6 my-2">
                    <div className="aspect-[16/9] max-h-48 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
                      <img
                        src={albumData.photos[albumData.coverPhotoIndex].url}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className="relative pl-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>{albumData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-teal-400" />
                    <span>{albumData.author}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    <span>{albumData.dates}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: INTERACTIVE FLIP BOOK VIEWER */}
        {activeStep === 4 && (
          <div className="space-y-6">
            {/* Flip Viewer Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
                >
                  Edit Cover & Layout
                </button>
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
                >
                  Manage Photos
                </button>
              </div>

              {/* Page Indicator & Flip Arrows */}
              <div className="flex items-center space-x-4 self-center">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-xs font-bold text-slate-200">
                  {currentPage === 0
                    ? "Front Cover"
                    : currentPage === totalPages - 1
                    ? "Back Cover"
                    : `Spread ${currentPage} of ${totalPages - 2}`}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-md shadow-teal-900/30"
              >
                <Download className="w-4 h-4" />
                <span>Export Printable PDF</span>
              </button>
            </div>

            {/* Realistic Photobook Flip Spread Simulation */}
            <div className="max-w-5xl mx-auto bg-stone-900/80 p-4 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
              
              {/* PAGE 0: FRONT COVER */}
              {currentPage === 0 && (
                <div className="max-w-2xl mx-auto aspect-[4/3] rounded-3xl p-8 sm:p-12 border shadow-2xl relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-teal-950 via-slate-950 to-teal-950 border-teal-500/40 text-teal-100 animate-in fade-in duration-200">
                  <div className="absolute top-0 bottom-0 left-0 w-6 bg-black/50 border-r border-white/10" />
                  
                  <div className="pl-6 space-y-2">
                    <span className="text-xs uppercase font-bold tracking-widest text-teal-400">
                      TripCraft Travel Keepsake Edition
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                      {albumData.title}
                    </h1>
                    <p className="text-sm text-slate-300 italic max-w-md">
                      {albumData.subtitle}
                    </p>
                  </div>

                  {albumData.photos[albumData.coverPhotoIndex] && (
                    <div className="pl-6 my-4">
                      <div className="aspect-[16/9] max-h-64 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                        <img
                          src={albumData.photos[albumData.coverPhotoIndex].url}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="pl-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                    <span>{albumData.location}</span>
                    <span>By {albumData.author}</span>
                    <span>{albumData.dates}</span>
                  </div>
                </div>
              )}

              {/* PAGES 1 .. N-1: CONTENT SPREADS */}
              {currentPage > 0 && currentPage < totalPages - 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-inner relative min-h-[480px]">
                  {/* Center Book Spine Binding Shadow */}
                  <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-black/50 to-transparent pointer-events-none" />

                  {/* Extract photos for this spread */}
                  {(() => {
                    const startIndex = (currentPage - 1) * photosPerSpread;
                    const spreadPhotos = albumData.photos.slice(startIndex, startIndex + photosPerSpread);

                    return spreadPhotos.map((photo, i) => (
                      <div
                        key={i}
                        className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between space-y-3"
                      >
                        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950">
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                            Memory #{startIndex + i + 1}
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed italic">
                            "{photo.caption || "Special moment in " + albumData.location}"
                          </p>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}

              {/* FINAL PAGE: BACK COVER */}
              {currentPage === totalPages - 1 && (
                <div className="max-w-2xl mx-auto aspect-[4/3] rounded-3xl p-8 sm:p-12 border shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center space-y-6 bg-slate-950 border-slate-800 text-slate-300 animate-in fade-in duration-200">
                  <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold">
                    <Heart className="w-8 h-8 fill-teal-400/20" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">The End of One Chapter,</h3>
                    <h4 className="text-xl font-bold text-teal-400">The Beginning of the Next.</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Printed exclusively through TripCraft Travel Keepsakes. Preserved for a lifetime of memories.
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-4 w-full">
                    {albumData.title} • {albumData.location} • {albumData.dates}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
