import { bills } from "@/data/bills";
import { lobbyistRegistrations } from "@/data/lobbyists";
import { clientWorkspaces } from "@/data/clients";
import { sectors } from "@/data/sectors";
import { timelineEvents } from "@/data/timeline";
import Link from "next/link";

// Demo client for POC
const client = clientWorkspaces[0]; // Brookfield Properties

// Sector synonym map — maps OICO subject matters to our sector tags
const sectorAliases: Record<string, string[]> = {
  "Housing": ["housing", "municipal affairs", "real estate"],
  "Construction": ["housing", "municipal affairs", "infrastructure", "construction"],
  "Municipal Government": ["municipal affairs", "municipal government"],
};

// Check if a term matches any of the client's sectors (using aliases)
function matchesClientSectors(term: string): boolean {
  const t = term.toLowerCase();
  return client.sectors.some((cs) => {
    const aliases = sectorAliases[cs] || [cs.toLowerCase()];
    return aliases.some((a) => t.includes(a) || a.includes(t));
  });
}

// Bills that impact this client (by sector tag overlap)
function getImpactingBills() {
  return bills.filter((b) =>
    b.sectors.some((s) => matchesClientSectors(s))
  );
}

// Lobbying activity in client's sectors
function getRelevantLobbying() {
  return lobbyistRegistrations.filter((r) =>
    r.subjectMatters.some((sm) => matchesClientSectors(sm))
  );
}

// Also match lobbyists targeting the same officials AND overlapping subject matter
function getExpandedRelevantLobbying() {
  const bySubject = getRelevantLobbying();
  // Only include official-matched lobbyists if they also have at least one overlapping subject matter with client's watched bill sectors
  const clientBillSectors = bills
    .filter((b) => client.watchedBills.includes(b.number))
    .flatMap((b) => b.sectors);
  const byOfficial = lobbyistRegistrations.filter((r) =>
    client.keyOfficials.includes(r.lobbiedPerson) &&
    r.subjectMatters.some((sm) =>
      clientBillSectors.some((s) =>
        sm.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(sm.toLowerCase())
      )
    )
  );
  // Dedupe
  const map = new Map<string, typeof lobbyistRegistrations[0]>();
  [...bySubject, ...byOfficial].forEach((r) => map.set(r.registrationNo, r));
  return Array.from(map.values());
}

// Competitor lobbying — exclude client's own lobbyists, include named competitors
function getCompetitorActivity() {
  const relevant = getExpandedRelevantLobbying();
  const bySector = relevant.filter(
    (r) => !client.activeLobbyists.includes(r.lobbyistName)
  );
  // Also pull in any registrations from named competitors
  const byName = lobbyistRegistrations.filter((r) =>
    client.competitors.some((comp) => r.organization.toLowerCase().includes(comp.toLowerCase()))
  );
  // Dedupe
  const map = new Map<string, typeof lobbyistRegistrations[0]>();
  [...bySector, ...byName].forEach((r) => map.set(r.registrationNo, r));
  return Array.from(map.values());
}

// Generate a threat descriptor for each competitor relative to Brookfield
function getThreatDescriptor(r: typeof lobbyistRegistrations[0]): string {
  // Check if lobbying same officials
  const sameOfficials = client.keyOfficials.filter((o) => r.lobbiedPerson === o);
  // Check if lobbying on bills that affect client
  const clientBillSectors = bills
    .filter((b) => client.watchedBills.includes(b.number))
    .flatMap((b) => b.sectors);
  const overlappingSectors = r.subjectMatters.filter((sm) =>
    clientBillSectors.some((s) => sm.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(sm.toLowerCase()))
  );

  // Specific threat analysis based on their goals vs Brookfield's interests
  const goals = r.lobbyingGoals.toLowerCase();
  if (goals.includes("rent") || goals.includes("tenant") || goals.includes("renter"))
    return "Pushing rent/tenant protections that could cap Brookfield's rental income.";
  if (goals.includes("development charge") || goals.includes("dev charge"))
    return "Lobbying on development charges — could shift cost structures for new builds.";
  if (goals.includes("approval") || goals.includes("permitting") || goals.includes("fast"))
    return "Seeking faster approvals — may gain competitive edge on project timelines.";
  if (goals.includes("procurement") || goals.includes("buy ontario"))
    return "Influencing procurement rules that could affect construction supply chain costs.";
  if (goals.includes("red tape") || goals.includes("regulatory") || goals.includes("deregulat"))
    return "Pushing regulatory reform — could reshape compliance landscape for developers.";
  if (goals.includes("tax") || goals.includes("fiscal"))
    return "Lobbying on tax policy that may affect real estate economics.";
  if (sameOfficials.length > 0)
    return `Competing for attention of ${sameOfficials.join(", ")} — same decision-makers you depend on.`;
  if (overlappingSectors.length > 0)
    return `Active in ${overlappingSectors.join(", ")} — overlapping policy space.`;
  return "Operating in adjacent policy areas that could indirectly affect your sector.";
}

