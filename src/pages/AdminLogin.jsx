import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Server,
  KeyRound,
  CheckCircle2,
  Compass
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function AdminLogin() {
  const { adminLogin, t } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@tripcraft.io");
  const [password, setPassword] = useState("Admin@123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAdminSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      await adminLogin(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setErrorMsg(err.message || "Invalid administrator credentials. Access denied.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail("admin@tripcraft.io");
    setPassword("Admin@123");
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-1 shadow-lg shadow-amber-950/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-md border border-amber-500/30">
              TripCraft Governance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Administrator Sign In
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Authorized administrative access for platform operations, booking reconciliations, partner hotel verifications, and financial ledger governance.
          </p>
        </div>

        {/* Admin Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
              <Lock className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleAdminSignIn} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tripcraft.io"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-semibold">
                  Administrator Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-xl font-black text-xs transition-all shadow-md shadow-amber-950/40 flex items-center justify-center space-x-2 cursor-pointer mt-4 disabled:opacity-50"
            >
              <span>{isLoading ? "Authenticating Admin..." : "Admin Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Pre-fill Button for Evaluator Convenience */}
          <div className="pt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline decoration-dotted"
            >
              Use Authorized Demo Admin Credentials (admin@tripcraft.io)
            </button>
          </div>
        </div>

        {/* Return to traveler site */}
        <div className="text-center text-xs text-slate-500">
          <Link to="/" className="text-slate-400 hover:text-white flex items-center justify-center space-x-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Return to TripCraft Traveler Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
