import { lobbyistRegistrations } from "@/data/lobbyists";
import { bills } from "@/data/bills";

// Build competitive landscape by topic
function getCompetitiveLandscape() {
  const topics: Record<string, {
    topic: string;
    orgs: { name: string; type: string; lobbyist: string; official: string; detail: string }[];
    relatedBills: typeof bills;
  }> = {};

  lobbyistRegistrations.forEach((r) => {
    if (!topics[r.subjectMatter]) {
      topics[r.subjectMatter] = { topic: r.subjectMatter, orgs: [], relatedBills: [] };
    }
    topics[r.subjectMatter].orgs.push({
      name: r.organization,
      type: r.type,
      lobbyist: r.lobbyistName,
      official: r.lobbiedPerson,
      detail: r.topic,
    });
  });

  // Match bills to topics
  Object.values(topics).forEach((t) => {
    t.relatedBills = bills.filter((b) =>
      b.sectors.some((s) => s.toLowerCase().includes(t.topic.toLowerCase()) || t.topic.toLowerCase().includes(s.toLowerCase()))
    );
  });

  return Object.values(topics).sort((a, b) => b.orgs.length - a.orgs.length);
}

export default function CompetitivePage() {
  const landscape = getCompetitiveLandscape();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Competitive Intelligence</h1>
        <p className="text-slate-500 mt-1">See who else is lobbying in each policy space — and what they are asking for.</p>
      </div>

      <div className="space-y-6">
        {landscape.map((t) => (
          <div key={t.topic} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">{t.topic}</h2>
                <div className="text-xs text-slate-400 mt-0.5">{t.orgs.length} organization{t.orgs.length > 1 ? "s" : ""} active — {t.relatedBills.length} related bill{t.relatedBills.length !== 1 ? "s" : ""}</div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                t.orgs.length >= 3 ? "bg-red-50 text-red-700" :
                t.orgs.length >= 2 ? "bg-orange-50 text-orange-700" :
                "bg-green-50 text-green-700"
              }`}>
                {t.orgs.length >= 3 ? "Crowded" : t.orgs.length >= 2 ? "Competitive" : "Open Space"}
              </span>
            </div>

            {/* Active organizations */}
            <div className="divide-y divide-slate-100">
              {t.orgs.map((org, i) => (
                <div key={i} className="px-5 py-4 hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-900">{org.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        org.type === "Consultant" ? "bg-purple-50 text-purple-700" :
                        org.type === "In-house" ? "bg-green-50 text-green-700" :
                        "bg-blue-50 text-blue-700"
                      }`}>{org.type}</span>
                    </div>
                    <span className="text-xs text-slate-400">→ {org.official}</span>
                  </div>
                  <div className="text-xs text-slate-500">Lobbyist: {org.lobbyist}</div>
                  <div className="text-xs text-slate-400 mt-0.5">Position: {org.detail}</div>
                </div>
              ))}
            </div>

            {/* Related Bills */}
            {t.relatedBills.length > 0 && (
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
                <span className="text-xs text-slate-400 font-medium">Related Bills: </span>
                {t.relatedBills.map((b) => (
                  <span key={b.number} className={`text-xs px-2 py-0.5 rounded-full font-medium mr-1 ${
                    b.status === "Royal Assent" ? "bg-green-50 text-green-700" :
                    b.status === "Lost" ? "bg-red-50 text-red-700" :
                    "bg-yellow-50 text-yellow-700"
                  }`}>Bill {b.number}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
