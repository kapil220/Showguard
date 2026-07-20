import React from "react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export const GoLive: React.FC = () => {
  return (
    <div className="flex-1 p-xl max-w-7xl mx-auto w-full flex flex-col gap-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div className="flex flex-col gap-xxs">
          <h1 className="font-display text-display-sub-md font-semibold tracking-tight">
            Go Live
          </h1>
          <p className="text-body text-body-sm">
            Control the status of live agent interceptions.
          </p>
        </div>
        <Badge variant="pill" className="bg-emerald-100 text-emerald-800 border border-emerald-200">
          Status: Online
        </Badge>
      </div>

      <Card variant="cream" className="flex flex-col gap-md">
        <h2 className="font-display text-body-lg font-semibold tracking-tight text-ink">
          Connection Status
        </h2>
        <div className="text-body-sm text-body flex flex-col gap-sm">
          <p>Toggle active guard systems on and off for connected calendars.</p>
          <div className="border border-ink/10 rounded-md p-xl text-center text-body-mid bg-canvas/50">
            System is live. Currently protecting 1 connected GHL location.
          </div>
        </div>
      </Card>
    </div>
  );
};
