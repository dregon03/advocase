import { bills } from "@/data/bills";
import { lobbyistRegistrations } from "@/data/lobbyists";
import Link from "next/link";

export default function DashboardPage() {
  const activeBills = bills.filter((b) => b.status !== "Royal Assent" && b.status !== "Lost");
  const passedBills = bills.filter((b) => b.status === "Royal Assent");
  const ministries = [...new Set(bills.map((b) => b.ministry).filter(Boolean))];
  const sectors = [...new Set(bills.flatMap((b) => b.sectors))];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
        <p className="text-slate-500 mt-1">Ontario legislative and lobbying intelligence at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Bills", value: bills.length, color: "text-slate-900" },
          { label: "Active Bills", value: activeBills.length, color: "text-blue-600" },
          { label: "Passed (Royal Assent)", value: passedBills.length, color: "text-green-600" },
          { label: "Lobbyist Registrations", value: lobbyistRegistrations.length, color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Active Bills */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Active Bills</h2>
            <Link href="/dashboard/bills" className="text-xs text-blue-600 font-medium hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {activeBills.slice(0, 5).map((b) => (
              <div key={b.number} className="px-5 py-3 hover:bg-slate-50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-slate-900">Bill {b.number}</span>
                    <span className="text-sm text-slate-500 ml-2">{b.shortTitle}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    b.status === "First Reading" ? "bg-yellow-50 text-yellow-700" :
                    b.status === "Second Reading" ? "bg-blue-50 text-blue-700" :
                    "bg-purple-50 text-purple-700"
                  }`}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Lobbying Activity */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Recent Lobbying Activity</h2>
            <Link href="/dashboard/lobbyists" className="text-xs text-blue-600 font-medium hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {lobbyistRegistrations.slice(0, 5).map((r, i) => (
              <div key={i} className="px-5 py-3 hover:bg-slate-50 transition">
                <div className="text-sm font-medium text-slate-900">{r.lobbyistName}</div>
                <div className="text-xs text-slate-500">{r.organization} → {r.lobbiedPerson}</div>
                <div className="text-xs text-slate-400 mt-0.5">{r.topic}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ministry & Sector breakdown */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900 mb-3">Ministries with Active Legislation</h2>
          <div className="flex flex-wrap gap-2">
            {ministries.map((m) => (
              <span key={m} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{m}</span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900 mb-3">Sectors Affected</h2>
          <div className="flex flex-wrap gap-2">
            {sectors.map((s) => (
              <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
