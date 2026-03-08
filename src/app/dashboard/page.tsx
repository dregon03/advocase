import { bills, type Bill } from "@/data/bills";
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

function matchesClientSectors(term: string): boolean {
  const t = term.toLowerCase();
  return client.sectors.some((cs) => {
    const aliases = sectorAliases[cs] || [cs.toLowerCase()];
    return aliases.some((a) => t.includes(a) || a.includes(t));
  });
}

function getImpactingBills() {
  return bills.filter((b) =>
    b.sectors.some((s) => matchesClientSectors(s))
  );
}

function getRelevantLobbying() {
  return lobbyistRegistrations.filter((r) =>
    r.subjectMatters.some((sm) => matchesClientSectors(sm))
  );
}

function getExpandedRelevantLobbying() {
  const bySubject = getRelevantLobbying();
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
  const map = new Map<string, typeof lobbyistRegistrations[0]>();
  [...bySubject, ...byOfficial].forEach((r) => map.set(r.registrationNo, r));
  return Array.from(map.values());
}

function getCompetitorActivity() {
  const relevant = getExpandedRelevantLobbying();
  const bySector = relevant.filter(
    (r) => !client.activeLobbyists.includes(r.lobbyistName)
  );
  const byName = lobbyistRegistrations.filter((r) =>
    client.competitors.some((comp) => r.organization.toLowerCase().includes(comp.toLowerCase()))
  );
  const map = new Map<string, typeof lobbyistRegistrations[0]>();
  [...bySector, ...byName].forEach((r) => map.set(r.registrationNo, r));
  return Array.from(map.values());
}

// What does this bill mean for Brookfield specifically?
function getBillImpact(b: Bill): { label: string; color: string; detail: string } {
  const title = b.title.toLowerCase();
  const sectors = b.sectors.map((s) => s.toLowerCase());

  // Rent/tenant bills = risk
  if (title.includes("rent") || title.includes("renter") || title.includes("tenant"))
    return { label: "Risk", color: "text-red-600 bg-red-50", detail: "Could cap rental income or restrict lease terms on your portfolio." };

  // Building/approval/faster = favorable
  if (title.includes("building faster") || title.includes("fighting delays") || title.includes("municipal accountability"))
    return { label: "Favorable", color: "text-green-600 bg-green-50", detail: "Speeds up approvals and reduces timelines for your development pipeline." };

  // Red tape/competitive economy = favorable
  if (title.includes("red tape") || title.includes("competitive economy"))
    return { label: "Favorable", color: "text-green-600 bg-green-50", detail: "Reduces regulatory burden on construction and development." };

  // Safer municipalities = relevant
  if (title.includes("safer municipalities"))
    return { label: "Relevant", color: "text-blue-600 bg-blue-50", detail: "Changes municipal powers that affect zoning and development decisions." };

  // Housing sector but not clearly favorable or risk
  if (sectors.includes("housing") || sectors.includes("real estate"))
    return { label: "Watch", color: "text-yellow-600 bg-yellow-50", detail: "Touches housing policy — monitor for amendments that could affect your interests." };

  return { label: "Monitor", color: "text-slate-600 bg-slate-50", detail: "Indirectly related to your sectors." };
}

function getThreatDescriptor(r: typeof lobbyistRegistrations[0]): string {
  const sameOfficials = client.keyOfficials.filter((o) => r.lobbiedPerson === o);
  const goals = r.lobbyingGoals.toLowerCase();

  if (goals.includes("rent") || goals.includes("tenant") || goals.includes("renter"))
    return "Pushing rent/tenant protections that could cap your rental income.";
  if (goals.includes("development charge") || goals.includes("dev charge"))
    return "Lobbying to change development charges — could shift your cost structure on new builds.";
  if (goals.includes("approval") || goals.includes("permitting") || goals.includes("fast"))
    return "Seeking faster approvals — may get projects greenlit ahead of yours.";
  if (goals.includes("procurement") || goals.includes("buy ontario"))
    return "Influencing procurement rules that could raise your construction material costs.";
  if (goals.includes("red tape") || goals.includes("regulatory") || goals.includes("deregulat"))
    return "Pushing regulatory reform — could reshape compliance requirements you follow.";
  if (goals.includes("tax") || goals.includes("fiscal"))
    return "Lobbying on tax policy that may change your development economics.";
  if (sameOfficials.length > 0)
    return `Lobbying ${sameOfficials.join(", ")} — the same decision-maker${sameOfficials.length > 1 ? "s" : ""} your projects depend on.`;
  return "Active in your policy space — could influence outcomes that affect your business.";
}

