import React from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  ShieldCheck,
  Lock,
  Headphones,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  Heart,
  Users,
  Camera
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-slate-800/80 bg-navy-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                Vetted Safety Index
              </h4>
              <p className="text-xs text-slate-400">
                Audited women-safe stays & 24/7 security reception.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                256-Bit SSL Payments
              </h4>
              <p className="text-xs text-slate-400">
                Instant UPI, RuPay, and PCI-DSS verified gateway.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                100% Authentic Stays
              </h4>
              <p className="text-xs text-slate-400">
                Transparent room capacity rules & certified local guides.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                24/7 Emergency Support
              </h4>
              <p className="text-xs text-slate-400">
                Direct helpline & automated AI travel concierge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                TripCraft
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              India's premier modern travel platform. Designed for curious solo travelers, conscious families, and experiential seekers with dynamic pricing realism and personal travel photo keepsake creation.
            </p>
            <div className="text-xs space-y-1 text-slate-400">
              <p className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>TripCraft Towers, MG Road, Bengaluru, Karnataka 560001</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>Emergency Support: 1800-TRIP-CRAFT (+91 80 4912 3000)</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>concierge@tripcraft.io</span>
              </p>
            </div>
          </div>

          {/* Travel Horizons */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Explore India
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/destinations" className="hover:text-teal-400">Munnar Tea Highlands</Link></li>
              <li><Link to="/destinations" className="hover:text-teal-400">Jaipur Royal Havelis</Link></li>
              <li><Link to="/destinations" className="hover:text-teal-400">Ladakh High Passes</Link></li>
              <li><Link to="/destinations" className="hover:text-teal-400">Havelock Coral Reefs</Link></li>
              <li><Link to="/destinations" className="hover:text-teal-400">Hampi Boulder Relics</Link></li>
              <li><Link to="/destinations" className="hover:text-teal-400">Varanasi Sacred Ghats</Link></li>
            </ul>
          </div>

          {/* Platform Engines */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Specialized Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/hotels" className="hover:text-teal-400">Verified Hotels & Resorts</Link></li>
              <li><Link to="/guides" className="hover:text-teal-400">Certified Local Guides</Link></li>
              <li><Link to="/solo" className="hover:text-teal-400">Solo Safety Index</Link></li>
              <li><Link to="/album" className="hover:text-teal-400">Personal Photo Albums</Link></li>
              <li><Link to="/community" className="hover:text-teal-400">Travel Buddy Matching</Link></li>
              <li><Link to="/budget" className="hover:text-teal-400">40/25/20/15 Budget Calculator</Link></li>
            </ul>
          </div>

          {/* Governance & Trust */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Trust & Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/faq" className="hover:text-teal-400">Platform FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400">Contact Support</Link></li>
              <li><Link to="/terms" className="hover:text-teal-400">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-teal-400">Privacy Policy</Link></li>
              <li><Link to="/refund" className="hover:text-teal-400">Refund Guarantee</Link></li>
              <li><Link to="/admin" className="hover:text-amber-400">Partner & Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 TripCraft Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Built with precision for travelers worldwide</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
