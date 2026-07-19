// Pillar 4 — Nurture (Wave 1.2)
// Pre-nurture warms the homeowner up before the visit; post-nurture
// follows up afterward to shorten the sales cycle.

export async function schedulePreNurture(_appointmentId: string): Promise<void> {
  throw new Error("Not implemented: pre-visit nurture sequence");
}

export async function schedulePostNurture(_appointmentId: string): Promise<void> {
  throw new Error("Not implemented: post-visit nurture sequence");
}
