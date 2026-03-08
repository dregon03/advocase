import { committees } from "@/data/committees";
import { bills } from "@/data/bills";

export default function CommitteesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Committee Intelligence</h1>
        <p className="text-slate-500 mt-1">8 standing committees — members, scheduled meetings, current business, and transcripts.</p>
      </div>

      <div className="space-y-6">
        {committees.map((c) => (
          <div key={c.slug} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">{c.name}</h2>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Chair: {c.chair}
                    <span className={`ml-2 px-2 py-0.5 rounded-full font-medium ${
                      c.chairParty === "PC" ? "bg-blue-50 text-blue-700" :
                      c.chairParty === "NDP" ? "bg-orange-50 text-orange-700" :
                      c.chairParty === "LIB" ? "bg-red-50 text-red-700" :
                      "bg-green-50 text-green-700"
                    }`}>{c.chairParty}</span>
                  </div>
                </div>
                <div className="flex gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold text-slate-900">{c.members.length}</div>
                    <div className="text-xs text-slate-400">Members</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{c.upcomingMeetings.length}</div>
                    <div className="text-xs text-slate-400">Upcoming</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">{c.currentBusiness.length}</div>
                    <div className="text-xs text-slate-400">Active Items</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-3 gap-5">
                {/* Members */}
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Members</div>
                  <div className="space-y-1">
                    {c.members.map((m) => (
                      <div key={m.name} className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          m.party === "PC" ? "bg-blue-500" :
                          m.party === "NDP" ? "bg-orange-500" :
                          m.party === "LIB" ? "bg-red-500" :
                          "bg-green-500"
                        }`} />
                        <span className="text-sm text-slate-700">{m.name}</span>
                        {m.name === c.chair && <span className="text-xs text-slate-400">(Chair)</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Business */}
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Current Business</div>
                  <div className="space-y-2">
                    {c.currentBusiness.map((b, i) => (
                      <div key={i} className="text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2">{b}</div>
                    ))}
                    {c.currentBusiness.length === 0 && (
                      <div className="text-sm text-slate-400 italic">No active business</div>
                    )}
                  </div>
                </div>

                {/* Upcoming Meetings */}
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Upcoming Meetings</div>
                  <div className="space-y-2">
                    {c.upcomingMeetings.map((m, i) => (
                      <div key={i} className="bg-blue-50 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-blue-700">{m.date}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                            m.type === "Hearing" ? "bg-yellow-100 text-yellow-700" :
                            m.type === "Clause-by-Clause" ? "bg-purple-100 text-purple-700" :
                            m.type === "Presentation" ? "bg-green-100 text-green-700" :
                            "bg-slate-100 text-slate-600"
                          }`}>{m.type}</span>
                        </div>
                        <div className="text-xs text-blue-600 mt-0.5">{m.topic}</div>
                      </div>
                    ))}
                    {c.upcomingMeetings.length === 0 && (
                      <div className="text-sm text-slate-400 italic">No scheduled meetings</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Transcripts */}
              {c.recentTranscripts.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Recent Transcripts</div>
                  <div className="flex flex-wrap gap-2">
                    {c.recentTranscripts.map((t, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg">
                        {t.date} — {t.topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