function getClientSectorHeat() {
  return sectors.filter((s) =>
    client.sectors.some((cs) => {
      const aliases = sectorAliases[cs] || [cs.toLowerCase()];
      return aliases.some((a) => s.name.toLowerCase().includes(a) || a.includes(s.name.toLowerCase()));
    })
  );
}

function getRelevantTimeline() {
  return timelineEvents.filter((e) =>
    e.sector && matchesClientSectors(e.sector)
  ).slice(0, 5);
}

function getRecommendedActions() {
  const impacting = getImpactingBills();
  const competitors = getCompetitorActivity();
  const actions: { urgency: "high" | "medium" | "low"; action: string; context: string }[] = [];

  const activeBills = impacting.filter((b) => b.status !== "Royal Assent" && b.status !== "Lost");
  activeBills.forEach((b) => {
    const impact = getBillImpact(b);
    if (impact.label === "Risk") {
      actions.push({
        urgency: "high",
        action: `Bill ${b.number} — ${b.shortTitle}`,
        context: `${impact.detail} Currently at ${b.status}. ${b.type === "Private Member" ? "Private member bill — low pass probability but watch for amendments attached to government bills." : "Government bill — high pass probability. Prepare for impact."}`,
      });
    } else if (b.status === "Third Reading") {
      actions.push({
        urgency: "medium",
        action: `Bill ${b.number} about to pass — ${b.shortTitle}`,
        context: `${impact.detail} At Third Reading — almost certain to become law. ${impact.label === "Favorable" ? "Prepare to leverage new provisions." : "Review operational implications."}`,
      });
    }
  });

  // Competitor-specific actions
  competitors.forEach((r) => {
    if (client.competitors.some((comp) => r.organization.toLowerCase().includes(comp.toLowerCase()))) {
      actions.push({
        urgency: "high",
        action: `Direct competitor ${r.organization} is lobbying ${r.lobbiedPerson}`,
        context: getThreatDescriptor(r),
      });
    }
  });

  // Other orgs lobbying in your space
  const otherLobbyists = competitors.filter((r) =>
    !client.competitors.some((comp) => r.organization.toLowerCase().includes(comp.toLowerCase()))
  );
  if (otherLobbyists.length > 0) {
    actions.push({
      urgency: "medium",
      action: `${otherLobbyists.length} other org${otherLobbyists.length > 1 ? "s" : ""} lobbying in your policy areas`,
      context: `${otherLobbyists.map((r) => r.organization).join(", ")} — active on housing/construction policy. Monitor their positions — their lobbying outcomes affect your operating environment.`,
    });
  }

  // Favorable passed bills — tell them to act
  const favorable = impacting.filter((b) => b.status === "Royal Assent" && getBillImpact(b).label === "Favorable");
  if (favorable.length > 0) {
    actions.push({
      urgency: "low",
      action: `${favorable.length} favorable bill${favorable.length > 1 ? "s" : ""} now law — use them`,
      context: `${favorable.map((b) => `Bill ${b.number} (${b.shortTitle})`).join(", ")} passed. These accelerate approvals and cut red tape. Update your permitting strategy to take advantage.`,
    });
  }

  return actions;
}

