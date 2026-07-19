import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    console.log("[DASHBOARD] Logout button clicked. Triggering AuthContext logout...");
    await logout();
    console.log("[DASHBOARD] Logout operation completed. State cleared.");
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans flex flex-col">
      {/* Header bar */}
      <header className="border-b border-ink/10 bg-canvas py-md px-xl flex justify-between items-center">
        <div className="flex items-center gap-xs">
          <span className="w-4 h-4 rounded-sm bg-primary"></span>
          <span className="font-display font-semibold tracking-tight text-body-md">
            ShowGuard Portal
          </span>
        </div>
        <div className="flex items-center gap-lg">
          <span className="text-body-sm text-body-mid font-medium hidden sm:inline-block">
            Signed in as: <strong className="text-ink font-semibold">{user?.email}</strong>
          </span>
          <Button variant="secondary" onClick={handleLogout} className="py-xxs px-sm text-body-sm">
            Log Out
          </Button>
        </div>
      </header>

      {/* Main body */}
      <main className="flex-1 p-xl max-w-7xl mx-auto w-full flex flex-col gap-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div className="flex flex-col gap-xxs">
            <h1 className="font-display text-display-sub-md font-semibold tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-body text-body-sm">
              Real-time monitoring of your SMS confirmation pipelines.
            </p>
          </div>
          <Badge variant="pill" className="bg-primary/10 text-primary border border-primary/20">
            System Live & Guarding
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
          <Card variant="cream" className="flex flex-col gap-sm">
            <span className="text-caption font-semibold tracking-wide uppercase text-body-mid">
              Protected Appointments
            </span>
            <span className="font-display text-display-sub-lg font-semibold tracking-tight">
              128
            </span>
            <span className="text-body-sm text-emerald-700 font-semibold flex items-center gap-xxs">
              ↑ 12% from last week
            </span>
          </Card>

          <Card variant="cream" className="flex flex-col gap-sm">
            <span className="text-caption font-semibold tracking-wide uppercase text-body-mid">
              Confirmations Received
            </span>
            <span className="font-display text-display-sub-lg font-semibold tracking-tight">
              96%
            </span>
            <span className="text-body-sm text-emerald-700 font-semibold flex items-center gap-xxs">
              ↑ 2.4% rate change
            </span>
          </Card>

          <Card variant="cream" className="flex flex-col gap-sm">
            <span className="text-caption font-semibold tracking-wide uppercase text-body-mid">
              No-Show Guarded
            </span>
            <span className="font-display text-display-sub-lg font-semibold tracking-tight">
              14
            </span>
            <span className="text-body-sm text-emerald-700 font-semibold flex items-center gap-xxs">
              4 incidents prevented
            </span>
          </Card>
        </div>

        {/* Informational Panel */}
        <Card variant="outline" className="bg-canvas border border-ink/10 p-xl flex flex-col gap-md">
          <h2 className="font-display text-body-lg font-semibold tracking-tight">
            Integration Credentials
          </h2>
          <div className="text-body-sm text-body flex flex-col gap-sm">
            <p>
              Your webhook integration links are ready to connect to your GoHighLevel dashboard.
              Below are the endpoint configuration credentials:
            </p>
            <div className="p-md bg-canvas-dark border border-ink/10 rounded-sm font-mono text-body-sm break-all">
              Webhook URL: <span className="text-ink font-semibold">https://showguard.fly.dev/api/webhooks/ghl</span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};
