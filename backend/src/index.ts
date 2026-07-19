import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import ghlWebhookRouter from "./webhooks/ghl";
import smsWebhookRouter from "./webhooks/sms";
import authRouter from "./routes/auth";

// Load environment variables from the workspace root .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mounting webhook handlers
app.use("/api/webhooks/ghl", ghlWebhookRouter);
app.use("/api/webhooks/sms", smsWebhookRouter);
app.use("/api/auth", authRouter);


// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "showguard-backend" });
});

app.listen(port, () => {
  console.log(`[ShowGuard Backend] Server running on port ${port}`);
});
