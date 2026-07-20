import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Dashboard } from "./pages/Dashboard";
import { Appointments } from "./pages/Appointments";
import { Analytics } from "./pages/Analytics";
import { Intelligence } from "./pages/Intelligence";
import { GoLive } from "./pages/GoLive";
import { Settings } from "./pages/Settings";
import { AppLayout } from "./components/AppLayout";

export default function App() {
  console.log("[APP] Initializing React router paths...");
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Area */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/go-live" element={<GoLive />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Catch-all: Redirect to dashboard if logged in, otherwise ProtectedRoute redirects to login */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
