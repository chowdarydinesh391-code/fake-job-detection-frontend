import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, LogIn, ShieldCheck, UserRound, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [enrollment, setEnrollment] = useState("23SEO2ML038");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!login(enrollment, password)) {
      setError("Use enrollment number 23SEO2ML038 and a password with at least 4 characters.");
      return;
    }
    const from = (location.state as { from?: string } | null)?.from || "/dashboard";
    navigate(from, { replace: true });
  };

  return (
    <PageTransition transition="fade">
      <main className="min-h-screen bg-slate-50 px-5 py-10 dark:bg-slate-950 lg:px-8">
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-2">
          <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block">
            <Link to="/" className="mb-10 inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25"><ShieldCheck size={23} /></span>
              <span className="text-xl font-black text-slate-900 dark:text-white">Fake Job Detection</span>
            </Link>
            <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-10 text-white shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-[.2em] text-blue-300">Secure project access</p>
              <h1 className="mt-4 text-5xl font-black leading-tight">Welcome back,<br /><span className="text-cyan-300">Dinesh Chowdary.</span></h1>
              <p className="mt-5 max-w-lg leading-7 text-blue-100">Sign in to access the Fake Job Detection dashboard and analyze suspicious job listings.</p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4"><p className="text-xs text-blue-200">Student</p><p className="mt-1 font-bold">Dinesh Chowdary</p></div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4"><p className="text-xs text-blue-200">Enrollment</p><p className="mt-1 font-bold">23SEO2ML038</p></div>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-md">
            <Link to="/" className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white"><ShieldCheck size={21} /></span>
              <span className="font-black text-slate-900 dark:text-white">Fake Job Detection</span>
            </Link>
            <div className="glass-card rounded-[2rem] p-7 shadow-xl sm:p-9">
              <div className="mb-7">
                <span className="section-kicker"><LockKeyhole size={14} /> Account Login</span>
                <h2 className="mt-4 text-3xl font-black text-slate-950 dark:text-white">Sign in</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">Use your project enrollment number to continue.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Enrollment Number</span>
                  <span className="relative block">
                    <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input value={enrollment} onChange={e => setEnrollment(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 font-semibold uppercase outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                  </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Password</span>
                  <span className="relative block">
                    <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                  </span>
                </label>
                {error && <p className="rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-600 dark:bg-rose-950/30">{error}</p>}
                <button className="primary-btn w-full py-4" type="submit"><LogIn size={18} /> Login <ArrowRight size={18} /></button>
              </form>
              <Link to="/signup" className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-blue-600 hover:underline"><UserPlus size={16}/> Create a new account</Link>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-xs leading-5 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-200">
                <strong>Demo account:</strong> Enrollment <b>23SEO2ML038</b>. For this college-project demo, any password with 4+ characters is accepted.
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </PageTransition>
  );
}
