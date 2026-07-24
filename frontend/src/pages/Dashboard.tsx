import React, { useState } from "react";
import calendarImg from "../assets/calender.png";
import datatrackingImg from "../assets/datatracking.png";
import { PipelineModal } from "../components/PipelineModal";
import { PIPELINE_STAGES } from "../constants/dashboardData";
import { Tooltip } from "../components/ui/Tooltip";
import {
  ArrowPathIcon,
  SparklesIcon,
  ArrowRightIcon,
  CalendarIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  ListBulletIcon,
  ViewColumnsIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  LightBulbIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "pipeline">("list");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [durationFilter, setDurationFilter] = useState<"today" | "this-week" | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<{
    label: string;
    desc: string;
    count: number;
    color: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  } | null>(null);

  // Dynamic refresh animation
  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log("[DASHBOARD] Refreshing Operations Center...");
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const liveLogsTooltipContent = (
    <div className="flex flex-col gap-1.5 text-[11px] text-zinc-300 font-sans text-left">
      <p className="font-bold text-[#fffefb] text-xs">Live Guard Agent Logs</p>
      <p>Tracks and monitors webhook calls, automated data synchronization, and security logs in real time.</p>
      <div className="border-t border-zinc-800 my-1"></div>
      <p><strong className="text-primary font-semibold">Events Today:</strong> Sync triggers, calendar sync updates, and webhook actions processed today.</p>
      <p><strong className="text-rose-400 font-semibold">Blocked:</strong> Intercepted unauthorized integrations, spam attempts, or API authentication failures.</p>
      <p><strong className="text-primary font-semibold">Uptime:</strong> Operational health and availability of the GoHighLevel webhook tracking agent.</p>
    </div>
  );

  return (
    <div className="flex-1 bg-canvas text-body p-6 flex flex-col gap-6 min-h-screen">

      {/* SECTION 1: TOP ROW (Operations Center, Core Stats Ribbon, Action switches) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Operations Center Greeting Card */}
        <div className="lg:col-span-4 bg-canvas-soft border border-ink/10 rounded-md p-5 flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold text-ink font-display">
              Operations Center
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-xs text-body-mid font-medium">Tuesday, July 21</span>
              <span className="bg-[#ffe8dc] text-primary text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                Good evening, test 👋
              </span>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 bg-canvas hover:bg-canvas-soft border border-ink/10 rounded-md text-ink cursor-pointer shadow-sm transition-colors"
          >
            <ArrowPathIcon className={`w-4 h-4 text-body-mid ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Daily Stats Ribbon Card */}
        <div className="lg:col-span-4 bg-canvas-soft border border-ink/10 rounded-md p-5 flex items-center justify-around shadow-sm">
          {[
            {
              label: "Today",
              val: "0 appointments",
              bg: "bg-blue-500/10 text-blue-600",
              icon: CalendarIcon,
            },
            {
              label: "Status",
              val: "0 confirmed",
              bg: "bg-emerald-500/10 text-emerald-600",
              icon: CheckCircleIcon,
            }
          ].map((stat, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-md ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-body-mid tracking-wider font-display">{stat.label}</p>
                  <p className="text-sm font-bold text-ink font-display">{stat.val}</p>
                </div>
              </div>
              {idx < arr.length - 1 && <div className="h-8 w-[1px] bg-ink/10" />}
            </React.Fragment>
          ))}
        </div>

        {/* View Switches & Action Card */}
        <div className="lg:col-span-4 bg-canvas-soft border border-ink/10 rounded-md p-5 flex items-center justify-between shadow-sm">
          {/* View toggle */}
          <div className="flex bg-canvas border border-ink/10 p-[3px] rounded-md shadow-sm">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 py-1.5 px-3.5 text-xs font-semibold rounded-sm cursor-pointer transition-colors ${viewMode === "list"
                ? "bg-canvas-soft text-ink shadow-sm"
                : "text-body-mid hover:text-ink"
                }`}
            >
              <ListBulletIcon className="w-4 h-4 text-primary" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode("pipeline")}
              className={`flex items-center gap-1.5 py-1.5 px-3.5 text-xs font-semibold rounded-sm cursor-pointer transition-colors ${viewMode === "pipeline"
                ? "bg-canvas-soft text-ink shadow-sm"
                : "text-body-mid hover:text-ink"
                }`}
            >
              <ViewColumnsIcon className="w-4 h-4 text-body-mid" />
              <span>Pipeline</span>
            </button>
          </div>

          {/* New Appointment Button */}
          <button className="flex items-center gap-1.5 bg-gradient-to-r from-primary to-[#ff6a00] hover:opacity-95 text-on-primary font-semibold rounded-md py-2 px-4 text-xs shadow-md cursor-pointer transition-all">
            <PlusIcon className="w-4 h-4 text-white font-bold" />
            <span>New</span>
          </button>
        </div>

      </section>

      {/* SECTION 2: CONNECTION STATUS ALERT BANNER */}
      <section className="bg-[#1f1614] border border-ink/20 rounded-md p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
        {/* Glow backdrop detail */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center border border-primary/30 text-primary">
            <SparklesIcon className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Connection Status
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Complete your integration with GoHighLevel to start syncing calendar schedules and pipeline statistics.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-1 bg-gradient-to-r from-primary/10 to-primary/25 border border-primary/40 text-primary hover:border-primary/60 py-2 px-4 rounded-md text-xs font-semibold cursor-pointer relative z-10 transition-all select-none">
          <span>Go Live Checklist</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* SECTION 3: 3-COLUMN OPERATIONAL GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* ================= COLUMN 3.1: MONITORING ALERTS & ACTIONS (3 cols) ================= */}
        <div className="lg:col-span-3 flex flex-col gap-6">

          {/* Card 1: At Risk Alerts */}
          <div className="bg-canvas-soft border border-ink/10 rounded-md p-5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] tracking-wider font-bold text-body-mid uppercase font-display">
                At Risk Alerts
              </span>
              <span className="text-2xl font-bold text-ink mt-1 font-display">
                0
              </span>
              <span className="text-xs text-body-mid mt-0.5">
                score &gt; 60 indicator
              </span>
            </div>
            {/* Sparkline wave visual */}
            <div className="flex flex-col items-end gap-2">
              <svg className="w-20 h-6 text-rose-500 overflow-visible" viewBox="0 0 100 30" fill="none">
                <path d="M 2 20 Q 20 5, 40 22 T 70 8 T 98 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 2 20 Q 20 5, 40 22 T 70 8 T 98 20 L 98 30 L 2 30 Z" fill="currentColor" opacity="0.05" />
              </svg>
            </div>
          </div>

          {/* Card 2: Average Show Rate */}
          <div className="bg-canvas-soft border border-ink/10 rounded-md p-5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] tracking-wider font-bold text-body-mid uppercase font-display">
                Average Show Rate
              </span>
              <span className="text-2xl font-bold text-ink mt-1 font-display">
                —
              </span>
              <span className="text-xs text-body-mid mt-0.5">
                30-day moving window
              </span>
            </div>
            {/* Sparkline wave visual */}
            <div className="flex flex-col items-end gap-2">
              <svg className="w-20 h-6 text-primary overflow-visible" viewBox="0 0 100 30" fill="none">
                <path d="M 2 24 Q 22 10, 42 18 T 72 6 T 98 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 2 24 Q 22 10, 42 18 T 72 6 T 98 12 L 98 30 L 2 30 Z" fill="currentColor" opacity="0.05" />
              </svg>
            </div>
          </div>

          {/* Card 3: Quick Actions list */}
          <div className="bg-canvas-soft border border-ink/10 rounded-md p-5 shadow-sm flex flex-col gap-4 flex-1">
            <span className="text-[10px] tracking-wider font-bold text-body-mid uppercase font-display">
              Quick Actions
            </span>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: "Create Test Appointment",
                  desc: "Simulate a test schedule item",
                  bg: "bg-blue-500/10 text-blue-600",
                  icon: CalendarIcon,
                },
                {
                  label: "Go Live Checklist",
                  desc: "Complete integration steps",
                  bg: "bg-emerald-500/10 text-emerald-600",
                  icon: CheckCircleIcon,
                },
                {
                  label: "View Analytics",
                  desc: "Deep dive into performance",
                  bg: "bg-primary/10 text-primary",
                  icon: ArrowTrendingUpIcon,
                }
              ].map((action, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-canvas hover:bg-canvas-soft border border-ink/5 hover:border-ink/15 rounded-md shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-md ${action.bg} flex items-center justify-center`}>
                      <action.icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-ink">{action.label}</span>
                      <span className="text-[10px] text-body-mid">{action.desc}</span>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-body-mid group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {viewMode === "list" ? (
          <>
            {/* ================= COLUMN 3.2: ACTIVE SCHEDULE (5 cols) ================= */}
            <div className="lg:col-span-5 bg-canvas border border-ink/10 rounded-md shadow-sm flex flex-col justify-between">

              {/* Section Header */}
              <div className="flex justify-between items-center py-4 px-5 border-b border-ink/10 bg-canvas-soft/40">
                <span className="text-xs font-bold text-ink font-display uppercase tracking-wider">
                  Active Schedule
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold bg-primary/10 border border-primary/20 text-primary py-0.5 px-2 rounded-full">
                    0 scheduled
                  </span>
                  <button className="text-body-mid hover:text-ink cursor-pointer">
                    <EllipsisVerticalIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Empty State Content */}
              <div className="flex-1 flex flex-col items-center justify-center py-6 px-6 gap-4 text-center">
                {/* Calendar Image Asset with orbit detail */}
                <div className="relative flex items-center justify-center">
                  <img src={calendarImg} className="w-44 h-32 object-contain relative z-10" alt="Calendar" />
                </div>
                <div className="flex flex-col gap-1 max-w-xs">
                  <h3 className="text-sm font-bold text-ink">
                    No active appointments today
                  </h3>
                  <p className="text-xs text-body-mid">
                    Simulate calendar activity by creating a test schedule item.
                  </p>
                </div>
                <button className="bg-gradient-to-r from-primary to-[#ff6a00] hover:opacity-95 text-on-primary font-semibold py-2 px-5 rounded-md text-xs shadow-md cursor-pointer transition-all">
                  Create Test Appointment
                </button>
              </div>

              {/* Upcoming next 7 days widget */}
              <div className="p-4 border-t border-ink/10 bg-canvas-soft/20">
                <p className="text-[9px] uppercase font-bold text-body-mid tracking-wider mb-3">
                  Upcoming (Next 7 Days)
                </p>
                <div className="grid grid-cols-7 gap-2">
                  {[
                    { label: "Tue", num: "21", active: true },
                    { label: "Wed", num: "22", active: false },
                    { label: "Thu", num: "23", active: false },
                    { label: "Fri", num: "24", active: false },
                    { label: "Sat", num: "25", active: false },
                    { label: "Sun", num: "26", active: false },
                    { label: "Mon", num: "27", active: false },
                  ].map((day) => (
                    <div
                      key={day.num}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-md border ${
                        day.active
                          ? "bg-primary/10 border-primary/20 text-primary"
                          : "bg-canvas-soft border-ink/5 text-body-mid"
                      }`}
                    >
                      <span className="text-[10px] font-medium opacity-80">{day.label}</span>
                      <span className={`text-xs font-bold font-display ${day.active ? "" : "text-ink"}`}>{day.num}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex items-center justify-center text-[7px] text-white font-bold font-sans ${
                          day.active ? "bg-primary" : "bg-body-mid/20"
                        }`}
                      >
                        0
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ================= COLUMN 3.3: LIVE RADAR AGENT STATUS (4 cols) ================= */}
            <div className="lg:col-span-4 bg-canvas border border-ink/10 rounded-md shadow-sm flex flex-col justify-between">

              {/* Section Header */}
              <div className="flex justify-between items-center py-4 px-5 border-b border-ink/10 bg-canvas-soft/40">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-ink font-display uppercase tracking-wider">
                    Live Logs
                  </span>
                  <Tooltip content={liveLogsTooltipContent} position="top">
                    <InformationCircleIcon className="w-4 h-4 text-body-mid hover:text-ink transition-colors cursor-help" />
                  </Tooltip>
                </div>
                <span className="text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 py-0.5 px-2.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Live</span>
                </span>
              </div>

              {/* Concentric radar animation and details */}
              <div className="flex-1 flex flex-col items-center justify-center py-3 px-4 gap-4 text-center bg-canvas">

                {/* Concentric radar graphic asset */}
                <div className="relative flex items-center justify-center overflow-hidden">
                  <img src={datatrackingImg} className="w-[240px] h-[240px] object-contain relative z-10 -my-10" alt="Data Tracking" />
                </div>

                <div className="flex flex-col gap-1 z-20">
                  <h3 className="text-sm font-bold text-ink">
                    Guarding agent tracking
                  </h3>
                  <p className="text-xs text-body-mid">
                    Display in real time.
                  </p>
                </div>

              </div>

              {/* Metrics summary bottom card */}
              <div className="p-5 bg-canvas-soft/10">
                <div className="bg-canvas border border-ink/10 rounded-md p-4 flex justify-between items-center shadow-sm">
                  {[
                    {
                      label: "Events Today",
                      val: "0",
                      bg: "bg-[#ffe8dc] text-primary",
                      icon: (
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14H11V21L20 10H13Z" />
                        </svg>
                      )
                    },
                    {
                      label: "Blocked",
                      val: "0",
                      bg: "bg-rose-500/10 text-rose-600",
                      icon: (
                        <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )
                    },
                    {
                      label: "Uptime",
                      val: "100%",
                      bg: "bg-[#ffe8dc] text-primary",
                      icon: (
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-1.414a5 5 0 117.07 0M12 13a1 1 0 100-2 1 1 0 000 2z" />
                        </svg>
                      )
                    }
                  ].map((metric, idx, arr) => (
                    <React.Fragment key={idx}>
                      <div className="flex flex-col items-center text-center flex-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-full ${metric.bg} flex items-center justify-center shrink-0`}>
                            {metric.icon}
                          </div>
                          <span className="text-base font-bold text-ink font-display">{metric.val}</span>
                        </div>
                        <span className="text-[10px] text-body-mid font-semibold uppercase tracking-wider mt-1.5">{metric.label}</span>
                      </div>
                      {idx < arr.length - 1 && <div className="h-8 w-[1px] bg-ink/10" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

            </div>
          </>
        ) : (
          /* ================= COLUMN 3.2+3.3 MERGED: PIPELINE BOARD (9 cols) ================= */
          <div className="lg:col-span-9 bg-canvas border border-ink/10 rounded-md shadow-sm flex flex-col justify-between">
            {/* Header / Filter segment */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center py-4 px-5 border-b border-ink/10 bg-canvas-soft/40">
              {/* Duration Filters */}
              <div className="flex bg-canvas border border-ink/10 p-[3px] rounded-md shadow-sm">
                {(["today", "this-week", "all"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setDurationFilter(filter)}
                    className={`py-1.5 px-3.5 text-xs font-semibold rounded-sm cursor-pointer transition-colors capitalize ${durationFilter === filter
                      ? "bg-canvas-soft text-ink shadow-sm"
                      : "text-body-mid hover:text-ink"
                      }`}
                  >
                    {filter === "this-week" ? "this week" : filter}
                  </button>
                ))}
              </div>

              {/* Search and Total */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-body-mid">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-48 bg-canvas border border-ink/10 rounded-md py-1.5 pl-9 pr-3 text-xs font-medium text-ink placeholder-body-mid focus:outline-none focus:border-primary/50"
                  />
                </div>
                <span className="text-xs font-bold text-body-mid shrink-0 font-display">
                  0 total
                </span>
              </div>
            </div>

            {/* Pipeline Stage List items */}
            <div className="flex-1 p-5 flex flex-col gap-3 bg-canvas">
              {PIPELINE_STAGES.map((stage, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedStage({
                      label: stage.label,
                      desc: stage.desc,
                      count: stage.count,
                      color: stage.bgCol,
                      icon: stage.icon
                    });
                    setIsModalOpen(true);
                  }}
                  className={`flex items-center justify-between p-2 bg-canvas hover:bg-canvas-soft border border-ink/10 border-l-4 ${stage.borderCol} rounded-md shadow-sm transition-all cursor-pointer group`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${stage.iconBg} ${stage.iconText} flex items-center justify-center shrink-0`}>
                      <stage.icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${stage.dotCol}`} />
                      <span className="text-xs font-bold text-ink font-display">{stage.label}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${stage.countBg} ${stage.countText} py-0.5 px-2.5 rounded-md`}>
                      {stage.count}
                    </span>
                    <ChevronRightIcon className="w-4 h-4 text-body-mid group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* SECTION 4: BOTTOM BANNER & FLOATING BADGE */}
      <section className="bg-canvas border border-ink/10 rounded-md p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">

        {/* Tip content */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <LightBulbIcon className="w-4.5 h-4.5" />
          </div>
          <p className="text-xs text-body">
            <strong className="text-ink font-semibold">Tip:</strong> Get started by creating a test appointment to see your schedule here.
          </p>
        </div>

        {/* Test Mode trigger indicator */}
        <div className="bg-canvas border border-primary/20 hover:border-primary/40 text-primary text-[10px] font-bold uppercase tracking-wider py-2 px-4 rounded-md shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer select-none">
          <SparklesIcon className="w-3.5 h-3.5 text-primary" />
          <span>Test Mode</span>
        </div>

      </section>

      {/* Pipeline Detail Modal */}
      {selectedStage && (
        <PipelineModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          stageName={selectedStage.label}
          stageDescription={selectedStage.desc}
          stageCount={selectedStage.count}
          stageColor={selectedStage.color}
          icon={selectedStage.icon}
        />
      )}

    </div>
  );
};
