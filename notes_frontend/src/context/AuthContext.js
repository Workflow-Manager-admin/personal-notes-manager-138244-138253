import React, { createContext, useContext, useState, useEffect } from "react";
import * as authApi from "../services/authApi";

// AuthContext to provide authentication state throughout the app
const AuthContext = createContext();

// PUBLIC_INTERFACE: AuthProvider for wrapping app
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authApi.getSavedUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // (Optional) Validate token/session on mount
  }, []);

  // PUBLIC_INTERFACE: login with username/password
  const login = async (email, password) => {
    setLoading(true);
    try {
      const user = await authApi.login(email, password);
      setUser(user);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE: register/signup
  const register = async (email, password) => {
    setLoading(true);
    try {
      const user = await authApi.register(email, password);
      setUser(user);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE: logout and clear session
  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE: useAuth hook for access
export function useAuth() {
  return useContext(AuthContext);
}
