import React from "react";
import { Link } from "react-router-dom";
import {
  X,
  Calendar,
  Users,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  CheckCircle,
  AlertTriangle,
  Lock,
  ArrowRight,
  Printer,
  Sparkles,
  Info
} from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/pricing";

export default function BookingModal() {
  const {
    isOpen,
    closeBooking,
    activeTab,
    setActiveTab,
    bookingItem,
    bookingType,
    travelDate,
    setTravelDate,
    nights,
    setNights,
    adults,
    setAdults,
    childrenCount,
    setChildrenCount,
    infants,
    setInfants,
    childAges,
    setChildAge,
    rooms,
    setRooms,
    contactInfo,
    setContactInfo,
    guests,
    setGuests,
    addons,
    setAddons,
    paymentMethod,
    setPaymentMethod,
    upiId,
    setUpiId,
    cardDetails,
    setCardDetails,
    selectedBank,
    setSelectedBank,
    isProcessing,
    confirmedBooking,
    fare,
    processPayment
  } = useBooking();

  const { currency, t } = useApp();

  if (!isOpen || !bookingItem) return null;

  const itemTitle =
    bookingItem.title ||
    bookingItem.name ||
    bookingItem.carrier ||
    "TripCraft Experience";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-200">
        
        {/* Modal Header */}
        <div className="bg-navy-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              {bookingType === "hotel" ? <Building className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-teal-400">
                {t("booking.modalTitle") || "TripCraft Secure Booking"}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-md">
                {itemTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={closeBooking}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress tabs */}
        {!confirmedBooking && (
          <div className="bg-navy-900 border-b border-slate-800 px-6 py-2.5 flex items-center justify-between text-xs">
            {[
              { id: 1, label: t("booking.step1") || "1. Overview & Dates" },
              { id: 2, label: t("booking.step2") || "2. Traveller Details" },
              { id: 3, label: t("booking.step3") || "3. Services & Add-ons" },
              { id: 4, label: t("booking.step4") || "4. Payment & Confirm" }
            ].map((step) => (
              <button
                key={step.id}
                onClick={() => {
                  if (step.id < activeTab || fare.validation.valid) {
                    setActiveTab(step.id);
                  }
                }}
                className={`flex items-center space-x-1.5 font-semibold py-1 px-2.5 rounded-lg transition-colors ${
                  activeTab === step.id
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                    : activeTab > step.id
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-slate-600 cursor-not-allowed"
                }`}
              >
                <span>{step.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Modal Body / Tab Panes */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* ============================================================== */}
          {/* TAB 1: OVERVIEW & DATES & PARTY SIZE                          */}
          {/* ============================================================== */}
          {activeTab === 1 && !confirmedBooking && (
            <div className="space-y-6">
              {/* Dynamic Season & Demand Banner */}
              <div className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                fare.isPeak
                  ? "bg-amber-950/30 border-amber-500/30 text-amber-200"
                  : "bg-teal-950/30 border-teal-500/30 text-teal-200"
              }`}>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold">
                      {fare.isPeak ? "Peak Season / Weekend Pricing Active" : "Standard Value Fare Applied"}
                    </span>
                    <p className="text-[11px] text-slate-300">
                      Multiplier: {fare.multiplier}x base rate based on selected travel dates.
                    </p>
                  </div>
                </div>
                <span className="bg-slate-900 px-2 py-1 rounded text-[11px] font-mono font-bold text-white border border-slate-700">
                  {formatCurrency(fare.effectiveAdultRate, currency)} / adult
                </span>
              </div>

              {/* Travel Date & Nights Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Travel / Check-in Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                {bookingType === "hotel" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Stay Duration (Nights)
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setNights(Math.max(1, nights - 1))}
                        disabled={nights <= 1}
                        className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-white">{nights} Nights</span>
                      <button
                        type="button"
                        onClick={() => setNights(nights + 1)}
                        className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Party Size Steppers (Adults, Children, Infants, Rooms) */}
              <div className="bg-navy-950 p-4 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                  <Users className="w-4 h-4 text-teal-400" />
                  <span>Guests & Room Allocation</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Adults */}
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Adults</div>
                      <div className="text-[10px] text-slate-400">12+ years</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        disabled={adults <= 1}
                        className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-white font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-white">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Children</div>
                      <div className="text-[10px] text-teal-400 font-semibold">2–11 yrs (40% OFF)</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                        disabled={childrenCount <= 0}
                        className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-white font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-white">{childrenCount}</span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(childrenCount + 1)}
                        className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Infants</div>
                      <div className="text-[10px] text-slate-400">&lt; 2 yrs (Free)</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setInfants(Math.max(0, infants - 1))}
                        disabled={infants <= 0}
                        className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-white font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-white">{infants}</span>
                      <button
                        type="button"
                        onClick={() => setInfants(infants + 1)}
                        className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hotel Rooms Stepper */}
                {bookingType === "hotel" && (
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Number of Rooms</div>
                      <div className="text-[10px] text-slate-400">Max 3 guests allowed per room</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        disabled={rooms <= 1}
                        className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-white font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-white">{rooms}</span>
                      <button
                        type="button"
                        onClick={() => setRooms(rooms + 1)}
                        className="w-7 h-7 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Dynamic Child Age Selectors if childrenCount > 0 */}
                {childrenCount > 0 && (
                  <div className="pt-2 border-t border-slate-800">
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Please specify age for each child (for bed & ticket concession):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {childAges.map((age, idx) => (
                        <div key={idx} className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                          <span className="block text-[10px] text-slate-400 mb-1">
                            Child #{idx + 1} Age
                          </span>
                          <select
                            value={age}
                            onChange={(e) => setChildAge(idx, e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                          >
                            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((a) => (
                              <option key={a} value={a}>
                                {a} years old
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Inline Capacity Validation Alert if violated */}
              {!fare.validation.valid && (
                <div className="p-3.5 bg-rose-950/40 border border-rose-500/50 rounded-xl text-rose-200 text-xs flex items-center space-x-2.5">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="font-medium">{fare.validation.error}</span>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: TRAVELLER DETAILS & PASSENGERS                          */}
          {/* ============================================================== */}
          {activeTab === 2 && !confirmedBooking && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Lead Traveler Contact Info
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={contactInfo.fullName}
                      onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Email (for E-Ticket)</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Phone Number (SMS Alert)</label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Special Travel Requests
                </h4>
                <textarea
                  rows={2}
                  value={contactInfo.specialRequests}
                  onChange={(e) => setContactInfo({ ...contactInfo, specialRequests: e.target.value })}
                  placeholder="e.g. Vegetarian Jain meal, quiet room, ground floor preference..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500"
                />
              </div>

              {/* Guest manifest preview */}
              <div className="bg-navy-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-slate-200 mb-2">
                  Passenger Roster: {adults} Adult(s), {childrenCount} Child(ren), {infants} Infant(s)
                </div>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center space-x-2 text-white">
                    <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                    <span>Lead: <strong>{contactInfo.fullName}</strong> (Adult)</span>
                  </div>
                  {adults > 1 && (
                    <div className="text-[11px] text-slate-400 pl-4">
                      + {adults - 1} Additional Adult(s) included in booking
                    </div>
                  )}
                  {childrenCount > 0 && (
                    <div className="text-[11px] text-teal-400 pl-4">
                      + {childrenCount} Child Passenger(s) (Ages: {childAges.join(", ")} years)
                    </div>
                  )}
                  {infants > 0 && (
                    <div className="text-[11px] text-slate-400 pl-4">
                      + {infants} Infant (Complimentary lap travel)
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: SERVICES & ADD-ONS                                      */}
          {/* ============================================================== */}
          {activeTab === 3 && !confirmedBooking && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Enhance Your Journey (Optional Add-ons)
              </h4>

              {/* Insurance */}
              <label className="flex items-start space-x-3 p-4 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={addons.travelInsurance}
                  onChange={(e) => setAddons({ ...addons, travelInsurance: e.target.checked })}
                  className="mt-1 rounded text-teal-600 focus:ring-teal-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      Comprehensive Medical & Baggage Protection
                    </span>
                    <span className="text-xs font-bold text-teal-400">
                      ₹399 / traveler
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Covers emergency medical hospitalization up to ₹5,00,000, 100% trip cancellation reimbursement, and baggage delay compensation.
                  </p>
                </div>
              </label>

              {/* Airport Transfer */}
              <label className="flex items-start space-x-3 p-4 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={addons.airportTransfer}
                  onChange={(e) => setAddons({ ...addons, airportTransfer: e.target.checked })}
                  className="mt-1 rounded text-teal-600 focus:ring-teal-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      Chauffeur Airport / Railway Station Transfer
                    </span>
                    <span className="text-xs font-bold text-teal-400">
                      ₹1,200 flat
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Guaranteed on-time pickup with meet & greet placard and verified chauffeur.
                  </p>
                </div>
              </label>

              {/* Carbon Offset */}
              <label className="flex items-start space-x-3 p-4 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={addons.carbonOffset}
                  onChange={(e) => setAddons({ ...addons, carbonOffset: e.target.checked })}
                  className="mt-1 rounded text-teal-600 focus:ring-teal-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      Verified Eco Carbon Offset Certificate
                    </span>
                    <span className="text-xs font-bold text-teal-400">
                      ₹99 / traveler
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Plants 2 native trees in the Western Ghats to neutralize the travel carbon footprint.
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: PAYMENT & CONFIRMATION                                  */}
          {/* ============================================================== */}
          {activeTab === 4 && !confirmedBooking && (
            <div className="space-y-6">
              {/* Payment Methods */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Select Payment Method
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === "upi"
                        ? "bg-teal-950/60 border-teal-500 text-teal-300 font-bold"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1 text-teal-400" />
                    <span className="text-xs block">UPI / QR Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === "card"
                        ? "bg-teal-950/60 border-teal-500 text-teal-300 font-bold"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-teal-400" />
                    <span className="text-xs block">Cards / RuPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === "netbanking"
                        ? "bg-teal-950/60 border-teal-500 text-teal-300 font-bold"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Building className="w-5 h-5 mx-auto mb-1 text-teal-400" />
                    <span className="text-xs block">NetBanking</span>
                  </button>
                </div>
              </div>

              {/* Payment Method Inputs */}
              {paymentMethod === "upi" && (
                <div className="bg-navy-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Mock QR */}
                  <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center shrink-0">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=tripcraft@icici&pn=TripCraft%20Travel"
                      alt="UPI QR Code"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="text-xs font-bold text-white">
                      Scan using Google Pay, PhonePe, Paytm, or BHIM
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Or enter your Virtual Payment Address (VPA):
                    </div>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="mobile@upi"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="bg-navy-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[11px] text-slate-300 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardDetails.nameOnCard}
                        onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white text-center font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white text-center font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "netbanking" && (
                <div className="bg-navy-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Select Your Bank
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    <option value="sbi">State Bank of India (SBI)</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* Trust Badge */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
                <span className="flex items-center space-x-1.5 text-teal-400 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </span>
                <span>PCI-DSS Level 1 Verified</span>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* CONFIRMATION SCREEN (When payment succeeds)                    */}
          {/* ============================================================== */}
          {confirmedBooking && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mx-auto ring-4 ring-teal-500/30">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-teal-400">
                  Payment Authorized Successfully
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Your Journey Is Confirmed!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  E-ticket voucher and invoice have been dispatched to <strong>{confirmedBooking.contactInfo?.email}</strong>.
                </p>
              </div>

              {/* Reference Card */}
              <div className="bg-navy-950 max-w-md mx-auto p-4 rounded-xl border border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Booking Reference:</span>
                  <span className="font-mono font-bold text-amber-400">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-semibold text-white truncate max-w-[200px]">{confirmedBooking.itemTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Travel Date:</span>
                  <span className="text-white">{confirmedBooking.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Paid:</span>
                  <span className="font-bold text-teal-400">{formatCurrency(confirmedBooking.fareSummary?.grandTotal, currency)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center space-x-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t("booking.printVoucher") || "Print Voucher"}</span>
                </button>

                <Link
                  to="/bookings"
                  onClick={closeBooking}
                  className="flex items-center space-x-1.5 px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <span>{t("booking.goToBookings") || "Go to My Bookings"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Dynamic Fare Summary & CTA */}
        {!confirmedBooking && (
          <div className="bg-navy-950 px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Price breakdown summary */}
            <div className="w-full sm:w-auto text-left">
              <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                <span>Total for {adults + childrenCount} guest(s)</span>
                {fare.groupDiscount > 0 && (
                  <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded text-[10px]">
                    Group 10% Discount Applied
                  </span>
                )}
              </div>
              <div className="text-lg sm:text-xl font-black text-white flex items-baseline space-x-2">
                <span>{formatCurrency(fare.grandTotal, currency)}</span>
                <span className="text-[11px] font-normal text-slate-400">
                  (incl. ₹{fare.gst.toLocaleString()} GST)
                </span>
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              {activeTab > 1 && (
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab - 1)}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Back
                </button>
              )}

              {activeTab < 4 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (fare.validation.valid) {
                      setActiveTab(activeTab + 1);
                    }
                  }}
                  disabled={!fare.validation.valid}
                  className="px-6 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-xs font-bold text-white transition-colors flex items-center space-x-1.5"
                >
                  <span>{t("common.continueBtn") || "Continue"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={processPayment}
                  disabled={isProcessing || !fare.validation.valid}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-xs font-extrabold text-white transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Authorizing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>{t("booking.payNow") || "Pay"} {formatCurrency(fare.grandTotal, currency)}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
