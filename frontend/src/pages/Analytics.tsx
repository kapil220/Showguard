import React, { useState } from "react";
import {
  ArrowPathIcon,
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { BTN_SECONDARY } from "../constants/uiStyles";

// Status breakdown items specification
const STATUS_ITEMS = [
  { label: "New", count: 0, percentage: "0%", color: "bg-slate-500" },
  { label: "Contacted", count: 0, percentage: "0%", color: "bg-blue-500" },
  { label: "Confirmed", count: 0, percentage: "0%", color: "bg-emerald-500" },
  { label: "At Risk", count: 0, percentage: "0%", color: "bg-rose-500" },
  { label: "Showed", count: 0, percentage: "0%", color: "bg-teal-500" },
  { label: "No-Show", count: 0, percentage: "0%", color: "bg-orange-500" },
  { label: "Recovery", count: 0, percentage: "0%", color: "bg-amber-500" },
];

const WEEK_DAYS = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

export const Analytics: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trendRange, setTrendRange] = useState("Last 7 days");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="flex-1 bg-[#fbfbfd] text-ink p-6 flex flex-col gap-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-display">Analytics</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Appointment intelligence insights
          </p>
        </div>

        <button onClick={handleRefresh} className={BTN_SECONDARY}>
          <ArrowPathIcon className={`w-4 h-4 text-gray-500 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: APPOINTMENTS */}
        <div className="bg-white border border-gray-100/80 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[130px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider uppercase text-gray-500 font-display">
              APPOINTMENTS
            </span>
            <div className="p-1.5 rounded-lg bg-orange-50 text-orange-500 border border-orange-100">
              <CalendarIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold text-gray-900 font-display">0</div>
            <div className="text-xs text-gray-500 mt-1">0 confirmed</div>
          </div>
        </div>

        {/* Card 2: SHOW RATE */}
        <div className="bg-white border border-gray-100/80 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[130px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider uppercase text-gray-500 font-display">
              SHOW RATE
            </span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-500 border border-rose-100">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold text-gray-900 font-display">0%</div>
            <div className="text-xs text-gray-500 mt-1">0 showed / 0 no-show</div>
          </div>
        </div>

        {/* Card 3: SMS SENT */}
        <div className="bg-white border border-gray-100/80 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[130px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider uppercase text-gray-500 font-display">
              SMS SENT
            </span>
            <div className="p-1.5 rounded-lg bg-sky-50 text-sky-500 border border-sky-100">
              <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold text-gray-900 font-display">0</div>
            <div className="text-xs text-gray-500 mt-1">this month</div>
          </div>
        </div>

        {/* Card 4: VOICE CALLS */}
        <div className="bg-white border border-gray-100/80 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[130px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider uppercase text-gray-500 font-display">
              VOICE CALLS
            </span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-500 border border-purple-100">
              <PhoneIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold text-gray-900 font-display">0</div>
            <div className="text-xs text-gray-500 mt-1">this month</div>
          </div>
        </div>

      </div>

      {/* Middle Row: 3 Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Widget 1: Status Breakdown */}
        <div className="bg-white border border-gray-100/80 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="12" width="4" height="8" rx="1" />
              <rect x="10" y="8" width="4" height="12" rx="1" />
              <rect x="17" y="4" width="4" height="16" rx="1" />
            </svg>
            <h3 className="text-xs font-bold text-gray-900 font-display">Status Breakdown</h3>
          </div>

          <div className="flex-1 flex items-center justify-between gap-4">
            {/* Left: Donut Chart */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#F1F5F9"
                  strokeWidth="4"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-900 font-display">0</span>
                <span className="text-[10px] text-gray-400 font-medium">Total</span>
              </div>
            </div>

            {/* Right: Legend Breakdown List */}
            <div className="flex-1 flex flex-col gap-1.5 text-xs">
              {STATUS_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-gray-700 font-medium">{item.label}</span>
                  </div>
                  <span className="text-gray-400 font-medium">{item.count} ({item.percentage})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget 2: Avg Risk Score */}
        <div className="bg-white border border-gray-100/80 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="w-4 h-4 text-rose-500" />
            <h3 className="text-xs font-bold text-gray-900 font-display">Avg Risk Score</h3>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center my-2">
            {/* Clean Rounded Gauge Arc without any bottom clipping or pink blocks */}
            <div className="relative w-44 h-24 flex items-end justify-center">
              <svg className="w-44 h-24" viewBox="0 0 100 56">
                <path
                  d="M 14 48 A 36 36 0 0 1 86 48"
                  fill="none"
                  stroke="#FFE4E6"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute bottom-0 flex flex-col items-center">
                <span className="text-3xl font-bold text-red-600 font-display leading-none">0</span>
                <span className="text-xs font-semibold text-gray-500 mt-1">High Risk</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <span className="text-xs text-gray-400 font-medium">Keep monitoring to reduce risk</span>
          </div>
        </div>

        {/* Widget 3: 7-Day Trend */}
        <div className="bg-white border border-gray-100/80 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowTrendingUpIcon className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs font-bold text-gray-900 font-display">7-Day Trend</h3>
            </div>

            <div className="relative">
              <select
                value={trendRange}
                onChange={(e) => setTrendRange(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-md py-1 pl-2.5 pr-6 text-xs font-medium text-gray-600 focus:outline-none cursor-pointer"
              >
                <option value="Last 7 days">Last 7 days</option>
                <option value="Last 30 days">Last 30 days</option>
              </select>
              <ChevronDownIcon className="w-3 h-3 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
            </div>
          </div>

          {/* Graph Plot */}
          <div className="flex-1 flex gap-2 pt-4 pb-1">
            {/* Y-Axis */}
            <div className="flex flex-col justify-between text-xs text-gray-400 font-medium pr-1">
              <span>1</span>
              <span>0.5</span>
              <span>0</span>
            </div>

            {/* Plot area */}
            <div className="flex-1 flex flex-col justify-between relative border-b border-gray-200">
              {/* Gridlines */}
              <div className="absolute inset-x-0 top-0 border-b border-dashed border-gray-100" />
              <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-gray-100" />

              {/* Baseline trend line and points */}
              <div className="flex-1 flex items-end justify-between relative z-10 px-1">
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-orange-400" />
                {WEEK_DAYS.map((day) => (
                  <div key={day} className="flex flex-col items-center gap-1 relative z-20">
                    <span className="text-xs text-gray-600 font-bold -mb-1">0</span>
                    <div className="w-2 h-2 rounded-full bg-orange-500 border border-white shadow-xs" />
                    <span className="text-xs text-gray-400 font-medium translate-y-5">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-4" />
        </div>

      </div>

      {/* Bottom Row: Recent Activity Card */}
      <div className="bg-white border border-gray-100/80 rounded-xl p-6 shadow-xs flex flex-col min-h-[240px]">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <BoltIcon className="w-4 h-4 text-orange-500" />
            <h3 className="text-xs font-bold text-gray-900 font-display">Recent Activity</h3>
          </div>

          <div className="flex items-center gap-2">
            <button className="text-xs text-orange-600 hover:text-orange-700 font-medium cursor-pointer transition-colors">
              View all
            </button>
            <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center">
              0
            </span>
          </div>
        </div>

        {/* Center Inbox Illustration & Text */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="relative mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-orange-500 to-amber-500 p-0.5 shadow-md shadow-orange-500/20">
              <div className="w-full h-full bg-orange-50 rounded-[14px] flex items-center justify-center">
                <svg className="w-7 h-7 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                  <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
                </svg>
              </div>
            </div>
          </div>

          <h4 className="text-sm font-bold text-gray-900 font-display">No activity yet</h4>
          <p className="text-xs text-gray-500 mt-1 max-w-sm leading-relaxed">
            Events will appear here as appointments are processed, messages are sent, and calls are made.
          </p>
        </div>
      </div>

    </div>
  );
};
