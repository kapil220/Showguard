import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    setEmailError("");
    setError(null);
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      valid = false;
    }

    console.log(`[FORGOT PASSWORD PAGE] Validation results: valid=${valid}`);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[FORGOT PASSWORD PAGE] Forgot Password form submitted.");

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      console.log(`[FORGOT PASSWORD PAGE] Sending payload to /api/auth/forgot-password for email: ${email}`);
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      console.log(`[FORGOT PASSWORD PAGE] Received response status: ${response.status}`);
      
      let data: any = {};
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (parseErr) {
          console.error("[FORGOT PASSWORD PAGE] JSON parsing failed:", parseErr);
        }
      } else {
        const text = await response.text();
        data = { message: text || `Server returned status code ${response.status}` };
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to trigger password reset");
      }

      console.log("[FORGOT PASSWORD PAGE] Request triggered successfully. Displaying standard success message.");
      setSuccess(true);
    } catch (err: any) {
      console.error("[FORGOT PASSWORD PAGE] Reset trigger request failed:", err.message);
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
              Reset your password
            </h1>
            <p className="text-body-sm text-body">
              We'll send you an email link to securely update your credentials.
            </p>
          </div>

          {error && (
            <div className="p-lg bg-primary/10 border border-primary/20 text-primary text-body-sm rounded-sm font-medium">
              {error}
            </div>
          )}

          {success ? (
            <div className="flex flex-col gap-lg">
              <div className="p-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-body-sm rounded-sm font-medium">
                If an account exists, we've sent a reset link. Check your server logs or terminal to find the mock reset link.
              </div>
              <Link to="/login" className="w-full">
                <Button variant="tertiary" className="w-full">
                  Back to login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
              <Input
                label="Email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                disabled={submitting}
                autoComplete="email"
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-sm"
                disabled={submitting}
              >
                {submitting ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>
            </form>
          )}

          {!success && (
            <div className="border-t border-ink/10 pt-lg text-center">
              <span className="text-body-sm text-body-mid">
                Remember your credentials?{" "}
                <Link
                  to="/login"
                  className="font-bold text-ink hover:text-primary transition-colors duration-200"
                >
                  Back to login
                </Link>
              </span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
