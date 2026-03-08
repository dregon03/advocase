import { timelineEvents } from "@/data/timeline";
import Link from "next/link";

const typeConfig: Record<string, { color: string; label: string }> = {
  bill_introduced: { color: "bg-blue-500", label: "Bill Introduced" },
  bill_passed: { color: "bg-green-500", label: "Bill Passed" },
  bill_reading: { color: "bg-yellow-500", label: "Reading" },
  bill_lost: { color: "bg-red-500", label: "Bill Lost" },
  lobbying_registered: { color: "bg-purple-500", label: "Lobbying Registration" },
  lobbying_meeting: { color: "bg-indigo-500", label: "Lobbying Meeting" },
};

export default function TimelinePage() {
  // Group events by month
  const grouped: Record<string, typeof timelineEvents> = {};
  timelineEvents.forEach((e) => {
    const month = e.date.substring(0, 7); // YYYY-MM
    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(e);
  });

  const months = Object.keys(grouped).sort().reverse();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Activity Timeline</h1>
        <p className="text-slate-500 mt-1">Chronological feed of legislative and lobbying activity in Ontario.</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(typeConfig).map(([key, conf]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${conf.color}`} />
            <span className="text-xs text-slate-500">{conf.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {months.map((month) => {
          const d = new Date(month + "-01");
          const label = d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
          return (
            <div key={month}>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{label}</h2>
              <div className="space-y-3">
                {grouped[month].map((e, i) => {
                  const conf = typeConfig[e.type];
                  return (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-200 transition">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center pt-1">
                          <div className={`w-3 h-3 rounded-full ${conf.color}`} />
                          <div className="w-px h-full bg-slate-200 mt-1" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-slate-900">{e.title}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${conf.color.replace("bg-", "bg-").replace("500", "50")} ${conf.color.replace("bg-", "text-").replace("500", "700")}`}>
                              {conf.label}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500">{e.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-slate-400">{e.date}</span>
                            {e.sector && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{e.sector}</span>}
                            {e.relatedBill && (
                              <Link href={`/dashboard/bills/${e.relatedBill}`} className="text-xs text-blue-600 hover:underline">
                                Bill {e.relatedBill}
                              </Link>
                            )}
                            {e.relatedLobbyist && <span className="text-xs text-purple-600">{e.relatedLobbyist}</span>}
                            {e.relatedOfficial && <span className="text-xs text-slate-500">→ {e.relatedOfficial}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
