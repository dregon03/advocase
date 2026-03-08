import { getFullBriefing, getBillImpact, getClient } from "./intelligence";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || "";

export async function sendSlackMessage(blocks: unknown[]) {
  if (!SLACK_WEBHOOK_URL) {
    throw new Error("SLACK_WEBHOOK_URL not configured");
  }
  const res = await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blocks }),
  });
  if (!res.ok) {
    throw new Error(`Slack webhook failed: ${res.status} ${await res.text()}`);
  }
}

export function buildDigestBlocks(clientIndex = 0) {
  const client = getClient(clientIndex);
  const briefing = getFullBriefing(client);
  const blocks: unknown[] = [];

  // Header
  blocks.push({
    type: "header",
    text: { type: "plain_text", text: `📊 ${client.name} — Legislative Briefing`, emoji: true },
  });

  blocks.push({
    type: "context",
    elements: [
      { type: "mrkdwn", text: `*${client.industry}* | ${client.riskLevel} Legislative Risk | Sectors: ${client.sectors.join(", ")}` },
    ],
  });

  blocks.push({ type: "divider" });

  // Key numbers
  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: [
        `*📈 At a Glance*`,
        `• *${briefing.activeBills.length}* active bills affecting you`,
        `• *${briefing.riskBills.length}* bills that threaten you`,
        `• *${briefing.favorableBills.length}* bills working for you`,
        `• *${briefing.competitors.length}* orgs lobbying your space`,
        `• *${briefing.clientLobbying.length}* of your lobbyists active`,
      ].join("\n"),
    },
  });

  blocks.push({ type: "divider" });

  // Risk bills — what to act on
  if (briefing.riskBills.length > 0) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: [
          `*🔴 Bills That Threaten You*`,
          ...briefing.riskBills.map((b) => {
            const impact = getBillImpact(client, b);
            return `• *Bill ${b.number}* — ${b.shortTitle} _(${b.status})_\n   ${impact.detail}`;
          }),
        ].join("\n"),
      },
    });
    blocks.push({ type: "divider" });
  }

  // Favorable bills
  const passedFavorable = briefing.favorableBills.filter((b) => b.status === "Royal Assent");
  const activeFavorable = briefing.favorableBills.filter((b) => b.status !== "Royal Assent" && b.status !== "Lost");
  if (passedFavorable.length > 0 || activeFavorable.length > 0) {
    const lines = [`*🟢 Bills Working For You*`];
    if (activeFavorable.length > 0) {
      lines.push(...activeFavorable.map((b) => `• *Bill ${b.number}* — ${b.shortTitle} _(${b.status})_ — still in play`));
    }
    if (passedFavorable.length > 0) {
      lines.push(`_${passedFavorable.length} favorable bill${passedFavorable.length > 1 ? "s" : ""} already passed — leverage them._`);
      lines.push(passedFavorable.map((b) => `Bill ${b.number} (${b.shortTitle})`).join(", "));
    }
    blocks.push({ type: "section", text: { type: "mrkdwn", text: lines.join("\n") } });
    blocks.push({ type: "divider" });
  }

  // Direct competitors
  if (briefing.directCompetitors.length > 0) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: [
          `*⚠️ Competitor Activity*`,
          ...briefing.directCompetitors.map((r) =>
            `• *${r.organization}* — ${r.lobbyistName} lobbying ${r.lobbiedPerson}${client.keyOfficials.includes(r.lobbiedPerson) ? " _(your key official)_" : ""}\n   _${r.lobbyingGoals.length > 120 ? r.lobbyingGoals.slice(0, 120) + "…" : r.lobbyingGoals}_`
          ),
        ].join("\n"),
      },
    });
    blocks.push({ type: "divider" });
  }

  // Other lobbying
  if (briefing.otherLobbyists.length > 0) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: [
          `*📡 Other Lobbying in Your Space*`,
          ...briefing.otherLobbyists.slice(0, 4).map((r) =>
            `• *${r.organization}* (${r.type}) — ${r.lobbyistName} → ${r.lobbiedPerson}`
          ),
        ].join("\n"),
      },
    });
    blocks.push({ type: "divider" });
  }

  // Recent events
  if (briefing.recentEvents.length > 0) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: [
          `*🕐 Recent Activity*`,
          ...briefing.recentEvents.map((e) => {
            const icon = e.type === "bill_passed" ? "✅" : e.type === "lobbying_registered" ? "📝" : "📌";
            return `${icon} ${e.title} _(${e.date})_`;
          }),
        ].join("\n"),
      },
    });
    blocks.push({ type: "divider" });
  }

  // Sector heat
  if (briefing.sectorHeat.length > 0) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: [
          `*🌡️ Your Sector Landscape*`,
          ...briefing.sectorHeat.map((s) => {
            const icon = s.heatLevel === "Hot" ? "🔥" : s.heatLevel === "Warm" ? "🌤️" : "❄️";
            return `${icon} *${s.name}* — ${s.heatLevel} (${s.billCount} bills, ${s.activeLobbyists} lobbyists)`;
          }),
        ].join("\n"),
      },
    });
  }

  // Footer
  blocks.push({
    type: "context",
    elements: [
      { type: "mrkdwn", text: `_Advocase — Ontario GR Intelligence | 44th Parliament, 1st Session | Data: ola.org / oico.on.ca_` },
    ],
  });

  return blocks;
}

export function buildAlertBlocks(alertType: "bill_risk" | "competitor" | "new_lobbying", data: Record<string, string>) {
  const blocks: unknown[] = [];

  if (alertType === "bill_risk") {
    blocks.push({
      type: "header",
      text: { type: "plain_text", text: "🚨 Legislative Risk Alert", emoji: true },
    });
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Bill ${data.billNumber}* — ${data.billTitle}\nStatus changed to *${data.newStatus}*\n\n${data.impact}`,
      },
    });
  }

  if (alertType === "competitor") {
    blocks.push({
      type: "header",
      text: { type: "plain_text", text: "⚠️ Competitor Alert", emoji: true },
    });
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${data.competitor}* just registered new lobbying activity.\n${data.lobbyist} is now lobbying *${data.official}*.\n\n_${data.goals}_`,
      },
    });
  }

  if (alertType === "new_lobbying") {
    blocks.push({
      type: "header",
      text: { type: "plain_text", text: "📝 New Lobbying Registration", emoji: true },
    });
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${data.organization}* (${data.type}) registered.\n${data.lobbyist} targeting *${data.official}*.\nSubject: ${data.subject}\n\n_${data.goals}_`,
      },
    });
  }

  blocks.push({
    type: "context",
    elements: [
      { type: "mrkdwn", text: `_Advocase — Ontario GR Intelligence_` },
    ],
  });

  return blocks;
}
