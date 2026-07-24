import React from "react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export const Settings: React.FC = () => {
  return (
    <div className="flex-1 p-xl max-w-7xl mx-auto w-full flex flex-col gap-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div className="flex flex-col gap-xxs">
          <h1 className="font-display text-display-sub-md font-semibold tracking-tight">
            Settings
          </h1>
          <p className="text-body text-body-sm">
            Configure GHL integrations and confirmation parameters.
          </p>
        </div>
        <Badge variant="pill" className="bg-primary/10 text-primary border border-primary/20">
          Status: Synced
        </Badge>
      </div>

      <Card variant="cream" className="flex flex-col gap-md">
        <h2 className="font-display text-body-lg font-semibold tracking-tight text-ink">
          Integration Credentials
        </h2>
        <div className="text-body-sm text-body flex flex-col gap-sm">
          <p>Configure and retrieve API keys, tokens, and webhooks.</p>
          <div className="border border-ink/10 rounded-md p-xl text-center text-body-mid bg-canvas/50">
            ShowGuard webhook: https://showguard.fly.dev/api/webhooks/ghl
          </div>
        </div>
      </Card>
    </div>
  );
};
