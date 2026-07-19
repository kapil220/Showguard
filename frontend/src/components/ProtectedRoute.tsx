import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  console.log(`[PROTECTED ROUTE] Checking access. loading: ${loading}, authenticated: ${!!user}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas text-ink flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-md">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <span className="text-body-sm font-semibold tracking-wide animate-pulse">
            Verifying Authentication...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("[PROTECTED ROUTE] Guest user blocked. Redirecting to /login.");
    return <Navigate to="/login" replace />;
  }

  console.log("[PROTECTED ROUTE] User authenticated. Access granted.");
  return <>{children}</>;
};
