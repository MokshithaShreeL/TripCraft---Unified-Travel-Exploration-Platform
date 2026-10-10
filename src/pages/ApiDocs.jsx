import React, { useState } from "react";
import { Code2, Key, Terminal, Copy, Check, Play, Shield, Globe } from "lucide-react";
import { DESTINATIONS, PACKAGES } from "../data/mockData";
import { apiService } from "../services/api";
import { useApp } from "../context/AppContext";

export default function ApiDocs() {
  const { addToast } = useApp();

  const [apiKey, setApiKey] = useState("tc_live_8f3a9d20c1e847_2026");
  const [copiedKey, setCopiedKey] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState("destinations");
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const endpoints = [
    {
      id: "destinations",
      method: "GET",
      path: "/api/v1/destinations",
      desc: "Retrieve all verified travel destinations with real-time weather and safety index scores."
    },
    {
      id: "packages",
      method: "GET",
      path: "/api/v1/packages",
      desc: "List curated tour packages complete with day-wise schedules and tiered group discounts."
    },
    {
      id: "safety",
      method: "GET",
      path: "/api/v1/safety-index/munnar",
      desc: "Audit women-safe rating, CCTV perimeter coverage, and police helpline radius."
    },
    {
      id: "pricing",
      method: "POST",
      path: "/api/v1/pricing/quote",
      desc: "Calculate dynamic seasonal multiplier, weekend surge, and 40% child discount rules."
    }
  ];

  const handleGenerateNewKey = () => {
    const newKeyObj = apiService.generateApiKey("Developer Sandbox");
    setApiKey(newKeyObj.key);
    addToast("New API Key generated successfully!", "success");
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    addToast("API Key copied to clipboard");
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleExecuteTest = () => {
    setIsLoading(true);
    setTimeout(() => {
      let data = {};
      if (selectedEndpoint === "destinations") {
        data = DESTINATIONS.slice(0, 2);
      } else if (selectedEndpoint === "packages") {
        data = PACKAGES.slice(0, 1);
      } else if (selectedEndpoint === "safety") {
        data = {
          destination: "Munnar, Kerala",
          safetyScore: 94,
          womenSafeScore: 92,
          policeStationRadiusKm: 2.8,
          verifiedAccommodationsRatio: "98%",
          emergencyNumbers: { police: "112", womenHelpline: "1091", touristHelpline: "1363" }
        };
      } else {
        data = {
          baseAdultPrice: 9999,
          multiplier: 1.25,
          peakSeasonApplied: true,
          adults: 2,
          children: 1,
          childDiscountPercent: 40,
          subtotal: 22498,
          gst12Percent: 2699,
          grandTotal: 25197
        };
      }

      setApiResponse({
        status: 200,
        statusText: "OK",
        latency: "118ms",
        timestamp: new Date().toISOString(),
        payload: data
      });
      setIsLoading(false);
      addToast("API response received (200 OK)", "success");
    }, 350);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
              Developer Ecosystem
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
              TripCraft REST API Platform
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Integrate verified Indian travel destinations, dynamic seasonal yield rates, solo safety indexes, and booking orchestration into third-party applications.
            </p>
          </div>

          {/* Key Generator Widget */}
          <div className="bg-navy-950 border border-slate-800 p-3 rounded-2xl flex items-center space-x-2 text-xs">
            <Key className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-mono text-slate-300 max-w-[150px] truncate">{apiKey}</span>
            <button
              onClick={handleCopyKey}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
              title="Copy Key"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleGenerateNewKey}
              className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded font-bold"
            >
              Rotate Key
            </button>
          </div>
        </div>

        {/* API Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Endpoints Menu */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Available Endpoints
            </h3>
            {endpoints.map((ep) => (
              <div
                key={ep.id}
                onClick={() => setSelectedEndpoint(ep.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedEndpoint === ep.id
                    ? "bg-navy-900 border-teal-500 shadow-md"
                    : "bg-navy-950 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                      ep.method === "GET"
                        ? "bg-teal-950 text-teal-400 border border-teal-800"
                        : "bg-amber-950 text-amber-400 border border-amber-800"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs font-bold text-white">{ep.path}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {ep.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Interactive Console */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-navy-950 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Interactive API Console
                  </span>
                </div>

                <button
                  onClick={handleExecuteTest}
                  disabled={isLoading}
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isLoading ? "Executing..." : "Send Request"}</span>
                </button>
              </div>

              {/* cURL Snippet */}
              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                  cURL Request:
                </label>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto">
                  curl -X {selectedEndpoint === "pricing" ? "POST" : "GET"} "https://api.tripcraft.io{endpoints.find(e => e.id === selectedEndpoint)?.path}" \<br />
                  &nbsp;&nbsp;-H "Authorization: Bearer {apiKey}" \<br />
                  &nbsp;&nbsp;-H "Content-Type: application/json"
                </div>
              </div>

              {/* Response Inspector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] text-slate-400 font-semibold">
                    Response Payload:
                  </label>
                  {apiResponse && (
                    <span className="text-[10px] text-emerald-400 font-mono">
                      Status: 200 OK • {apiResponse.latency}
                    </span>
                  )}
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl font-mono text-[11px] text-teal-300 max-h-80 overflow-y-auto">
                  {apiResponse ? (
                    <pre>{JSON.stringify(apiResponse.payload, null, 2)}</pre>
                  ) : (
                    <div className="text-slate-500 text-xs py-8 text-center font-sans">
                      Click "Send Request" to test this endpoint against the simulated REST backend.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
