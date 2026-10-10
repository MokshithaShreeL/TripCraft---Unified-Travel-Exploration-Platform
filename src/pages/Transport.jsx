import React, { useState } from "react";
import {
  Plane,
  Train,
  Bus,
  Car,
  Clock,
  Luggage,
  ShieldCheck,
  CheckCircle2,
  Users,
  Search,
  ArrowRight
} from "lucide-react";
import { TRANSPORT_DATA } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { useBooking } from "../context/BookingContext";
import { formatCurrency } from "../utils/pricing";

export default function Transport() {
  const { currency, t } = useApp();
  const { openBooking } = useBooking();

  const [activeTab, setActiveTab] = useState("flights"); // "flights" | "trains" | "buses" | "cabs"
  const [fromCity, setFromCity] = useState("All");
  const [toCity, setToCity] = useState("All");

  const cities = ["All", "New Delhi", "Mumbai", "Bengaluru", "Chennai", "Munnar / Kochi", "Jaipur", "South Goa", "Leh Ladakh", "Hampi"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
            {t("transport.title") || "Multi-Modal Transit"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
            {t("nav.transport") || "Transport & Tickets Suite"}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            {t("transport.subtitle") || "Compare and book authentic domestic flights, premium Vande Bharat express trains, Volvo multi-axle coaches, and sanitized outstation cabs."}
          </p>
        </div>

        {/* Transit Mode Switcher Tabs */}
        <div className="flex border-b border-slate-800 space-x-2 sm:space-x-4">
          {[
            { id: "flights", label: t("transport.flights") || "Domestic Flights", icon: Plane },
            { id: "trains", label: t("transport.trains") || "Express Trains", icon: Train },
            { id: "buses", label: t("transport.buses") || "Volvo Luxury Buses", icon: Bus },
            { id: "cabs", label: t("transport.cabs") || "Outstation Cabs", icon: Car },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-teal-500 text-teal-400 bg-teal-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* FLIGHTS VIEW                                                   */}
        {/* ============================================================== */}
        {activeTab === "flights" && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              Showing authentic scheduled departures with real flight numbers & meal details:
            </div>

            <div className="grid grid-cols-1 gap-4">
              {TRANSPORT_DATA.flights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-navy-950 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-xs text-teal-400">
                      {flight.carrier}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center space-x-2">
                        <span>{flight.carrier} {flight.flightNo}</span>
                        <span className="text-[10px] text-teal-400 font-mono bg-teal-950 px-1.5 py-0.2 rounded border border-teal-800">
                          {flight.aircraft}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center space-x-2">
                        <span>{flight.stops}</span>
                        <span>•</span>
                        <span>{flight.baggage}</span>
                        <span>•</span>
                        <span>{flight.meal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Route & Times */}
                  <div className="flex items-center space-x-6 text-center">
                    <div>
                      <div className="text-sm font-black text-white">{flight.depTime}</div>
                      <div className="text-[10px] text-slate-400">{flight.from}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400">{flight.duration}</span>
                      <div className="w-20 h-0.5 bg-slate-700 my-1 relative">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 absolute right-0 -top-0.5"></div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-black text-white">{flight.arrTime}</div>
                      <div className="text-[10px] text-slate-400">{flight.to}</div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between md:justify-end md:space-x-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                    <div className="text-left md:text-right">
                      <div className="text-[10px] text-amber-400 font-semibold">
                        Only {flight.availableSeats} seats left
                      </div>
                      <div className="text-base font-black text-white">
                        {formatCurrency(flight.adultPrice, currency)}
                        <span className="text-[10px] text-slate-400 ml-1">/ adult</span>
                      </div>
                    </div>

                    <button
                      onClick={() => openBooking(flight, "transport")}
                      className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      {t("transport.bookSeat") || "Select Flight"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TRAINS VIEW                                                    */}
        {/* ============================================================== */}
        {activeTab === "trains" && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              High-speed Vande Bharat and Superfast express trains:
            </div>

            <div className="grid grid-cols-1 gap-4">
              {TRANSPORT_DATA.trains.map((train) => (
                <div
                  key={train.id}
                  className="bg-navy-950 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-teal-400">
                      <Train className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                        <span>{train.trainNo} {train.name}</span>
                        <span className="text-[10px] text-amber-400 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-800">
                          {train.coachClass}
                        </span>
                      </h4>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {train.pantry} • Confirmation Rate: <strong className="text-emerald-400">{train.pnrConfirmationRate}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-center">
                    <div>
                      <div className="text-sm font-black text-white">{train.depTime}</div>
                      <div className="text-[10px] text-slate-400">{train.fromStation}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400">{train.duration}</span>
                      <div className="w-20 h-0.5 bg-slate-700 my-1"></div>
                    </div>

                    <div>
                      <div className="text-sm font-black text-white">{train.arrTime}</div>
                      <div className="text-[10px] text-slate-400">{train.toStation}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end md:space-x-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                    <div className="text-left md:text-right">
                      <div className="text-[10px] text-teal-400 font-semibold">
                        {train.availableSeats} Available
                      </div>
                      <div className="text-base font-black text-white">
                        {formatCurrency(train.adultPrice, currency)}
                      </div>
                    </div>

                    <button
                      onClick={() => openBooking(train, "transport")}
                      className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      {t("transport.bookSeat") || "Book Ticket"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* BUSES VIEW                                                     */}
        {/* ============================================================== */}
        {activeTab === "buses" && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              Premium Volvo Multi-Axle sleeper coaches with verified amenities:
            </div>

            <div className="grid grid-cols-1 gap-4">
              {TRANSPORT_DATA.buses.map((bus) => (
                <div
                  key={bus.id}
                  className="bg-navy-950 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-teal-400">
                      <Bus className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{bus.operator}</h4>
                      <div className="text-[11px] text-teal-400 font-medium">{bus.busType}</div>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {bus.amenities.slice(0, 3).map((a, i) => (
                          <span key={i} className="text-[10px] bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-center">
                    <div>
                      <div className="text-sm font-black text-white">{bus.depTime}</div>
                      <div className="text-[10px] text-slate-400">{bus.fromCity}</div>
                    </div>
                    <div className="text-[10px] text-slate-500">{bus.duration}</div>
                    <div>
                      <div className="text-sm font-black text-white">{bus.arrTime}</div>
                      <div className="text-[10px] text-slate-400">{bus.toCity}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end md:space-x-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                    <div className="text-left md:text-right">
                      <div className="text-[10px] text-slate-400">{bus.availableSeats} seats left</div>
                      <div className="text-base font-black text-white">
                        {formatCurrency(bus.adultPrice, currency)}
                      </div>
                    </div>

                    <button
                      onClick={() => openBooking(bus, "transport")}
                      className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      {t("transport.bookSeat") || "Select Seats"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* CABS VIEW                                                      */}
        {/* ============================================================== */}
        {activeTab === "cabs" && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              Sanitized outstation cabs with verified professional chauffeurs (tolls & interstate taxes included):
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TRANSPORT_DATA.cabs.map((cab) => (
                <div
                  key={cab.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] relative">
                    <img src={cab.image} alt={cab.model} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-teal-400 border border-teal-500/30">
                      {cab.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">{cab.model}</h4>
                      <div className="mt-2 space-y-1 text-xs text-slate-400">
                        <div className="flex items-center space-x-1.5">
                          <Users className="w-3.5 h-3.5 text-teal-400" />
                          <span>Seating Capacity: <strong>Max {cab.capacity} passengers</strong></span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Luggage className="w-3.5 h-3.5 text-teal-400" />
                          <span>Luggage: {cab.luggageCapacity}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>All Tolls & Interstate Permit Included</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase">Base Transfer Fare</div>
                        <div className="text-base font-black text-white">
                          {formatCurrency(cab.baseFare, currency)}
                        </div>
                      </div>

                      <button
                        onClick={() => openBooking(cab, "cab")}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        {t("common.bookNow") || "Book Chauffeur"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
