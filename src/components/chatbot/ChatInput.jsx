import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 flex items-center space-x-2 bg-navy-950/80">
      <input
        type="text"
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask anything in English, Tamil (தமிழ்), or Hindi (हिन्दी)..."
        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="p-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-30 text-white rounded-xl transition-colors cursor-pointer"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
