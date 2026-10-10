import React, { useState } from "react";
import { PieChart, Plus, AlertTriangle, CheckCircle2, DollarSign, Wallet, Shield } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../utils/pricing";

export default function Budget() {
  const { currency, addToast, t } = useApp();

  const [totalBudget, setTotalBudget] = useState(50000);

  // 40/25/20/15 Rule allocations
  const alloc = {
    stay: Math.round(totalBudget * 0.40),
    transit: Math.round(totalBudget * 0.25),
    food: Math.round(totalBudget * 0.20),
    buffer: Math.round(totalBudget * 0.15)
  };

  const [expenses, setExpenses] = useState([
    { id: "exp_1", title: "Tea County Resort (2 Nights)", category: "stay", amount: 10800 },
    { id: "exp_2", title: "IndiGo Flight DEL-COK Return", category: "transit", amount: 11700 },
    { id: "exp_3", title: "Kolukkumalai Sunrise 4x4 Cab", category: "transit", amount: 2500 },
    { id: "exp_4", title: "Plantation Spice Lunch & Dinners", category: "food", amount: 3200 },
    { id: "exp_5", title: "Cardamom & Homemade Chocolates", category: "buffer", amount: 1500 }
  ]);

  const [newExpTitle, setNewExpTitle] = useState("");
  const [newExpCategory, setNewExpCategory] = useState("stay");
  const [newExpAmount, setNewExpAmount] = useState(1000);

  // Spent totals
  const spentByCategory = {
    stay: expenses.filter((e) => e.category === "stay").reduce((a, c) => a + c.amount, 0),
    transit: expenses.filter((e) => e.category === "transit").reduce((a, c) => a + c.amount, 0),
    food: expenses.filter((e) => e.category === "food").reduce((a, c) => a + c.amount, 0),
    buffer: expenses.filter((e) => e.category === "buffer").reduce((a, c) => a + c.amount, 0)
  };

  const totalSpent = Object.values(spentByCategory).reduce((a, c) => a + c, 0);
  const remainingBudget = totalBudget - totalSpent;

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpTitle.trim() || newExpAmount <= 0) return;

    const newExp = {
      id: `exp_${Date.now()}`,
      title: newExpTitle,
      category: newExpCategory,
      amount: Number(newExpAmount)
    };

    setExpenses((prev) => [...prev, newExp]);
    setNewExpTitle("");
    setNewExpAmount(1000);
    addToast("Expense logged successfully!", "success");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
              {t("budget.title") || "Smart Financial Allocation"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
              {t("nav.budget") || "40/25/20/15 Travel Budget Engine"}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              {t("budget.subtitle") || "Golden ratio travel budgeting: 40% Stays, 25% Transit, 20% Food & Culture, and 15% Emergency Buffer."}
            </p>
          </div>

          <div className="bg-navy-950 border border-slate-800 p-3 rounded-2xl flex items-center space-x-3">
            <span className="text-xs text-slate-400 font-semibold">Total Trip Budget:</span>
            <input
              type="number"
              value={totalBudget}
              step={1000}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-bold w-32"
            />
          </div>
        </div>

        {/* 4 Pillars Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key: "stay", label: "40% Stays & Resorts", target: alloc.stay, spent: spentByCategory.stay, color: "teal" },
            { key: "transit", label: "25% Flights & Cabs", target: alloc.transit, spent: spentByCategory.transit, color: "sky" },
            { key: "food", label: "20% Food & Dining", target: alloc.food, spent: spentByCategory.food, color: "amber" },
            { key: "buffer", label: "15% Emergency & Buffer", target: alloc.buffer, spent: spentByCategory.buffer, color: "emerald" },
          ].map((cat) => {
            const pct = Math.min(100, Math.round((cat.spent / cat.target) * 100));
            const isOver = cat.spent > cat.target;

            return (
              <div key={cat.key} className="bg-navy-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{cat.label}</span>
                  <span className={`font-mono text-[11px] font-bold ${isOver ? "text-rose-400" : "text-teal-400"}`}>
                    {pct}%
                  </span>
                </div>

                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${isOver ? "bg-rose-500" : "bg-teal-500"}`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <span>Spent: <strong className="text-white">{formatCurrency(cat.spent, currency)}</strong></span>
                  <span>Cap: {formatCurrency(cat.target, currency)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Logger & Expense Ledger Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Expense History */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-navy-950 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white">Expense Ledger ({expenses.length} records)</h3>
                <div className="text-xs text-slate-400">
                  Total Spent: <strong className="text-teal-400">{formatCurrency(totalSpent, currency)}</strong> / Remaining: <strong className="text-white">{formatCurrency(remainingBudget, currency)}</strong>
                </div>
              </div>

              <div className="divide-y divide-slate-800/80">
                {expenses.map((exp) => (
                  <div key={exp.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{exp.title}</div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded mt-0.5 inline-block">
                        {exp.category}
                      </span>
                    </div>
                    <div className="font-bold text-teal-400">
                      {formatCurrency(exp.amount, currency)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Add Expense Form */}
          <div className="bg-navy-950 border border-slate-800 rounded-3xl p-6 space-y-4 h-fit">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Plus className="w-4 h-4 text-teal-400" />
              <span>Log Travel Expense</span>
            </h3>

            <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Expense Description</label>
                <input
                  type="text"
                  value={newExpTitle}
                  onChange={(e) => setNewExpTitle(e.target.value)}
                  placeholder="e.g. Scuba Dive at Havelock"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category (40/25/20/15)</label>
                <select
                  value={newExpCategory}
                  onChange={(e) => setNewExpCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="stay">Stays & Resorts (40%)</option>
                  <option value="transit">Flights & Cabs (25%)</option>
                  <option value="food">Food & Culture (20%)</option>
                  <option value="buffer">Emergency & Buffer (15%)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Amount (INR)</label>
                <input
                  type="number"
                  value={newExpAmount}
                  onChange={(e) => setNewExpAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold transition-all shadow-md mt-2"
              >
                Save Expense
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
