import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Compass,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Sparkles,
  MapPin
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { loginWithCredentials, registerUser, loginWithOAuth, quickSwitchUser, demoUsers, t } = useApp();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(() => localStorage.getItem("tripcraft_remembered_email") || "priya.backpacker@gmail.com");
  const [password, setPassword] = useState("Travel@123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem("tripcraft_remembered_email"));
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (rememberMe) {
        localStorage.setItem("tripcraft_remembered_email", email);
      } else {
        localStorage.removeItem("tripcraft_remembered_email");
      }

      if (isSignUp) {
        await registerUser(fullName || "Fellow Traveler", email, password);
      } else {
        await loginWithCredentials(email, password);
      }
      navigate("/");
    } catch (err) {
      // toast shown in context
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async () => {
    setIsLoading(true);
    try {
      await loginWithOAuth("google");
      navigate("/");
    } catch (err) {
      // toast handled
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (demoUser) => {
    quickSwitchUser(demoUser);
    navigate("/");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSubmitted(true);
    setTimeout(() => {
      setForgotSubmitted(false);
      setForgotModalOpen(false);
      setForgotEmail("");
    }, 2500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-slate-950 text-slate-100">
      
      {/* Left Panel: Desktop Travel Inspiration Split-Screen */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-navy-950 overflow-hidden border-r border-slate-800">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 scale-105 transition-transform duration-10000"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

        {/* Top Brand Tag */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold shadow-lg">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white">TripCraft</span>
            <span className="block text-[10px] uppercase font-bold text-teal-400 tracking-wider">
              Incredible Journeys
            </span>
          </div>
        </div>

        {/* Middle Value Proposition & Social Proof */}
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Authentic India</span>
          </div>

          <h2 className="text-4xl font-black text-white leading-tight">
            Craft Unforgettable Journeys Across Incredible India
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Experience hand-picked heritage resorts, verified solo safety scores, local storytelling guides, and custom travel keepsake albums.
          </p>

          {/* Testimonial Card */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md space-y-3">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-200 italic leading-relaxed">
              "TripCraft made our Munnar and Jaipur trip seamless. The transparent child discounts and verified local guide Rajesh gave us memories we will cherish forever."
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80"
                alt="Priya Sharma"
                className="w-8 h-8 rounded-full object-cover border border-teal-400/50"
              />
              <div>
                <div className="text-xs font-bold text-white">Priya Sharma</div>
                <div className="text-[10px] text-teal-400">Verified Traveler • Solo Explorer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-center">
          <div>
            <div className="text-xl font-black text-white">250,000+</div>
            <div className="text-[11px] text-slate-400">Happy Travelers</div>
          </div>
          <div>
            <div className="text-xl font-black text-teal-400">98.4%</div>
            <div className="text-[11px] text-slate-400">Satisfaction Score</div>
          </div>
          <div>
            <div className="text-xl font-black text-amber-400">100%</div>
            <div className="text-[11px] text-slate-400">Verified Stays</div>
          </div>
        </div>
      </div>

      {/* Right Panel: Clean Professional Login / Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isSignUp ? t("login.signUpTitle") : t("login.welcomeBack")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {isSignUp ? t("login.signUpSubtitle") : t("login.signInDesc")}
            </p>
          </div>

          {/* Social Google Login Button */}
          <button
            type="button"
            onClick={handleOAuth}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl text-xs font-bold text-white transition-all shadow-sm flex items-center justify-center space-x-3 cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{t("login.googleSignIn")}</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <span className="relative px-3 bg-slate-950 text-[11px] font-semibold text-slate-500 uppercase">
              {t("login.or")}
            </span>
          </div>

          {/* Login / Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isSignUp && (
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {t("login.fullNameLabel")}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t("login.emailLabel")}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("login.emailPlaceholder")}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-semibold">
                  {t("login.passwordLabel")}
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setForgotModalOpen(true);
                    }}
                    className="text-[11px] text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    {t("login.forgotPassword")}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("login.passwordPlaceholder")}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
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

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-300 font-medium">{t("login.rememberMe")}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold transition-all shadow-md shadow-teal-900/30 flex items-center justify-center space-x-2 cursor-pointer mt-2 disabled:opacity-50"
            >
              <span>{isLoading ? t("common.loading") : isSignUp ? t("login.signUpBtn") : t("login.signInBtn")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="text-center text-xs text-slate-400">
            <span>{isSignUp ? t("login.hasAccount") : t("login.noAccount")} </span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-teal-400 hover:text-teal-300 font-bold ml-1 transition-colors"
            >
              {isSignUp ? t("login.signInBtn") : t("login.createAccount")}
            </button>
          </div>

          {/* Convenient Demo Traveler Fast-Access (For Testing Convenience) */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 text-center uppercase tracking-wider">
              Quick One-Click Traveler Profiles
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo(demoUsers[1])}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition-all flex items-center space-x-2"
              >
                <img
                  src={demoUsers[1].avatar}
                  alt={demoUsers[1].name}
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">{demoUsers[1].name}</div>
                  <div className="text-[10px] text-teal-400">Solo Traveler</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo(demoUsers[2])}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition-all flex items-center space-x-2"
              >
                <img
                  src={demoUsers[2].avatar}
                  alt={demoUsers[2].name}
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">{demoUsers[2].name}</div>
                  <div className="text-[10px] text-teal-400">Family Travelers</div>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 space-y-4 text-slate-100 shadow-2xl">
            <h3 className="text-base font-bold text-white">Reset Password</h3>
            <p className="text-xs text-slate-400">
              Enter your registered email address to receive password reset instructions.
            </p>

            {forgotSubmitted ? (
              <div className="p-3 bg-teal-500/20 border border-teal-500/40 rounded-xl text-teal-300 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-400" />
                <span>{t("login.resetSent")}</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-3 text-xs">
                <div>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-slate-300"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 font-bold text-white"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
