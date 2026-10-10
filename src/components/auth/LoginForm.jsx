import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import GoogleButton from './GoogleButton';

export default function LoginForm({ onSuccess }) {
  const { login, loginWithGoogle, quickLogin, testUsers } = useAuth();
  const [email, setEmail] = useState('priya@example.com');
  const [password, setPassword] = useState('Test@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      if (onSuccess) onSuccess(res.user);
    } else {
      setError(res.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const res = await loginWithGoogle();
    setLoading(false);
    if (res.success && onSuccess) onSuccess(res.user);
  };

  return (
    <div className="space-y-6">
      {/* 5 Mandatory Demo Accounts Shortcut Panel */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pre-Seeded 5 Test Accounts</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Password: Test@123</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {testUsers.slice(0, 5).map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => {
                setEmail(u.email);
                setPassword(u.password);
                quickLogin(u);
                if (onSuccess) onSuccess(u);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/40 text-left transition-all text-xs cursor-pointer group"
            >
              <div className="font-semibold text-white group-hover:text-teal-300 truncate">{u.name}</div>
              <div className="text-[10px] text-slate-500 truncate">{u.email.split('@')[0]}</div>
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              const admin = testUsers.find(u => u.role === 'admin');
              if (admin) {
                setEmail(admin.email);
                setPassword(admin.password);
                quickLogin(admin);
                if (onSuccess) onSuccess(admin);
              }
            }}
            className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left transition-all text-xs cursor-pointer"
          >
            <div className="font-bold text-amber-300 truncate">Admin Portal</div>
            <div className="text-[10px] text-amber-400/70 truncate">Admin@123456</div>
          </button>
        </div>
      </div>

      <GoogleButton onClick={handleGoogle} text="Continue with Google Account" />

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-800 w-full"></div>
        <span className="bg-slate-900 px-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold shrink-0">
          or sign in with credentials
        </span>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. priya@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-teal-900/30 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
        >
          <LogIn className="w-4 h-4" />
          <span>{loading ? 'Authenticating...' : 'Sign In to TripCraft'}</span>
        </button>
      </form>
    </div>
  );
}
