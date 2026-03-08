import { stakeholders } from "@/data/stakeholders";
import { bills } from "@/data/bills";
import Link from "next/link";

export default function StakeholdersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Stakeholder Profiles</h1>
        <p className="text-slate-500 mt-1">MPPs, Ministers, and Officials — bills sponsored, lobbying received, and influence mapping.</p>
      </div>

      <div className="space-y-4">
        {stakeholders.map((s) => {
          const sponsored = bills.filter((b) => s.billsSponsored.includes(b.number));
          return (
            <div key={s.name} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-200 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-slate-900">{s.name}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      s.party === "PC" ? "bg-blue-50 text-blue-700" :
                      s.party === "NDP" ? "bg-orange-50 text-orange-700" :
                      s.party === "LIB" ? "bg-red-50 text-red-700" :
                      "bg-green-50 text-green-700"
                    }`}>{s.party}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      s.influence === "Very High" ? "bg-red-50 text-red-600" :
                      s.influence === "High" ? "bg-orange-50 text-orange-600" :
                      "bg-slate-100 text-slate-500"
                    }`}>{s.influence} Influence</span>
                  </div>
                  <div className="text-sm text-slate-500">{s.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.ministry}{s.riding ? ` — ${s.riding}` : ""}</div>
                </div>
                <div className="flex gap-6 text-center">
                  <div>
                    <div className="text-xl font-bold text-slate-900">{s.billsSponsored.length}</div>
                    <div className="text-xs text-slate-400">Bills Sponsored</div>
                  </div>
                  <div>
                    <div className={`text-xl font-bold ${s.lobbyingReceived > 2 ? "text-red-600" : s.lobbyingReceived > 0 ? "text-orange-600" : "text-slate-400"}`}>
                      {s.lobbyingReceived}
                    </div>
                    <div className="text-xs text-slate-400">Lobbying Received</div>
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-slate-400 font-medium">Active Topics:</span>
                {s.topTopics.map((t) => (
                  <span key={t} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>

              {/* Sponsored Bills */}
              {sponsored.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-xs text-slate-400 font-medium mb-2">Bills Sponsored:</div>
                  <div className="flex flex-wrap gap-2">
                    {sponsored.map((b) => (
                      <Link key={b.number} href={`/dashboard/bills/${b.number}`}
                        className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:border-blue-300 transition">
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
              )}

              {s.lastContact && (
                <div className="mt-3 text-xs text-slate-400">Last contact: {s.lastContact}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
