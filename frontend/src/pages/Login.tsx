import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export const Login: React.FC = () => {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Clear global auth errors when this page is loaded/mounted
  React.useEffect(() => {
    clearError();
  }, []);

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
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
    }

    console.log(`[LOGIN PAGE] Validation results: valid=${valid}`);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[LOGIN PAGE] Log In form submitted.");

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      console.log(`[LOGIN PAGE] Form valid. Authenticating ${email}...`);
      await login(email, password);
      console.log("[LOGIN PAGE] Login succeeded. Redirecting user to /dashboard...");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("[LOGIN PAGE] Login failed with message:", err.message);
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
              Log in to your account
            </h1>
            <p className="text-body-sm text-body">
              Enter your credentials to manage your show rate automation.
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

            <div className="flex flex-col gap-xxs">
              <div className="flex justify-between items-center mb-[2px]">
                <label className="text-body-sm font-semibold text-body select-none">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-caption font-bold text-body-mid hover:text-primary transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                disabled={submitting}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-sm"
              disabled={submitting}
            >
              {submitting ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="border-t border-ink/10 pt-lg text-center">
            <span className="text-body-sm text-body-mid">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-ink hover:text-primary transition-colors duration-200"
              >
                Sign up
              </Link>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};
