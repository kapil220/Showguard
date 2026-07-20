import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Squares2X2Icon,
  CalendarIcon,
  ChartBarIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Squares2X2Icon },
    { name: "Appointments", path: "/appointments", icon: CalendarIcon },
    { name: "Analytics", path: "/analytics", icon: ChartBarIcon },
    { name: "Intelligence", path: "/intelligence", icon: CpuChipIcon },
    { name: "Go Live", path: "/go-live", icon: RocketLaunchIcon },
    { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
  ];

  const handleLogout = async () => {
    console.log("[SIDEBAR] Triggering user logout...");
    await logout();
    navigate("/login");
  };

  // Extract initial and username display from email
  const userEmail = user?.email || "User";
  const userInitial = userEmail.charAt(0).toUpperCase();
  const userName = userEmail.split("@")[0];

  return (
    <aside className="w-64 bg-ink text-canvas-soft flex flex-col justify-between h-screen border-r border-ink-soft select-none shrink-0">
      <div className="flex flex-col gap-xl py-xl px-lg">
        {/* Branding header */}
        <div className="flex items-center gap-md px-xs">
          <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
            {/* Embedded Lightning Bolt SVG */}
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 10V3L4 14H11V21L20 10H13Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="font-display text-body-lg font-bold tracking-tight text-white leading-none">
              <span>Show</span>
              <span className="text-primary">Guard</span>
            </div>
            <span className="text-[10px] tracking-[0.25em] font-semibold text-body-mid mt-xs leading-none uppercase">
              Intelligence
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-xxs mt-md">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center gap-md py-md px-lg rounded-sm text-body-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-white/5 text-white"
                    : "text-body-mid hover:text-white hover:bg-white/2"
                }`}
              >
                {/* Active Indicator Line on the left */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-primary rounded-r-full" />
                )}

                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-body-mid group-hover:text-canvas-soft"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Section */}
      <div className="border-t border-ink-soft p-lg flex flex-col gap-md">
        {/* User profile row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-md">
            <div className="w-9 h-9 rounded-md bg-ink-mid border border-ink-soft flex items-center justify-center font-display text-body-md font-semibold text-primary shrink-0 select-none">
              {userInitial}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-body-sm font-semibold text-white truncate max-w-[120px]" title={userEmail}>
                {userName}
              </span>
            </div>
          </div>
          {/* Active online indicator green dot */}
          <div className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-sm text-body-sm text-body-mid hover:text-white transition-colors duration-200 cursor-pointer text-left w-full select-none"
        >
          <ArrowRightStartOnRectangleIcon className="w-5 h-5 shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};
