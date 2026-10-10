import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, Shield, Compass, PhoneCall } from "lucide-react";
import { DESTINATIONS, PACKAGES } from "../../data/mockData";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "bot_init",
      sender: "bot",
      text: "Namaste! I am TripCraft AI Concierge. How can I assist your journey across India today?",
      quickSuggestions: [
        "Munnar Solo Safety Score",
        "Best Family Packages",
        "How Dynamic Pricing Works",
        "Emergency Contacts"
      ]
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend = input) => {
    const query = (textToSend || "").trim();
    if (!query) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Generate intelligent contextual response
    setTimeout(() => {
      let replyText = "";
      const lower = query.toLowerCase();

      if (lower.includes("munnar") && lower.includes("safe")) {
        replyText = "Munnar holds a verified Solo Safety Index of 94/100 and Women-Safe score of 92/100. It offers 24/7 monitored tea plantation resorts, verified KTDC jeep drivers, and a local police station within 3 km of the town center.";
      } else if (lower.includes("safety") || lower.includes("emergency") || lower.includes("women")) {
        replyText = "TripCraft Emergency Directory: All-India Police: 112 | Women Helpline: 1091 | Medical Ambulance: 108 | National Tourist Helpline: 1363 (24x7 multi-lingual). TripCraft stays are vetted for round-the-clock reception and CCTV perimeter protection.";
      } else if (lower.includes("pricing") || lower.includes("child") || lower.includes("discount")) {
        replyText = "Our Dynamic Pricing Engine incorporates seasonal trends: Weekend bookings (Fri-Sun) carry a 15% surge, while peak months (Oct-Feb) add 25%. Children aged 2–11 receive a verified 40% discount (charged at 60% of adult base fare), and groups of 4+ travelers get an instant 10% package discount.";
      } else if (lower.includes("family") || lower.includes("package")) {
        replyText = "For families, we highly recommend the 'Munnar Misty Highland Trails' (4D/3N at ₹12,499) and 'Jaipur Royal Forts & Culinary Splendor' (3D/2N at ₹9,999). Both feature child-friendly amenities, heated pools, and private chauffeur AC transportation.";
      } else if (lower.includes("album") || lower.includes("photo") || lower.includes("earn")) {
        replyText = "With TripCraft Photo Album Studio (/album), you can create multi-page curated visual guides from your high-res photos, set a retail price in INR, and sell on the marketplace. You earn 85% net royalties per copy directly to your wallet!";
      } else if (lower.includes("cancel") || lower.includes("refund")) {
        replyText = "Cancellations made 72+ hours prior to travel receive a 100% full refund with zero processing fees. Cancellations between 24-72 hours receive an 80% refund. Refunds are credited to original payment source within 24 hours.";
      } else if (lower.includes("jaipur") || lower.includes("ladakh") || lower.includes("andaman")) {
        replyText = "All our destinations (Jaipur, Ladakh, Havelock, Munnar, South Goa, Hampi, Varanasi) feature 100% authentic real-world itineraries with verified hotel partners and licensed tour guides.";
      } else {
        replyText = `Thank you for asking about "${query}". You can book instant packages, hotels, flights, or solo trips directly via our interactive booking modal. Feel free to browse our Destinations or Solo Hub!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: "bot",
          text: replyText
        }
      ]);
    }, 450);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Closed Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center space-x-2 border border-teal-400/40"
        >
          <Bot className="w-6 h-6 stroke-[2.2]" />
          <span className="text-xs font-bold hidden sm:inline">TripCraft AI</span>
        </button>
      )}

      {/* Open Chat Widget Window */}
      {isOpen && (
        <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col h-[480px] overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-navy-950 p-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <span>TripCraft Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h4>
                <p className="text-[10px] text-teal-300">
                  AI Travel Specialist & Safety Concierge
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-950/60 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-teal-600 text-white font-medium rounded-br-none shadow-md"
                      : "bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm"
                  }`}
                >
                  {m.text}
                </div>

                {/* Quick suggestion pills if available */}
                {m.quickSuggestions && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.quickSuggestions.map((qs, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(qs)}
                        className="bg-navy-800 hover:bg-teal-900/60 text-teal-300 border border-teal-500/30 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors"
                      >
                        {qs}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-navy-950 border-t border-slate-800 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about destinations, pricing, safety..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white p-2 rounded-lg transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
