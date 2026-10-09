import { useEffect, useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { LayoutDashboard, LogIn, LogOut, Menu, ShieldCheck, X, History, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [location.pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl shadow-lg shadow-slate-900/5 py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto flex items-center justify-between px-5 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25"><ShieldCheck size={22} /></span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">Fake <span className="text-blue-600">Job Detection</span></span>
        </NavLink>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/job-analysis" className={linkClass}>Job Detector</NavLink>
          {user && <NavLink to="/history" className={linkClass}>History</NavLink>}
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/70">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-xs font-black text-white">DC</div>
              <div className="hidden xl:block"><Link to="/profile"><p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p><p className="text-[10px] text-slate-500">{user.enrollment}</p></Link></div>
              <button onClick={logout} title="Logout" className="rounded-xl p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30"><LogOut size={17} /></button>
            </div>
          ) : (
            <Link to="/login" className="primary-btn px-4 py-2.5"><LogIn size={17} /> Login</Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 right-0 top-full border-t border-slate-200/70 bg-white/95 p-5 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
          <div className="container mx-auto flex flex-col gap-2">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/job-analysis" className={linkClass}>Job Detector</NavLink>
          {user && <NavLink to="/history" className={linkClass}>History</NavLink>}
            <NavLink to="/about" className={linkClass}>About</NavLink>
            {user ? (
              <button onClick={logout} className="mt-2 flex items-center gap-2 rounded-xl p-3 text-left font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"><LogOut size={18} /> Logout · {user.name}</button>
            ) : <Link to="/login" className="primary-btn mt-2"><LogIn size={17} /> Login</Link>}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
