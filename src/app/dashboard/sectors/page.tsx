import { sectors } from "@/data/sectors";
import { bills } from "@/data/bills";
import Link from "next/link";

export default function SectorsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Sector Intelligence</h1>
        <p className="text-slate-500 mt-1">Legislative and lobbying landscape by industry sector.</p>
      </div>

      <div className="space-y-4">
        {sectors.map((s) => {
          const sectorBills = bills.filter((b) => s.bills.includes(b.number));
          const activeBills = sectorBills.filter((b) => b.status !== "Royal Assent" && b.status !== "Lost");
          const passedBills = sectorBills.filter((b) => b.status === "Royal Assent");

          return (
            <div key={s.name} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-200 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-slate-900">{s.name}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      s.heatLevel === "Hot" ? "bg-red-50 text-red-700" :
                      s.heatLevel === "Warm" ? "bg-orange-50 text-orange-700" :
                      "bg-slate-100 text-slate-500"
                    }`}>{s.heatLevel}</span>
                  </div>
                  <p className="text-sm text-slate-500">{s.recentActivity}</p>
                </div>
                <div className="flex gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-slate-900">{sectorBills.length}</div>
                    <div className="text-xs text-slate-400">Bills</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-600">{activeBills.length}</div>
                    <div className="text-xs text-slate-400">Active</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-600">{passedBills.length}</div>
                    <div className="text-xs text-slate-400">Passed</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-600">{s.activeLobbyists}</div>
                    <div className="text-xs text-slate-400">Lobbyists</div>
                  </div>
                </div>
              </div>

              {/* Key Officials */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-slate-400 font-medium">Key Officials:</span>
                {s.keyOfficials.map((o) => (
                  <span key={o} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{o}</span>
                ))}
              </div>

              {/* Active Orgs */}
              {s.topOrgs.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-slate-400 font-medium">Active Lobbying Orgs:</span>
                  {s.topOrgs.map((o) => (
                    <span key={o} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{o}</span>
                  ))}
                </div>
              )}

              {/* Bills list */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
                {sectorBills.map((b) => (
                  <Link key={b.number} href={`/dashboard/bills/${b.number}`}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition hover:ring-2 hover:ring-blue-300 ${
                      b.status === "Royal Assent" ? "bg-green-50 text-green-700" :
                      b.status === "Lost" ? "bg-red-50 text-red-700" :
                      "bg-yellow-50 text-yellow-700"
                    }`}>
                    Bill {b.number}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