// Sector heat for client's sectors
function getClientSectorHeat() {
  return sectors.filter((s) =>
    client.sectors.some((cs) => {
      const aliases = sectorAliases[cs] || [cs.toLowerCase()];
      return aliases.some((a) => s.name.toLowerCase().includes(a) || a.includes(s.name.toLowerCase()));
    })
  );
}

// Recent events relevant to client
function getRelevantTimeline() {
  return timelineEvents.filter((e) =>
    e.sector && matchesClientSectors(e.sector)
  ).slice(0, 5);
}

// Generate recommended actions based on data
function getRecommendedActions() {
  const impacting = getImpactingBills();
  const competitors = getCompetitorActivity();
  const actions: { urgency: "high" | "medium" | "low"; action: string; context: string }[] = [];

  // Active bills at risk
  const activeBills = impacting.filter((b) => b.status !== "Royal Assent" && b.status !== "Lost");
  activeBills.forEach((b) => {
    if (b.type === "Private Member" && b.sectors.some((s) => s.includes("Housing") || s.includes("Real Estate"))) {
      actions.push({
        urgency: "high",
        action: `Monitor Bill ${b.number} (${b.shortTitle})`,
        context: `Private member bill at ${b.status} — could impact rental portfolio margins if it gains momentum.`,
      });
    } else if (b.status === "Second Reading" || b.status === "Third Reading") {
      actions.push({
        urgency: "medium",
        action: `Track Bill ${b.number} (${b.shortTitle})`,
        context: `Government bill at ${b.status} — likely to pass. Assess operational impact.`,
      });
    }
  });

  // Competitor moves
  if (competitors.length > 0) {
    const competitorOrgs = [...new Set(competitors.map((c) => c.organization))];
    actions.push({
      urgency: "medium",
      action: `${competitorOrgs.length} organizations lobbying in your sectors`,
      context: `${competitorOrgs.join(", ")} are active on housing/construction policy. Review their positions.`,
    });
  }

  // Favorable passed bills
  const favorable = impacting.filter((b) => b.status === "Royal Assent" && b.sectors.some((s) => s.includes("Construction") || s.includes("Infrastructure")));
  if (favorable.length > 0) {
    actions.push({
      urgency: "low",
      action: `${favorable.length} favorable bills passed`,
      context: `Bills accelerating approvals and reducing red tape have received Royal Assent. Leverage new fast-track provisions.`,
    });
  }

  return actions;
}

