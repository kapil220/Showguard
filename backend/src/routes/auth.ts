import { Router, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";
import { authRateLimiter } from "../middleware/rateLimit";
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../utils/validation";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key_showguard";

// Helper function to hash raw token for reset-password checks
const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// 1. POST /signup
router.post("/signup", async (req, res): Promise<any> => {
  console.log("\n[AUTH FLOW - SIGNUP] Request received for email:", req.body.email);
  
  const validation = signupSchema.safeParse(req.body);
  if (!validation.success) {
    const errorMsg = validation.error.issues[0].message;
    console.warn("[AUTH FLOW - SIGNUP] Validation failed:", errorMsg);
    return res.status(400).json({ message: errorMsg });
  }

  const { email, password } = validation.data;

  try {
    console.log("[AUTH FLOW - SIGNUP] Checking if user already exists in DB...");
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      console.warn("[AUTH FLOW - SIGNUP] Signup rejected: Email already registered:", email);
      return res.status(409).json({ message: "Email already exists" });
    }

    console.log("[AUTH FLOW - SIGNUP] Hashing password with bcrypt (12 rounds)...");
    const passwordHash = await bcrypt.hash(password, 12);
    console.log("[AUTH FLOW - SIGNUP] Hashing completed. Storing user in DB...");

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    console.log("[AUTH FLOW - SIGNUP] User successfully created with ID:", newUser.id);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("[AUTH FLOW - SIGNUP] Error during signup process:", error);
    return res.status(500).json({ message: "Internal server error during account creation" });
  }
});

// 2. POST /login (with Rate Limiting)
router.post("/login", authRateLimiter, async (req, res): Promise<any> => {
  console.log("\n[AUTH FLOW - LOGIN] Login attempt for email:", req.body.email);

  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    const errorMsg = validation.error.issues[0].message;
    console.warn("[AUTH FLOW - LOGIN] Validation failed:", errorMsg);
    return res.status(400).json({ message: errorMsg });
  }

  const { email, password } = validation.data;

  try {
    console.log("[AUTH FLOW - LOGIN] Querying user profile from DB...");
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      console.warn("[AUTH FLOW - LOGIN] User not found for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("[AUTH FLOW - LOGIN] User found. Verifying password hash...");
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      console.warn("[AUTH FLOW - LOGIN] Password verification failed for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("[AUTH FLOW - LOGIN] Password verified. Issuing JWT...");
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    // Set cookie: HttpOnly, secure=false in local dev, sameSite="lax"
    console.log("[AUTH FLOW - LOGIN] Setting HTTP-Only cookie 'token' in response...");
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in prod/https environments
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    console.log("[AUTH FLOW - LOGIN] Login successful for user ID:", user.id);
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[AUTH FLOW - LOGIN] Error during login process:", error);
    return res.status(500).json({ message: "Internal server error during authentication" });
  }
});

// 3. POST /forgot-password (with Rate Limiting)
router.post("/forgot-password", authRateLimiter, async (req, res): Promise<any> => {
  console.log("\n[AUTH FLOW - FORGOT PASSWORD] Forgot password request for:", req.body.email);

  const validation = forgotPasswordSchema.safeParse(req.body);
  if (!validation.success) {
    const errorMsg = validation.error.issues[0].message;
    console.warn("[AUTH FLOW - FORGOT PASSWORD] Validation failed:", errorMsg);
    return res.status(400).json({ message: errorMsg });
  }

  const { email } = validation.data;
  const standardResponse = { message: "If an account exists, we've sent a reset link." };

  try {
    console.log("[AUTH FLOW - FORGOT PASSWORD] Querying user profile from DB...");
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Security measure: Do not disclose user existence to prevent user harvesting
      console.log("[AUTH FLOW - FORGOT PASSWORD] User not found, returning decoy success to prevent harvesting.");
      return res.status(200).json(standardResponse);
    }

    console.log("[AUTH FLOW - FORGOT PASSWORD] User found. Generating secure random reset token...");
    const plainToken = crypto.randomBytes(32).toString("hex");
    const hashed = hashToken(plainToken);
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiration

    console.log("[AUTH FLOW - FORGOT PASSWORD] Updating user's reset token and expiration date in database...");
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetTokenHash: hashed,
        resetTokenExpiresAt: expiry,
      },
    });

    // Simulated email delivery / Log URL to terminal
    const resetUrl = `http://localhost:5173/reset-password?token=${plainToken}`;
    console.log("\n--- SIMULATED EMAIL DELIVERED ---");
    console.log(`To: ${user.email}`);
    console.log("Subject: Password Reset Request");
    console.log(`Body: Click here to reset your password: ${resetUrl}`);
    console.log("---------------------------------\n");

    return res.status(200).json(standardResponse);
  } catch (error) {
    console.error("[AUTH FLOW - FORGOT PASSWORD] Error during forgot password lookup:", error);
    return res.status(500).json({ message: "Internal server error during password reset request" });
  }
});

// 4. POST /reset-password
router.post("/reset-password", async (req, res): Promise<any> => {
  console.log("\n[AUTH FLOW - RESET PASSWORD] Attempting password reset...");

  const validation = resetPasswordSchema.safeParse(req.body);
  if (!validation.success) {
    const errorMsg = validation.error.issues[0].message;
    console.warn("[AUTH FLOW - RESET PASSWORD] Validation failed:", errorMsg);
    return res.status(400).json({ message: errorMsg });
  }

  const { token, newPassword } = validation.data;
  const hashedInputToken = hashToken(token);

  try {
    console.log("[AUTH FLOW - RESET PASSWORD] Querying user profile matching hashed token...");
    const user = await prisma.user.findFirst({
      where: {
        resetTokenHash: hashedInputToken,
        resetTokenExpiresAt: {
          gt: new Date(), // Check if expiry date is in the future
        },
      },
    });

    if (!user) {
      console.warn("[AUTH FLOW - RESET PASSWORD] Reset failed: Invalid, used, or expired token");
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    console.log("[AUTH FLOW - RESET PASSWORD] Valid token verified. Hashing new password...");
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    console.log("[AUTH FLOW - RESET PASSWORD] Saving new password hash and clearing reset token fields...");
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: newPasswordHash,
        resetTokenHash: null,
        resetTokenExpiresAt: null,
      },
    });

    console.log("[AUTH FLOW - RESET PASSWORD] Password successfully updated for userId:", user.id);
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("[AUTH FLOW - RESET PASSWORD] Error during password reset update:", error);
    return res.status(500).json({ message: "Internal server error during password reset" });
  }
});

// 5. GET /me (Authenticated Profile Route)
router.get("/me", requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<any> => {
  console.log(`\n[AUTH FLOW - PROFILE] Profile retrieval for authenticated user: ${req.user?.email}`);
  return res.status(200).json(req.user);
});

export default router;
