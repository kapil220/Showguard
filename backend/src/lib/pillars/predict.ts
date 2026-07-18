// Pillar 2 — Predict (Wave 1.0: smart rules; Version 2: learned model)
// Scores each appointment green/yellow/red from confirmation status,
// response timing, prior no-show history, and day/time slot.
// The heuristic here is intentionally simple — it exists to produce the
// risk board AND to be replaced by a trained model once outcome data
// clears the Version 2 data gate (see roadmap §04).

import type { RiskLevel } from "@prisma/client";

export async function scoreAppointmentRisk(_appointmentId: string): Promise<RiskLevel> {
  throw new Error("Not implemented: heuristic risk scoring");
}
