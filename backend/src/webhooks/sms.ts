import { Router, Request, Response } from "express";

const router = Router();

// Inbound SMS webhook — every reply must be caught (YES/STOP/other).
// TODO: verify signature, resolve the appointment by contact/thread,
// then call handleInboundReply. This is the reliability heart of
// Wave 1.0 — see roadmap §07.
router.post("/", async (_req: Request, res: Response) => {
  res.status(501).json({ error: "Not implemented" });
});

export default router;
