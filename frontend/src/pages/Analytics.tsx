import React from "react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export const Analytics: React.FC = () => {
  return (
    <div className="flex-1 p-xl max-w-7xl mx-auto w-full flex flex-col gap-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div className="flex flex-col gap-xxs">
          <h1 className="font-display text-display-sub-md font-semibold tracking-tight">
            Analytics
          </h1>
          <p className="text-body text-body-sm">
            Insights on no-show rates and confirmation patterns.
          </p>
        </div>
        <Badge variant="pill" className="bg-primary/10 text-primary border border-primary/20">
          Last updated: Just now
        </Badge>
      </div>

      <Card variant="cream" className="flex flex-col gap-md">
        <h2 className="font-display text-body-lg font-semibold tracking-tight text-ink">
          Pipeline Performance
        </h2>
        <div className="text-body-sm text-body flex flex-col gap-sm">
          <p>Historical statistics of response times and auto-rescue actions will render here.</p>
          <div className="border border-ink/10 rounded-md p-xl text-center text-body-mid bg-canvas/50">
            No analytics data accumulated yet. Send test appointment messages to populate reports.
          </div>
        </div>
      </Card>
    </div>
  );
};
