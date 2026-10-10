import React, { useState, useEffect, useRef } from 'react';
import { Compass, X, Sparkles, Globe } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import api from '../../utils/api';
import { useLang } from '../../context/LangContext';

export default function ChatWindow({ isOpen, onClose }) {
  const { lang, setLang } = useLang();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am TripCraft AI, your intelligent travel companion. I can help plan itineraries, compare stays, check solo safety, or estimate budgets. How can I help today?'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text) => {
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await api.post('/chatbot/message', {
        message: text,
        language: lang
      });

      if (res && res.success && res.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: res.reply }]);
      } else {
        // Fallback intelligent response
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `TripCraft AI: ${text.includes('munnar') ? 'Munnar has rolling tea valleys and Kolukkumalai sunrise treks. Best visited Sep-Mar!' : 'I can help find the perfect hotel, package, or safety score for your journey. Where are you heading?'}`
          }
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'TripCraft AI is ready to assist you. Explore our verified destinations and stays!' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 w-[90vw] sm:w-96 h-[500px] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
      {/* Header */}
      <div className="p-3.5 bg-navy-950 border-b border-slate-800 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold">TripCraft Claude AI</div>
            <div className="text-[10px] text-teal-400">Multilingual Travel Advisor</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-slate-800 text-slate-300 rounded px-1.5 py-0.5 text-[10px] border border-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="ta">தமிழ்</option>
            <option value="hi">हिन्दी</option>
          </select>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
        {messages.map((m, idx) => (
          <ChatMessage key={idx} message={m} />
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-xs text-slate-400 p-2">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></div>
            <span>TripCraft AI is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
