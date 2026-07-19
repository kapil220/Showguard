import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`[RESET PASSWORD PAGE] Loaded with token: ${token ? "Found (masked)" : "Not Found"}`);
    if (!token) {
      console.warn("[RESET PASSWORD PAGE] No reset token was found in the URL.");
      setError("A valid security token is required to reset your password. Please trigger a new forgot-password request.");
    }
  }, [token]);

  const validate = () => {
    setPasswordError("");
    setConfirmError("");
    setError(null);
    let valid = true;

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmError("Passwords must match");
      valid = false;
    }

    console.log(`[RESET PASSWORD PAGE] Validation results: valid=${valid}`);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[RESET PASSWORD PAGE] Reset Password form submitted.");

    if (!token) {
      setError("Token is missing. Cannot reset password.");
      return;
    }

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      console.log(`[RESET PASSWORD PAGE] Sending reset credentials request to /api/auth/reset-password...`);
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      console.log(`[RESET PASSWORD PAGE] Received response status: ${response.status}`);
      
      let data: any = {};
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (parseErr) {
          console.error("[RESET PASSWORD PAGE] JSON parsing failed:", parseErr);
        }
      } else {
        const text = await response.text();
        data = { message: text || `Server returned status code ${response.status}` };
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      console.log("[RESET PASSWORD PAGE] Password reset complete. Redirecting to /login with state messages...");
      // Redirect to login page and pass success state
      navigate("/login", { state: { successMessage: "Password reset successful! You can now log in." } });
    } catch (err: any) {
      console.error("[RESET PASSWORD PAGE] Reset request error:", err.message);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans flex items-center justify-center p-xl">
      <div className="w-full max-w-md flex flex-col gap-xl">
        <div className="flex flex-col items-center gap-xs">
          <span className="w-5 h-5 rounded-sm bg-primary"></span>
          <span className="font-display text-display-sub-md tracking-tight">ShowGuard</span>
        </div>

        <Card variant="cream" className="flex flex-col gap-xl">
          <div className="flex flex-col gap-xxs">
            <h1 className="font-display text-display-sub-sm font-semibold tracking-tight">
              Choose a new password
            </h1>
            <p className="text-body-sm text-body">
              Make sure it is at least 8 characters long.
            </p>
          </div>

          {error && (
            <div className="p-lg bg-primary/10 border border-primary/20 text-primary text-body-sm rounded-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
            <Input
              label="New Password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              disabled={submitting || !token}
              autoComplete="new-password"
            />

            <Input
              label="Confirm New Password"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmError}
              disabled={submitting || !token}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-sm"
              disabled={submitting || !token}
            >
              {submitting ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>

          <div className="border-t border-ink/10 pt-lg text-center">
            <span className="text-body-sm text-body-mid">
              Back to{" "}
              <Link
                to="/login"
                className="font-bold text-ink hover:text-primary transition-colors duration-200"
              >
                Log in
              </Link>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};
