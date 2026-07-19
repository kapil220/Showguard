import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key_showguard";

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  console.log("[Auth Middleware] Evaluating request access authentication...");
  
  let token: string | undefined = req.cookies?.token;

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  if (!token) {
    console.warn("[Auth Middleware] Authentication failed: No token provided");
    return res.status(401).json({ message: "Unauthorized: Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    console.log(`[Auth Middleware] JWT signature verified for userId: ${decoded.userId}`);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      console.warn(`[Auth Middleware] User not found in database for id: ${decoded.userId}`);
      return res.status(401).json({ message: "Unauthorized: User account not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("[Auth Middleware] JWT token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
