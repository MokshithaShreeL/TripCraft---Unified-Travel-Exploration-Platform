import React, { useState, useRef } from "react";
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Sparkles,
  Move,
  Layout,
  BookOpen,
  Save,
  Download,
  AlertCircle
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AlbumEditor({
  albumData,
  setAlbumData,
  onSaveDraft,
  onPreviewBook
}) {
  const { addToast } = useApp();
  const fileInputRef = useRef(null);

  const sampleTravelPacks = [
    {
      name: "Munnar Tea Sanctuary Pack (8 Photos)",
      photos: [
        { url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80", caption: "Early morning fog creeping over the Kolukkumalai tea terraces" },
        { url: "https://images.unsplash.com/photo-1616489953149-808605c31766?auto=format&fit=crop&w=800&q=80", caption: "Cascading Attukad waterfalls surrounded by lush greenery" },
        { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80", caption: "Tea plucker gently gathering fresh buds at sunrise" },
        { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", caption: "Relaxing evening at Tea County hill resort balcony" },
        { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", caption: "Attukad valley mist rising from rainforest canopy" },
        { url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80", caption: "Chandy's Windy Woods mountain vista at dusk" },
        { url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80", caption: "Peaceful stream through spice gardens" },
        { url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80", caption: "Ancient Shola trees framing Anamudi peak" }
      ]
    },
    {
      name: "Jaipur Royal Heritage Pack (8 Photos)",
      photos: [
        { url: "https://images.unsplash.com/photo-1603288940316-25f0a20ba967?auto=format&fit=crop&w=800&q=80", caption: "Hawa Mahal intricate honeycomb facade in morning sun" },
        { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80", caption: "Amer Fort grand ramparts reflected in Maota Lake" },
        { url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80", caption: "City Palace royal courtyards and peacock doors" },
        { url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80", caption: "Evening puppet dance and sitar melodies" },
        { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", caption: "Jai Mahal Palace gardens under sunset glow" },
        { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80", caption: "Fresco arches and courtyards of Alsisar Haveli" },
        { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", caption: "Sunset view over Pink City rooftops" },
        { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", caption: "Artisanal hand block printing workshops in Sanganer" }
      ]
    }
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = albumData.photoLimit - albumData.photos.length;
    if (remainingSlots <= 0) {
      addToast(`Limit reached! You cannot add more than ${albumData.photoLimit} photos.`, "error");
      return;
    }

    const filesToTake = files.slice(0, remainingSlots);
    const newPhotos = filesToTake.map((file, i) => ({
      url: URL.createObjectURL(file),
      caption: `Captured photo ${albumData.photos.length + i + 1}`,
      name: file.name
    }));

    setAlbumData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));

    if (files.length > remainingSlots) {
      addToast(`Added ${remainingSlots} photos. ${files.length - remainingSlots} photos exceeded your ${albumData.photoLimit} limit.`, "info");
    } else {
      addToast(`Added ${filesToTake.length} photos to your travel album!`, "success");
    }
  };

  const handleLoadSamplePack = (pack) => {
    const remainingSlots = albumData.photoLimit - albumData.photos.length;
    if (remainingSlots <= 0) {
      addToast(`Limit reached for selected ${albumData.photoLimit} photos plan.`, "error");
      return;
    }

    const toAdd = pack.photos.slice(0, remainingSlots);
    setAlbumData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...toAdd]
    }));
    addToast(`Loaded ${toAdd.length} high-res travel photos from ${pack.name}!`, "success");
  };

  const handleRemovePhoto = (index) => {
    setAlbumData((prev) => {
      const updated = prev.photos.filter((_, i) => i !== index);
      const newCoverIndex = prev.coverPhotoIndex >= updated.length ? 0 : prev.coverPhotoIndex;
      return { ...prev, photos: updated, coverPhotoIndex: newCoverIndex };
    });
  };

  const handleUpdateCaption = (index, newCaption) => {
    setAlbumData((prev) => {
      const updated = [...prev.photos];
      updated[index] = { ...updated[index], caption: newCaption };
      return { ...prev, photos: updated };
    });
  };

  const percentUsed = Math.min(100, Math.round((albumData.photos.length / albumData.photoLimit) * 100));

  return (
    <div className="space-y-8">
      {/* Photo Limit Indicator & Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-bold text-teal-400">
              Album Capacity Status
            </span>
            <div className="text-base font-bold text-white flex items-center space-x-2">
              <span>{albumData.photos.length} of {albumData.photoLimit} Photos Uploaded</span>
              {albumData.photos.length >= albumData.photoLimit && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Maximum Reached
                </span>
              )}
            </div>
          </div>

          {/* Quick Pack Inserter */}
          <div className="flex flex-wrap gap-2">
            {sampleTravelPacks.map((pack, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleLoadSamplePack(pack)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-teal-400 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ Load {pack.name.split(" ")[0]} Pack</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className={`h-full transition-all duration-300 ${
              percentUsed >= 100 ? "bg-amber-500" : "bg-teal-500"
            }`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>
      </div>

      {/* Drag & Drop File Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-700 hover:border-teal-500 rounded-3xl p-8 sm:p-12 text-center cursor-pointer bg-slate-900/50 hover:bg-slate-900/90 transition-all group"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">
            Drag & drop your travel photos here, or click to browse
          </h3>
          <p className="text-xs text-slate-400">
            Supports high-resolution JPG, PNG, and WebP photos. Your album plan permits up to {albumData.photoLimit} memories.
          </p>
          <button
            type="button"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors inline-block"
          >
            Browse Files
          </button>
        </div>
      </div>

      {/* Uploaded Photos Grid & Reorder/Caption Controls */}
      {albumData.photos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Uploaded Photos & Story Captions ({albumData.photos.length})
            </h3>
            <button
              onClick={() => setAlbumData((prev) => ({ ...prev, photos: [] }))}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Photos</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {albumData.photos.map((photo, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2.5 relative group"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-bold text-white">
                    #{index + 1}
                  </div>

                  {albumData.coverPhotoIndex === index && (
                    <div className="absolute top-2 right-2 bg-teal-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                      Cover Photo
                    </div>
                  )}

                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute bottom-2 right-2 bg-rose-950/80 hover:bg-rose-900 text-rose-400 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Caption Input */}
                <input
                  type="text"
                  value={photo.caption}
                  onChange={(e) => handleUpdateCaption(index, e.target.value)}
                  placeholder="Add story caption..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />

                {/* Set as Cover Button */}
                <button
                  type="button"
                  onClick={() => setAlbumData((prev) => ({ ...prev, coverPhotoIndex: index }))}
                  className={`w-full py-1 text-[11px] rounded-lg font-semibold transition-colors ${
                    albumData.coverPhotoIndex === index
                      ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                      : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {albumData.coverPhotoIndex === index ? "Selected as Cover" : "Set as Cover"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons: Save Draft & Preview Book */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
        <button
          type="button"
          onClick={onSaveDraft}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4 text-teal-400" />
          <span>Save Album Draft</span>
        </button>

        <button
          type="button"
          onClick={onPreviewBook}
          className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-teal-900/30 flex items-center space-x-2 cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Preview Interactive Photobook</span>
        </button>
      </div>
    </div>
  );
}
