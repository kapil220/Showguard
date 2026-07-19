import rateLimit from "express-rate-limit";

// Rate limit to prevent brute force attacks on authentication sensitive endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 authentication attempts per window
  message: {
    message: "Too many authentication requests from this IP, please try again after 15 minutes."
  },
  standardHeaders: true, // Return rate limit info in standard headers
  legacyHeaders: false, // Disable legacy headers
});
