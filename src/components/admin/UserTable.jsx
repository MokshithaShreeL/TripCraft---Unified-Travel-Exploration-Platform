import React from 'react';
import { User, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

export default function UserTable({ users, onToggleStatus }) {
  if (!users || users.length === 0) {
    return <div className="text-xs text-slate-500 py-4 text-center">No registered users</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
          <tr>
            <th className="py-3 px-4">User</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Language</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
              <td className="py-3 px-4 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-teal-400 font-bold shrink-0">
                  {u.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div className="font-semibold text-white">{u.name}</div>
                  <div className="text-[11px] text-slate-400">{u.email}</div>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  u.role === 'admin' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                }`}>
                  {u.role}
                </span>
              </td>
              <td className="py-3 px-4 uppercase font-mono text-slate-300">{u.language || 'en'}</td>
              <td className="py-3 px-4">
                <span className={`flex items-center space-x-1 text-[11px] ${
                  u.is_active !== false ? 'text-teal-400' : 'text-rose-400'
                }`}>
                  {u.is_active !== false ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  <span>{u.is_active !== false ? 'Active' : 'Disabled'}</span>
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <button
                  onClick={() => onToggleStatus && onToggleStatus(u.id)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-semibold cursor-pointer"
                >
                  {u.is_active !== false ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
