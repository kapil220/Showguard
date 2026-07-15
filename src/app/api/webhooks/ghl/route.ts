import { NextRequest, NextResponse } from "next/server";

// Inbound GoHighLevel webhook — appointment.created and related events.
// TODO: verify webhook signature, upsert Contact/Appointment, then
// kick off scheduleConfirmSequence.
export async function POST(_req: NextRequest) {
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
