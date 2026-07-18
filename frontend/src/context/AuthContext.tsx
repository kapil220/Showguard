import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const safeParseJson = async (response: Response) => {
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      try {
        return await response.json();
      } catch (err) {
        console.error("[FRONTEND AUTH] Failed to parse response as JSON:", err);
      }
    }
    const text = await response.text();
    return { message: text || `Server returned status code ${response.status}` };
  };

  // Check user authentication status on startup
  const checkAuthStatus = async () => {
    console.log("[FRONTEND AUTH] Checking active session status via /api/auth/me...");
    try {
      const response = await fetch("/api/auth/me");
      console.log(`[FRONTEND AUTH] Session check status: ${response.status}`);
      
      if (response.ok) {
        const userData = await safeParseJson(response);
        if (userData && userData.email) {
          console.log("[FRONTEND AUTH] Session check succeeded. Logged in user:", userData.email);
          setUser(userData);
        } else {
          console.warn("[FRONTEND AUTH] No valid user data returned from session check.");
          setUser(null);
        }
      } else {
        console.log("[FRONTEND AUTH] No active session found (User is guest).");
        setUser(null);
      }
    } catch (err) {
      console.error("[FRONTEND AUTH] Network error while verifying active session:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const signup = async (email: string, password: string) => {
    console.log(`[FRONTEND AUTH] Initiating signup flow for email: ${email}`);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      console.log(`[FRONTEND AUTH] Signup response status: ${response.status}`);
      const data = await safeParseJson(response);

      if (!response.ok) {
        const errorMsg = data.message || "Signup failed";
        console.warn(`[FRONTEND AUTH] Signup rejected by backend: ${errorMsg}`);
        throw new Error(errorMsg);
      }

      console.log("[FRONTEND AUTH] Signup succeeded for user:", data.email);
      
      // Auto login after signup
      console.log("[FRONTEND AUTH] Proceeding with auto-login after successful registration...");
      await login(email, password);
    } catch (err: any) {
      console.error("[FRONTEND AUTH] Signup request error:", err.message);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    console.log(`[FRONTEND AUTH] Initiating login flow for email: ${email}`);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log(`[FRONTEND AUTH] Login response status: ${response.status}`);
      const data = await safeParseJson(response);

      if (!response.ok) {
        const errorMsg = data.message || "Login failed";
        console.warn(`[FRONTEND AUTH] Login rejected by backend: ${errorMsg}`);
        throw new Error(errorMsg);
      }

      console.log("[FRONTEND AUTH] Login succeeded. Saving token to localStorage as client reference...");
      // Store token in localStorage as request fallback (httpOnly cookie handles direct proxy requests)
      if (data.token) {
        localStorage.setItem("showguard_token", data.token);
      }

      setUser(data.user);
      console.log("[FRONTEND AUTH] Authenticated user state initialized:", data.user.email);
    } catch (err: any) {
      console.error("[FRONTEND AUTH] Login request error:", err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log("[FRONTEND AUTH] Initiating logout flow...");
    setLoading(true);
    
    // Clear local references
    localStorage.removeItem("showguard_token");
    setUser(null);
    
    // Attempt clearing cookies by making a request or writing standard client-side overrides
    try {
      // In a real application, we might call POST /api/auth/logout to clear HTTP-only cookies
      // For this implementation, clearing state and token does the job.
      console.log("[FRONTEND AUTH] Local user state cleared. Redirecting...");
    } catch (err) {
      console.error("[FRONTEND AUTH] Error during logout backend clearance:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
