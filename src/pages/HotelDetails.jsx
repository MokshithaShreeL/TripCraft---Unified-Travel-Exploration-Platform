import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Building,
  Star,
  ShieldCheck,
  Users,
  MapPin,
  CheckCircle2,
  Heart,
  Share2,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Coffee,
  Wifi,
  Waves,
  Utensils,
  Car,
  Clock,
  Info
} from "lucide-react";
import { HOTELS, DESTINATIONS } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { useBooking } from "../context/BookingContext";
import { formatCurrency } from "../utils/pricing";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currency, isInWishlist, toggleWishlist, addToast, t } = useApp();
  const { openBooking } = useBooking();

  const hotel = HOTELS.find((h) => h.id === id) || HOTELS[0];
  const destination = DESTINATIONS.find((d) => d.id === hotel.destinationId) || {
    name: "India",
    state: "Heritage",
    weather: { temp: "22°C", condition: "Pleasant" }
  };

  const isFavorited = isInWishlist(hotel.id);
  const [selectedRoom, setSelectedRoom] = useState("deluxe");

  // Room tiers derived for this hotel
  const roomTypes = [
    {
      id: "deluxe",
      name: "Deluxe Heritage King Room",
      view: "Valley / Garden View",
      size: "380 sq.ft",
      capacity: hotel.maxOccupancyPerRoom || 2,
      priceMultiplier: 1.0,
      perks: ["Complimentary High-Speed WiFi", "Free High Tea & Snacks", "King Bed or Twin Beds"]
    },
    {
      id: "premium",
      name: "Premium Panoramic Balcony Suite",
      view: "Panoramic Mountain / Sea View",
      size: "520 sq.ft",
      capacity: (hotel.maxOccupancyPerRoom || 2) + 1,
      priceMultiplier: 1.35,
      perks: ["Private Balcony with Sitout", "Bathtub & Rain Shower", "Daily Buffet Breakfast Included", "Mini-bar Access"]
    },
    {
      id: "royal",
      name: "Royal Executive Luxury Suite",
      view: "360° Scenic View",
      size: "750 sq.ft",
      capacity: (hotel.maxOccupancyPerRoom || 2) + 2,
      priceMultiplier: 1.8,
      perks: ["Private Butler Service", "Complimentary Airport/Station Transfer", "All-Inclusive Dining Option", "Jacuzzi"]
    }
  ];

  // Similar hotels in same destination or category
  const similarHotels = HOTELS.filter(
    (h) => h.id !== hotel.id && (h.destinationId === hotel.destinationId || h.type === hotel.type)
  ).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast("Link copied to clipboard!", "success");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/hotels" className="hover:text-white transition-colors">Hotels</Link>
          <span>/</span>
          <span className="text-teal-400 font-semibold">{hotel.name}</span>
        </div>

        {/* Header Summary & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {hotel.type}
              </span>
              {hotel.verifiedPartner && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-blue-400" />
                  <span>TripCraft Verified Partner</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {hotel.name}
            </h1>
            <div className="flex items-center space-x-3 text-xs text-slate-400 mt-2">
              <div className="flex items-center space-x-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{hotel.location}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-white">{hotel.rating}</span>
                <span className="text-slate-400">({hotel.reviewsCount} reviews)</span>
              </div>
              <span>•</span>
              <span className="text-slate-400">{hotel.stars} Star Rated</span>
            </div>
          </div>

          {/* Social / Wishlist Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Share hotel"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(hotel.id, "hotel")}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isFavorited
                  ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:text-rose-400"
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-500 text-rose-500" : ""}`} />
            </button>
            <button
              onClick={() => openBooking(hotel, "hotel")}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-teal-900/30 flex items-center space-x-2 cursor-pointer"
            >
              <span>{t("common.reserve") || "Reserve Room"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hotel Media Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900">
          <div className="md:col-span-2 relative aspect-[16/10] overflow-hidden">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">Featured Property</span>
                <p className="text-sm text-slate-200">Impeccable hospitality surrounded by scenic landscapes</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 justify-between bg-slate-900/60">
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stay Overview</span>
              <div className="text-2xl font-black text-white">
                {formatCurrency(hotel.basePricePerNight, currency)}
                <span className="text-xs font-normal text-slate-400"> / night</span>
              </div>
              <p className="text-xs text-slate-400">
                Inclusive of all taxes, 12% GST, high-speed WiFi and welcome refreshers.
              </p>
              <div className="pt-2 border-t border-slate-800/80 space-y-1 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Check-in:</span>
                  <span className="font-semibold text-white">02:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Check-out:</span>
                  <span className="font-semibold text-white">11:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Child Policy:</span>
                  <span className="font-semibold text-teal-300">
                    {hotel.childFriendly ? "Complimentary for kids under 6" : "Adults & Teens (12+)"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openBooking(hotel, "hotel")}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl text-sm font-bold transition-all shadow-xl shadow-teal-900/40 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{t("common.bookNow") || "Instant Room Booking"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Tabs / Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column: Room Tiers & Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Room Tier Selection */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Available Room Categories</h2>
                  <p className="text-xs text-slate-400">Select your preferred comfort configuration</p>
                </div>
                <span className="text-xs text-teal-400 font-semibold bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                  Best Rate Guaranteed
                </span>
              </div>

              <div className="space-y-4">
                {roomTypes.map((room) => {
                  const roomPrice = Math.round(hotel.basePricePerNight * room.priceMultiplier);
                  const isSelected = selectedRoom === room.id;

                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-slate-800/90 border-teal-500 ring-1 ring-teal-500/50"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-bold text-white">{room.name}</h3>
                            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                              {room.size}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{room.view} • Up to {room.capacity} Guests</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {room.perks.map((perk, i) => (
                              <span key={i} className="text-[10px] text-teal-300 flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3 text-teal-400" />
                                <span>{perk}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="sm:text-right shrink-0">
                          <div className="text-base font-black text-white">
                            {formatCurrency(roomPrice, currency)}
                          </div>
                          <div className="text-[10px] text-slate-400">per night</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openBooking({ ...hotel, basePricePerNight: roomPrice, selectedRoomTier: room.name }, "hotel");
                            }}
                            className="mt-2 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          >
                            Select Tier
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Amenities Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">Property Amenities & Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {hotel.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies & Transparency */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">Cancellation & House Rules</h2>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Free Cancellation:</strong> Full refund up to 72 hours before check-in date. No questions asked.
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Government ID:</strong> Aadhar, Passport or Driving License required for all adult guests at check-in.
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Child Policy:</strong> Children under 6 stay free sharing existing bedding. Extra bed charged at ₹1,200/night.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Column: Destination Guide & Similar Properties */}
          <div className="space-y-6">
            
            {/* Destination Highlight Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">About Location</span>
              <h3 className="text-base font-bold text-white">{destination.name}, {destination.state}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {destination.description || "Scenic destination celebrated for rich cultural heritage and pristine vistas."}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                <span>Current Weather:</span>
                <span className="text-white font-semibold">{destination.weather?.temp || "22°C"} • {destination.weather?.condition || "Pleasant"}</span>
              </div>
              <Link
                to={`/destinations/${destination.id}`}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl text-xs font-bold text-center block transition-colors border border-slate-700"
              >
                Explore {destination.name} Guide
              </Link>
            </div>

            {/* Similar Accommodations */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Similar Accommodations</h3>
              <div className="space-y-3">
                {similarHotels.map((sim) => (
                  <Link
                    key={sim.id}
                    to={`/hotels/${sim.id}`}
                    className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 transition-all group"
                  >
                    <img
                      src={sim.image}
                      alt={sim.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-teal-400 transition-colors">
                        {sim.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">{sim.location}</p>
                      <div className="text-xs font-extrabold text-teal-300 mt-0.5">
                        {formatCurrency(sim.basePricePerNight, currency)} / nt
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
