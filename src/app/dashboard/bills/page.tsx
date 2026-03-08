"use client";

import { useState } from "react";
import { bills } from "@/data/bills";
import Link from "next/link";

const statusOptions = ["All", "First Reading", "Second Reading", "Third Reading", "Royal Assent", "Lost"] as const;
const typeOptions = ["All", "Government", "Private Member"] as const;

export default function BillsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = bills.filter((b) => {
    if (statusFilter !== "All" && b.status !== statusFilter) return false;
    if (typeFilter !== "All" && b.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.shortTitle.toLowerCase().includes(q) ||
        b.sponsors.some((s) => s.toLowerCase().includes(q)) ||
        b.sectors.some((s) => s.toLowerCase().includes(q)) ||
        (b.ministry && b.ministry.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Ontario Bills — 44th Parliament</h1>
        <p className="text-slate-500 mt-1">Track legislation through the Ontario Legislative Assembly.</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search bills, sponsors, sectors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {typeOptions.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Summary */}
      <div className="flex gap-3 mb-6">
        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">
          {filtered.length} bills
        </span>
        <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
          {filtered.filter((b) => b.status === "Royal Assent").length} passed
        </span>
        <span className="text-xs bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full font-medium">
          {filtered.filter((b) => b.status === "First Reading").length} at first reading
        </span>
        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
          {filtered.filter((b) => b.type === "Government").length} government bills
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 w-20">Bill</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Title</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Sponsor</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Type</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Sectors</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.number} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition cursor-pointer" onClick={() => window.location.href = `/dashboard/bills/${b.number}`}>
                <td className="px-5 py-4 text-sm font-bold text-blue-600"><Link href={`/dashboard/bills/${b.number}`}>{b.number}</Link></td>
                <td className="px-5 py-4">
                  <div className="text-sm font-medium text-slate-900">{b.shortTitle}</div>
                  {b.ministry && <div className="text-xs text-slate-400 mt-0.5">{b.ministry}</div>}
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{b.sponsors[0]}{b.sponsors.length > 1 && ` +${b.sponsors.length - 1}`}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    b.type === "Government" ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-600"
                  }`}>{b.type}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    b.status === "Royal Assent" ? "bg-green-50 text-green-700" :
                    b.status === "First Reading" ? "bg-yellow-50 text-yellow-700" :
                    b.status === "Second Reading" ? "bg-blue-50 text-blue-700" :
                    b.status === "Third Reading" ? "bg-purple-50 text-purple-700" :
                    "bg-red-50 text-red-700"
                  }`}>{b.status}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {b.sectors.slice(0, 2).map((s) => (
                      <span key={s} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                    {b.sectors.length > 2 && <span className="text-xs text-slate-400">+{b.sectors.length - 2}</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
