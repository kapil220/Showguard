import { Router, Request, Response } from "express";

const router = Router();

// Inbound GoHighLevel webhook — appointment.created and related events.
// TODO: verify webhook signature, upsert Contact/Appointment, then
// kick off scheduleConfirmSequence.
router.post("/", async (_req: Request, res: Response) => {
  res.status(501).json({ error: "Not implemented" });
});

export default router;
