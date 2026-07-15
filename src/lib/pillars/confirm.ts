// Pillar 1 — Confirm (Wave 1.0)
// Multi-touch, timezone-aware confirmation sequence + reply handling.
// Trust bar: never sends outside quiet hours, never misses a YES/STOP,
// never double-sends. See roadmap §02–03.

export async function scheduleConfirmSequence(_appointmentId: string): Promise<void> {
  throw new Error("Not implemented: confirm sequence scheduling");
}

export async function handleInboundReply(_params: {
  appointmentId: string;
  body: string;
}): Promise<void> {
  throw new Error("Not implemented: reply handling (YES/STOP/reschedule)");
}
