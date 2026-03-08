import { clientWorkspaces } from "@/data/clients";
import { bills } from "@/data/bills";
import Link from "next/link";

export default function ClientsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Client Workspaces</h1>
          <p className="text-slate-500 mt-1">Auto-surfaced bills, lobbyists, and officials based on client interests.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          + Add Client
        </button>
      </div>

      <div className="space-y-6">
        {clientWorkspaces.map((c) => {
          const watched = bills.filter((b) => c.watchedBills.includes(b.number));
          const activeBills = watched.filter((b) => b.status !== "Royal Assent" && b.status !== "Lost");
          const riskBills = watched.filter((b) => b.status !== "Royal Assent" && b.status !== "Lost");

          return (
            <div key={c.name} className="bg-white rounded-xl border border-slate-200 p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-slate-900">{c.name}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      c.riskLevel === "High" ? "bg-red-50 text-red-700" :
                      c.riskLevel === "Medium" ? "bg-yellow-50 text-yellow-700" :
                      "bg-green-50 text-green-700"
                    }`}>{c.riskLevel} Risk</span>
                  </div>
                  <div className="text-sm text-slate-500">{c.industry}</div>
                </div>
                <div className="flex gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-slate-900">{watched.length}</div>
                    <div className="text-xs text-slate-400">Watched Bills</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-600">{activeBills.length}</div>
                    <div className="text-xs text-slate-400">Active</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-600">{c.activeLobbyists.length}</div>
                    <div className="text-xs text-slate-400">Lobbyists</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-orange-600">{c.competitors.length}</div>
                    <div className="text-xs text-slate-400">Competitors</div>
                  </div>
                </div>
              </div>

              {/* Sectors */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-slate-400 font-medium">Sectors:</span>
                {c.sectors.map((s) => (
                  <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>

              {/* Key Officials */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-slate-400 font-medium">Key Officials:</span>
                {c.keyOfficials.map((o) => (
                  <span key={o} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{o}</span>
                ))}
              </div>

              {/* Competitors */}
              {c.competitors.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-slate-400 font-medium">Competitors Active:</span>
                  {c.competitors.map((comp) => (
                    <span key={comp} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">{comp}</span>
                  ))}
                </div>
              )}

              {/* Active Lobbyists */}
              {c.activeLobbyists.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-slate-400 font-medium">Active Lobbyists:</span>
                  {c.activeLobbyists.map((l) => (
                    <span key={l} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{l}</span>
                  ))}
                </div>
              )}

              {/* AI Notes */}
              <div className="bg-slate-50 rounded-lg p-4 mt-3 mb-3">
                <div className="text-xs text-slate-400 font-medium mb-1">AI Analysis</div>
                <p className="text-sm text-slate-600">{c.notes}</p>
              </div>

              {/* Watched Bills */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs text-slate-400 font-medium mb-2">Watched Bills:</div>
                <div className="flex flex-wrap gap-2">
                  {watched.map((b) => (
                    <Link key={b.number} href={`/dashboard/bills/${b.number}`}
                      className="text-xs bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:border-blue-300 transition">
                      <span className="font-medium">Bill {b.number}</span>
                      <span className="text-slate-400 ml-1">— {b.shortTitle}</span>
                      <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                        b.status === "Royal Assent" ? "bg-green-50 text-green-600" :
                        b.status === "Lost" ? "bg-red-50 text-red-600" :
                        "bg-yellow-50 text-yellow-600"
                      }`}>{b.status}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