export default function DashboardPage() {
  const impactingBills = getImpactingBills();
  const activeBills = impactingBills.filter((b) => b.status !== "Royal Assent" && b.status !== "Lost");
  const riskBills = impactingBills.filter((b) => getBillImpact(b).label === "Risk" && b.status !== "Royal Assent" && b.status !== "Lost");
  const favorableBills = impactingBills.filter((b) => getBillImpact(b).label === "Favorable");
  const competitors = getCompetitorActivity();
  const clientLobbying = getRelevantLobbying().filter((r) => client.activeLobbyists.includes(r.lobbyistName));
  const sectorHeat = getClientSectorHeat();
  const recentEvents = getRelevantTimeline();
  const actions = getRecommendedActions();

  return (
    <div>
      {/* Client Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Your Dashboard</div>
          <h1 className="text-2xl font-bold text-slate-900">{client.name}</h1>
          <div className="text-sm text-slate-500 mt-0.5">{client.industry}</div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
            client.riskLevel === "High" ? "bg-red-50 text-red-700 ring-1 ring-red-200" :
            client.riskLevel === "Medium" ? "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200" :
            "bg-green-50 text-green-700 ring-1 ring-green-200"
          }`}>{client.riskLevel} Legislative Risk</span>
          {client.sectors.map((s) => (
            <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{s}</span>
          ))}
        </div>
      </div>

      {/* Key Numbers — contextualized */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { value: activeBills.length, label: "Active Bills Affecting You", color: "text-blue-600" },
          { value: riskBills.length, label: "Bills That Threaten You", color: "text-red-600" },
          { value: favorableBills.length, label: "Bills Working for You", color: "text-green-600" },
          { value: competitors.length, label: "Orgs Lobbying Your Space", color: "text-orange-600" },
          { value: clientLobbying.length, label: "Your Lobbyists Active", color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* What You Should Do */}
      {actions.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            What You Should Do
          </h2>
          <div className="space-y-2">
            {actions.map((a, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${
                a.urgency === "high" ? "bg-red-50/50" :
                a.urgency === "medium" ? "bg-yellow-50/50" :
                "bg-green-50/50"
              }`}>
                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0 ${
                  a.urgency === "high" ? "bg-red-100 text-red-700" :
                  a.urgency === "medium" ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700"
                }`}>{a.urgency === "high" ? "Act" : a.urgency === "medium" ? "Watch" : "Leverage"}</span>
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
        {/* Bills Impacting You — with impact labels */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Legislation Affecting Your Business</h2>
            <Link href="/dashboard/bills" className="text-xs text-blue-600 font-medium hover:underline">All bills</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {impactingBills.slice(0, 8).map((b) => {
              const impact = getBillImpact(b);
              return (
                <div key={b.number} className="px-5 py-3 hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">Bill {b.number}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${impact.color}`}>{impact.label}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      b.status === "Royal Assent" ? "bg-green-50 text-green-700" :
                      b.status === "Lost" ? "bg-red-50 text-red-700" :
                      b.status === "First Reading" ? "bg-yellow-50 text-yellow-700" :
                      b.status === "Second Reading" ? "bg-blue-50 text-blue-700" :
                      "bg-purple-50 text-purple-700"
                    }`}>{b.status}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-700">{b.shortTitle}</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {b.sectors.map((s) => (
                      <span key={s} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{s}</span>
                    ))}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{impact.detail}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lobbying Activity in Your Space */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Lobbying in Your Policy Space</h2>
            <Link href="/dashboard/competitive" className="text-xs text-blue-600 font-medium hover:underline">All activity</Link>
          </div>

          {/* Direct Competitors — if any */}
          {(() => {
            const directCompetitors = competitors.filter((r) =>
              client.competitors.some((comp) => r.organization.toLowerCase().includes(comp.toLowerCase()))
            );
            const otherLobbyists = competitors.filter((r) =>
              !client.competitors.some((comp) => r.organization.toLowerCase().includes(comp.toLowerCase()))
            );
            return (
              <>
                {directCompetitors.length > 0 && (
                  <div className="px-5 py-3 bg-red-50/30 border-b border-slate-200">
                    <div className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-2">Direct Competitors</div>
                    <div className="space-y-2">
                      {directCompetitors.map((r, i) => (
                        <div key={i}>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-slate-900">{r.organization}</span>
                            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-semibold">Competitor</span>
                          </div>
                          <div className="text-xs text-slate-500">
                            {r.lobbyistName} lobbying {r.lobbiedPerson}
                            {client.keyOfficials.includes(r.lobbiedPerson) && (
                              <span className="text-red-500 font-medium"> — your key official</span>
                            )}
                          </div>
                          <div className="text-xs text-red-600 font-medium mt-0.5">{getThreatDescriptor(r)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other orgs lobbying in same policy areas */}
                <div className="divide-y divide-slate-100">
                  {otherLobbyists.slice(0, 5).map((r, i) => (
                    <div key={i} className="px-5 py-3 hover:bg-slate-50 transition">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-900">{r.organization}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                            r.type === "Consultant" ? "bg-purple-50 text-purple-700" :
                            r.type === "In-house" ? "bg-green-50 text-green-700" :
                            "bg-blue-50 text-blue-700"
                          }`}>{r.type}</span>
                        </div>
                        {r.formerPublicOffices.some((f) => f !== "None") && (
                          <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full">Former Gov Insider</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {r.lobbyistName} lobbying {r.lobbiedPerson}
                        {client.keyOfficials.includes(r.lobbiedPerson) && (
                          <span className="text-orange-500 font-medium"> — your key official</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{r.lobbyingGoals.length > 80 ? r.lobbyingGoals.slice(0, 80) + "…" : r.lobbyingGoals}</div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Sector Heat — with context */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900 mb-1">Your Sector Landscape</h2>
          <p className="text-xs text-slate-400 mb-3">How active are the policy areas you operate in?</p>
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
                <div className="text-xs text-slate-400">
                  {s.heatLevel === "Hot"
                    ? `High activity — ${s.billCount} bills and ${s.activeLobbyists} lobbyists competing for outcomes here.`
                    : s.heatLevel === "Warm"
                    ? `Moderate activity — ${s.billCount} bills in play.`
                    : `Quiet — limited legislative attention right now.`
                  }
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/sectors" className="text-xs text-blue-600 font-medium hover:underline mt-4 block">All sectors</Link>
        </div>

        {/* Key Officials — why they matter to you */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900 mb-1">Officials You Depend On</h2>
          <p className="text-xs text-slate-400 mb-3">Decision-makers with power over your files.</p>
          <div className="space-y-2">
            {client.keyOfficials.map((name) => {
              const lobbyingCount = lobbyistRegistrations.filter((r) => r.lobbiedPerson === name).length;
              const sponsoredBills = bills.filter((b) => b.sponsors.includes(name));
              const clientBills = sponsoredBills.filter((b) => client.watchedBills.includes(b.number));
              return (
                <div key={name} className="p-2.5 rounded-lg bg-slate-50">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium text-slate-900">{name}</div>
                    <div className="text-xs text-purple-600 font-medium">{lobbyingCount} orgs lobbying them</div>
                  </div>
                  <div className="text-xs text-slate-400">
                    {clientBills.length > 0
                      ? `Sponsors ${clientBills.map((b) => `Bill ${b.number}`).join(", ")} — directly shapes policy affecting your projects.`
                      : `${sponsoredBills.length} bills sponsored. Influences your sector through ministerial authority.`
                    }
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/dashboard/stakeholders" className="text-xs text-blue-600 font-medium hover:underline mt-4 block">All stakeholders</Link>
        </div>

        {/* Recent Activity — with why it matters */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900 mb-1">What Just Happened</h2>
          <p className="text-xs text-slate-400 mb-3">Recent moves in your sectors.</p>
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
