import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldAlert } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Contact() {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Booking Enquiry", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast("Support enquiry transmitted! We will reply within 4 hours.", "success");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
            24/7 Global Traveler Care
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Get in Touch with TripCraft
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Need customized itineraries, corporate bookings, or emergency travel support? Our concierge team is on standby.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="bg-navy-950 border border-slate-800 p-5 rounded-2xl space-y-2">
              <MapPin className="w-5 h-5 text-teal-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Headquarters</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                TripCraft Towers, Level 4, MG Road, Bengaluru, Karnataka 560001
              </p>
            </div>

            <div className="bg-navy-950 border border-slate-800 p-5 rounded-2xl space-y-2">
              <Phone className="w-5 h-5 text-teal-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Phone Support</h4>
              <p className="text-xs text-slate-400">
                1800-TRIP-CRAFT (Toll-Free)<br />
                +91 80 4912 3000 (Direct)
              </p>
            </div>

            <div className="bg-navy-950 border border-slate-800 p-5 rounded-2xl space-y-2">
              <Mail className="w-5 h-5 text-teal-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Email Concierge</h4>
              <p className="text-xs text-slate-400">
                concierge@tripcraft.io<br />
                safety@tripcraft.io
              </p>
            </div>
          </div>

          <div className="md:col-span-2 bg-navy-950 border border-slate-800 rounded-3xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Message Transmitted</h3>
                <p className="text-xs text-slate-400">
                  Ticket #{Math.floor(100000 + Math.random() * 900000)} generated. A representative will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Booking Enquiry">Booking & Reservation Enquiry</option>
                    <option value="Solo Safety Advisory">Solo Travel Safety Advisory</option>
                    <option value="Creator Photobook Support">Photo Album Creator Payouts</option>
                    <option value="Custom Group Itinerary">Custom Corporate / Group Itinerary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your upcoming travel dates, destination, and requirements..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
