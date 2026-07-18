import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export const Signup: React.FC = () => {
  const { signup, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Clear global auth errors when this page is loaded/mounted
  React.useEffect(() => {
    clearError();
  }, []);

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
    clearError();

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      valid = false;
    }

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

    console.log(`[SIGNUP PAGE] Validation results: valid=${valid}`);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[SIGNUP PAGE] Create Account form submitted.");

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      console.log(`[SIGNUP PAGE] Form valid. Dispatching signup action to AuthContext for ${email}...`);
      await signup(email, password);
      console.log("[SIGNUP PAGE] Signup process finished successfully. Redirecting user to /dashboard...");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("[SIGNUP PAGE] Signup failed with message:", err.message);
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
              Create an account
            </h1>
            <p className="text-body-sm text-body">
              Start optimizing your GoHighLevel appointment show rates.
            </p>
          </div>

          {error && (
            <div className="p-lg bg-primary/10 border border-primary/20 text-primary text-body-sm rounded-sm font-medium">
              {error}
            </div>
          )}

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

            <Input
              label="Password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              disabled={submitting}
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmError}
              disabled={submitting}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-sm"
              disabled={submitting}
            >
              {submitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="border-t border-ink/10 pt-lg text-center">
            <span className="text-body-sm text-body-mid">
              Already have an account?{" "}
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
