import React from 'react';
import { Compass, User } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex items-start space-x-2.5 ${isAssistant ? '' : 'flex-row-reverse space-x-reverse'}`}>
      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
        isAssistant ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-200'
      }`}>
        {isAssistant ? <Compass className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>
      <div className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed ${
        isAssistant
          ? 'bg-slate-900 border border-slate-800 text-slate-100'
          : 'bg-teal-600 text-white shadow-md'
      }`}>
        {message.content}
      </div>
    </div>
  );
}
