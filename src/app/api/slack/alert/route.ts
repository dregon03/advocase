import { NextRequest, NextResponse } from "next/server";
import { buildAlertBlocks, sendSlackMessage } from "@/lib/slack";

// POST /api/slack/alert — send a real-time alert to Slack
// Body: { type: "bill_risk" | "competitor" | "new_lobbying", data: {...} }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json({ ok: false, error: "Missing type or data" }, { status: 400 });
    }

    const blocks = buildAlertBlocks(type, data);
    await sendSlackMessage(blocks);
    return NextResponse.json({ ok: true, message: `Alert (${type}) sent to Slack` });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