export default function DashboardPage() {
  const impactingBills = getImpactingBills();
  const activeBills = impactingBills.filter((b) => b.status !== "Royal Assent" && b.status !== "Lost");
  const passedBills = impactingBills.filter((b) => b.status === "Royal Assent");
  const competitors = getCompetitorActivity();
  const clientLobbying = getRelevantLobbying().filter((r) => client.activeLobbyists.includes(r.lobbyistName));
  const sectorHeat = getClientSectorHeat();
  const recentEvents = getRelevantTimeline();
  const actions = getRecommendedActions();
  const competitorOrgs = [...new Set(competitors.map((c) => c.organization))];

  return (
    <div>
      {/* Client Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Client Dashboard</div>
          <h1 className="text-2xl font-bold text-slate-900">{client.name}</h1>
          <div className="text-sm text-slate-500 mt-0.5">{client.industry}</div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
            client.riskLevel === "High" ? "bg-red-50 text-red-700 ring-1 ring-red-200" :
            client.riskLevel === "Medium" ? "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200" :
            "bg-green-50 text-green-700 ring-1 ring-green-200"
          }`}>{client.riskLevel} Risk</span>
          {client.sectors.map((s) => (
            <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{s}</span>
          ))}
        </div>
      </div>

      {/* Key Numbers */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { value: impactingBills.length, label: "Bills in Your Sectors", color: "text-slate-900" },
          { value: activeBills.length, label: "Active / In Progress", color: "text-blue-600" },
          { value: passedBills.length, label: "Passed (Royal Assent)", color: "text-green-600" },
          { value: competitorOrgs.length, label: "Competitor Orgs Active", color: "text-orange-600" },
          { value: clientLobbying.length, label: "Your Active Lobbyists", color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recommended Actions */}
      {actions.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Recommended Actions
          </h2>
          <div className="space-y-2">
            {actions.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  a.urgency === "high" ? "bg-red-500" :
                  a.urgency === "medium" ? "bg-yellow-500" :
                  "bg-green-500"
                }`} />
                <div>
                  <div className="text-sm font-medium text-slate-900">{a.action}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{a.context}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Bills Impacting You */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Bills Impacting You</h2>
            <Link href="/dashboard/bills" className="text-xs text-blue-600 font-medium hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {impactingBills.slice(0, 8).map((b) => {
              const matchingSectors = b.sectors.filter((s) =>
                client.sectors.some((cs) => s.toLowerCase().includes(cs.toLowerCase()) || cs.toLowerCase().includes(s.toLowerCase()))
              );
              return (
                <div key={b.number} className="px-5 py-3 hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">Bill {b.number}</span>
                      <span className="text-sm text-slate-600">{b.shortTitle}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      b.status === "Royal Assent" ? "bg-green-50 text-green-700" :
                      b.status === "Lost" ? "bg-red-50 text-red-700" :
                      b.status === "First Reading" ? "bg-yellow-50 text-yellow-700" :
                      b.status === "Second Reading" ? "bg-blue-50 text-blue-700" :
                      "bg-purple-50 text-purple-700"
                    }`}>{b.status}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {matchingSectors.map((s) => (
                      <span key={s} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{s}</span>
                    ))}
                    <span className="text-[10px] text-slate-400 ml-1">{b.type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Competitive Landscape */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Who Else Is Lobbying</h2>
            <Link href="/dashboard/competitive" className="text-xs text-blue-600 font-medium hover:underline">Full view</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {competitors.slice(0, 6).map((r, i) => (
              <div key={i} className="px-5 py-3 hover:bg-slate-50 transition">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{r.organization}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      r.type === "Consultant" ? "bg-purple-50 text-purple-700" :
                      r.type === "In-house" ? "bg-green-50 text-green-700" :
                      "bg-blue-50 text-blue-700"
                    }`}>{r.type}</span>
                  </div>
                  {r.formerPublicOffices.some((f) => f !== "None") && (
                    <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full">Former Gov</span>
                  )}
                </div>
                <div className="text-xs text-slate-500">{r.lobbyistName} → {r.lobbiedPerson}</div>
                <div className="text-xs text-orange-600 font-medium mt-1">{getThreatDescriptor(r)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Sector Heat */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900 mb-3">Your Sector Heat</h2>
          <div className="space-y-3">
            {sectorHeat.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{s.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    s.heatLevel === "Hot" ? "bg-red-50 text-red-700" :
                    s.heatLevel === "Warm" ? "bg-orange-50 text-orange-700" :
                    "bg-slate-100 text-slate-500"
                  }`}>{s.heatLevel}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{s.billCount} bills</span>
                  <span>{s.activeLobbyists} lobbyists</span>
                  <span>{s.topOrgs.length} orgs</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/sectors" className="text-xs text-blue-600 font-medium hover:underline mt-4 block">All sectors</Link>
        </div>

        {/* Key Officials */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900 mb-3">Key Officials</h2>
          <div className="space-y-2">
            {client.keyOfficials.map((name) => {
              const lobbyingCount = lobbyistRegistrations.filter((r) => r.lobbiedPerson === name).length;
              const sponsoredBills = bills.filter((b) => b.sponsors.includes(name));
              return (
                <div key={name} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{name}</div>
                    <div className="text-xs text-slate-400">{sponsoredBills.length} bills sponsored</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-purple-600 font-medium">{lobbyingCount} lobbying</div>
                    <div className="text-xs text-slate-400">registrations</div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/dashboard/stakeholders" className="text-xs text-blue-600 font-medium hover:underline mt-4 block">All stakeholders</Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900 mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {recentEvents.map((e, i) => (
              <div key={i} className="flex gap-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  e.type === "bill_passed" ? "bg-green-400" :
                  e.type === "bill_introduced" ? "bg-blue-400" :
                  e.type === "lobbying_registered" ? "bg-purple-400" :
                  "bg-yellow-400"
                }`} />
                <div>
                  <div className="text-xs font-medium text-slate-700">{e.title}</div>
                  <div className="text-[10px] text-slate-400">{e.date}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/timeline" className="text-xs text-blue-600 font-medium hover:underline mt-4 block">Full timeline</Link>
        </div>
      </div>
    </div>
  );
}
