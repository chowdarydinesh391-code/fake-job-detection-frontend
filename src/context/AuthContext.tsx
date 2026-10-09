import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = { name: string; enrollment: string };
const DEFAULT_USER: User = { name: "Dinesh Chowdary", enrollment: "23SEO2ML038" };

type AuthContextType = {
  user: User | null;
  login: (enrollment: string, password: string) => boolean;
  signup: (name: string, enrollment: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (profile: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { const saved = localStorage.getItem("fjd_user"); return saved ? JSON.parse(saved) : null; } catch { return null; }
  });
  useEffect(() => { if (user) localStorage.setItem("fjd_user", JSON.stringify(user)); else localStorage.removeItem("fjd_user"); }, [user]);
  const login = (enrollment: string, password: string) => {
    const key = enrollment.trim().toUpperCase();
    const accounts = (() => { try { return JSON.parse(localStorage.getItem("fjd_accounts") || "{}"); } catch { return {}; } })();
    const stored = accounts[key];
    const ok = password.length >= 4 && ((key === DEFAULT_USER.enrollment && !stored) || stored?.password === password);
    if (ok) {
      const profile = stored?.profile || JSON.parse(localStorage.getItem("fjd_user_profile") || "null") || DEFAULT_USER;
      setUser(profile);
    }
    return ok;
  };
  const signup = (name: string, enrollment: string, password: string) => {
    const key = enrollment.trim().toUpperCase();
    if (!name.trim() || !key || password.length < 4) return false;
    const accounts = (() => { try { return JSON.parse(localStorage.getItem("fjd_accounts") || "{}"); } catch { return {}; } })();
    if (accounts[key]) return false;
    accounts[key] = { password, profile: { name: name.trim(), enrollment: key } };
    localStorage.setItem("fjd_accounts", JSON.stringify(accounts));
    localStorage.setItem("fjd_user_profile", JSON.stringify(accounts[key].profile));
    setUser(accounts[key].profile);
    return true;
  };
  const updateProfile = (profile: User) => { setUser(profile); localStorage.setItem("fjd_user_profile", JSON.stringify(profile)); };
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error("useAuth must be used inside AuthProvider"); return ctx; }
