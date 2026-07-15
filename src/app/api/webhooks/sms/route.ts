import { NextRequest, NextResponse } from "next/server";

// Inbound SMS webhook — every reply must be caught (YES/STOP/other).
// TODO: verify signature, resolve the appointment by contact/thread,
// then call handleInboundReply. This is the reliability heart of
// Wave 1.0 — see roadmap §07.
export async function POST(_req: NextRequest) {
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
