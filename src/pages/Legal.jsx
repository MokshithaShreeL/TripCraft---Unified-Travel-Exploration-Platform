import React, { useState } from "react";
import { Shield, FileText, RefreshCw, CheckCircle2 } from "lucide-react";

export default function Legal({ defaultTab = "terms" }) {
  const [tab, setTab] = useState(defaultTab);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 space-x-2 sm:space-x-4">
          {[
            { id: "terms", label: "Terms of Service", icon: FileText },
            { id: "privacy", label: "Privacy Policy", icon: Shield },
            { id: "refund", label: "Refund & Cancellation Policy", icon: RefreshCw },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                tab === t.id
                  ? "border-teal-500 text-teal-400 bg-teal-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <t.icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="bg-navy-950 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-xs text-slate-300 leading-relaxed">
          {tab === "terms" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Terms of Service</h2>
              <p>Last Updated: September 2026</p>
              <p>
                Welcome to TripCraft. By accessing our platform, booking experiences, utilizing the solo buddy matcher, or publishing photo albums, you agree to comply with and be bound by the following terms.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">1. Booking Integrity & Capacity Constraints</h4>
              <p>
                All reservations are subject to standard capacity limitations. Standard hotel rooms strictly admit a maximum of 3 occupants. Any excess travelers require booking additional rooms.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">2. Dynamic Seasonal Yield</h4>
              <p>
                Prices shown reflect our real-time yield algorithm based on travel date demand, weekend surges (15%), and peak seasonal adjustments (25%). Base child fares are calculated at a 40% discount for passengers aged 2 to 11.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">3. Creator Content & Royalties</h4>
              <p>
                Travelers who create and distribute digital photobooks via the TripCraft Marketplace retain full artistic copyright and are entitled to 85% net royalties per sold copy.
              </p>
            </div>
          )}

          {tab === "privacy" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
              <p>Last Updated: September 2026</p>
              <p>
                At TripCraft, privacy and physical safety are foundational. We collect only essential contact information needed to generate authentic flight/train e-tickets and hotel check-in vouchers.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">1. Cryptographic Security</h4>
              <p>
                All account sessions are authenticated using SHA-256 JWT tokens. Sensitive payment credentials (card numbers, UPI PINs) are never stored in plain text or retained on local devices.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">2. Solo Traveler Protection</h4>
              <p>
                In the Solo Buddy Matcher lounge, direct personal contact details are kept confidential until both travelers mutually accept a shared travel proposal.
              </p>
            </div>
          )}

          {tab === "refund" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Refund & Cancellation Policy</h2>
              <p>Last Updated: September 2026</p>
              <p>
                TripCraft guarantees straightforward, transparent cancellation procedures for all travelers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-teal-400 font-bold">72+ Hours Before Travel</span>
                  <p className="text-[11px] text-slate-300">100% full refund with zero cancellation or administrative fees.</p>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-amber-400 font-bold">24 to 72 Hours Before Travel</span>
                  <p className="text-[11px] text-slate-300">80% refund processed back to source payment within 24 hours.</p>
                </div>
              </div>
              <p className="pt-2 text-[11px] text-slate-400">
                All approved refunds are credited back to the original payment method (UPI VPA or credit/debit card) within 24 business hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
