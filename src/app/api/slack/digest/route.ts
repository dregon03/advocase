import { NextResponse } from "next/server";
import { buildDigestBlocks, sendSlackMessage } from "@/lib/slack";

// POST /api/slack/digest — send a full briefing to Slack
export async function POST() {
  try {
    const blocks = buildDigestBlocks(0); // Bell Canada (index 0)
    await sendSlackMessage(blocks);
    return NextResponse.json({ ok: true, message: "Digest sent to Slack" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// GET /api/slack/digest — preview the digest blocks (for testing)
export async function GET() {
  const blocks = buildDigestBlocks(0);
  return NextResponse.json({ blocks });
}
