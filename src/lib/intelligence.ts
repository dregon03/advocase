import { bills, type Bill } from "@/data/bills";
import { lobbyistRegistrations } from "@/data/lobbyists";
import { clientWorkspaces, type Client } from "@/data/clients";
import { sectors } from "@/data/sectors";
import { timelineEvents } from "@/data/timeline";

// Default to first client (Bell Canada)
export function getClient(index = 0): Client {
  return clientWorkspaces[index];
}

// Sector synonym map — maps OICO subject matters to our sector tags
const sectorAliasMap: Record<string, string[]> = {
  "Technology": ["science and technology", "technology", "industry", "economic development and trade"],
  "Consumer Protection": ["consumer protection", "consumer"],
  "Trade & Commerce": ["economic development and trade", "international trade", "trade", "procurement"],
  "Housing": ["housing", "municipal affairs", "real estate"],
  "Construction": ["housing", "municipal affairs", "infrastructure", "construction"],
  "Municipal Government": ["municipal affairs", "municipal government"],
};

export function matchesClientSectors(client: Client, term: string): boolean {
  const t = term.toLowerCase();
  return client.sectors.some((cs) => {
    const aliases = sectorAliasMap[cs] || [cs.toLowerCase()];
    return aliases.some((a) => t.includes(a) || a.includes(t));
  });
}

export function getImpactingBills(client: Client) {
  return bills.filter((b) =>
    b.sectors.some((s) => matchesClientSectors(client, s))
  );
}

export function getRelevantLobbying(client: Client) {
  return lobbyistRegistrations.filter((r) =>
    r.subjectMatters.some((sm) => matchesClientSectors(client, sm))
  );
}

export function getExpandedRelevantLobbying(client: Client) {
  const bySubject = getRelevantLobbying(client);
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

export function getCompetitorActivity(client: Client) {
  const relevant = getExpandedRelevantLobbying(client);
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

export function getBillImpact(client: Client, b: Bill): { label: string; color: string; detail: string; emoji: string } {
  const title = b.title.toLowerCase();
  const billSectors = b.sectors.map((s) => s.toLowerCase());

  // Bell-specific
  if (client.name === "Bell Canada") {
    if (title.includes("right to repair"))
      return { label: "Risk", color: "text-red-600 bg-red-50", emoji: "🔴", detail: "Could mandate device repairability and parts access — raises costs and opens network equipment to third-party modification." };
    if (title.includes("consumer watchdog"))
      return { label: "Risk", color: "text-red-600 bg-red-50", emoji: "🔴", detail: "New consumer oversight body could scrutinize telecom pricing, data practices, and contract terms." };
    if (title.includes("artificial intelligence") || title.includes("ai"))
      return { label: "Favorable", color: "text-green-600 bg-green-50", emoji: "🟢", detail: "Would have driven AI investment and digital infrastructure demand — beneficial for your network and cloud services." };
    if (title.includes("red tape") || title.includes("competitive economy"))
      return { label: "Favorable", color: "text-green-600 bg-green-50", emoji: "🟢", detail: "Reduces regulatory burden — streamlines permitting for tower siting and network expansion." };
    if (title.includes("buy ontario"))
      return { label: "Favorable", color: "text-green-600 bg-green-50", emoji: "🟢", detail: "Ontario-first procurement could direct government telecom contracts toward domestic providers like Bell." };
    if (title.includes("free trade"))
      return { label: "Relevant", color: "text-blue-600 bg-blue-50", emoji: "🔵", detail: "Interprovincial trade reform could affect cross-border network infrastructure and equipment procurement." };
    if (title.includes("unleashing") || title.includes("economy act"))
      return { label: "Favorable", color: "text-green-600 bg-green-50", emoji: "🟢", detail: "Broad deregulation benefits telecom infrastructure investment and speeds up expansion." };
  }

  // Brookfield-specific
  if (client.name === "Brookfield Properties") {
    if (title.includes("rent") || title.includes("renter") || title.includes("tenant"))
      return { label: "Risk", color: "text-red-600 bg-red-50", emoji: "🔴", detail: "Could cap rental income or restrict lease terms on your portfolio." };
    if (title.includes("building faster") || title.includes("fighting delays") || title.includes("municipal accountability"))
      return { label: "Favorable", color: "text-green-600 bg-green-50", emoji: "🟢", detail: "Speeds up approvals and reduces timelines for your development pipeline." };
    if (title.includes("red tape") || title.includes("competitive economy"))
      return { label: "Favorable", color: "text-green-600 bg-green-50", emoji: "🟢", detail: "Reduces regulatory burden on construction and development." };
    if (title.includes("safer municipalities"))
      return { label: "Relevant", color: "text-blue-600 bg-blue-50", emoji: "🔵", detail: "Changes municipal powers that affect zoning and development decisions." };
  }

  // Generic fallbacks
  if (billSectors.includes("technology") || billSectors.includes("ai & innovation"))
    return { label: "Watch", color: "text-yellow-600 bg-yellow-50", emoji: "🟡", detail: "Touches tech policy — monitor for provisions that could affect your digital services or infrastructure." };
  if (billSectors.includes("consumer protection"))
    return { label: "Watch", color: "text-yellow-600 bg-yellow-50", emoji: "🟡", detail: "Consumer protection changes could impact your pricing, contracts, or data handling practices." };
  if (billSectors.includes("housing") || billSectors.includes("real estate"))
    return { label: "Watch", color: "text-yellow-600 bg-yellow-50", emoji: "🟡", detail: "Touches housing policy — monitor for amendments that could affect your interests." };

  return { label: "Monitor", color: "text-slate-600 bg-slate-50", emoji: "⚪", detail: "Indirectly related to your sectors." };
}

export function getRelevantTimeline(client: Client) {
  return timelineEvents.filter((e) =>
    e.sector && matchesClientSectors(client, e.sector)
  ).slice(0, 5);
}

export function getClientSectorHeat(client: Client) {
  return sectors.filter((s) =>
    client.sectors.some((cs) => {
      const aliases = sectorAliasMap[cs] || [cs.toLowerCase()];
      return aliases.some((a) => s.name.toLowerCase().includes(a) || a.includes(s.name.toLowerCase()));
    })
  );
}

export function getFullBriefing(client: Client) {
  const impactingBills = getImpactingBills(client);
  const activeBills = impactingBills.filter((b) => b.status !== "Royal Assent" && b.status !== "Lost");
  const riskBills = impactingBills.filter((b) => getBillImpact(client, b).label === "Risk" && b.status !== "Royal Assent" && b.status !== "Lost");
  const favorableBills = impactingBills.filter((b) => getBillImpact(client, b).label === "Favorable");
  const competitors = getCompetitorActivity(client);
  const directCompetitors = competitors.filter((r) =>
    client.competitors.some((comp) => r.organization.toLowerCase().includes(comp.toLowerCase()))
  );
  const otherLobbyists = competitors.filter((r) =>
    !client.competitors.some((comp) => r.organization.toLowerCase().includes(comp.toLowerCase()))
  );
  const clientLobbying = getRelevantLobbying(client).filter((r) => client.activeLobbyists.includes(r.lobbyistName));
  const sectorHeat = getClientSectorHeat(client);
  const recentEvents = getRelevantTimeline(client);

  return {
    client,
    impactingBills,
    activeBills,
    riskBills,
    favorableBills,
    competitors,
    directCompetitors,
    otherLobbyists,
    clientLobbying,
    sectorHeat,
    recentEvents,
  };
}
