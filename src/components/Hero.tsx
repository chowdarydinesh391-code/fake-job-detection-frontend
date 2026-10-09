import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import introanime from "./Animation - 1742719199461.json";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-slate-50 pt-28 dark:bg-slate-950">
      <div className="hero-grid absolute inset-0 opacity-70" />
      <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />

      <div className="container relative mx-auto grid items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur dark:border-blue-900 dark:bg-slate-900/70 dark:text-blue-300">
            <Sparkles size={16} /> AI-powered job safety
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            Spot fake jobs before they{" "}
            <span className="gradient-text">cost you.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Analyze job descriptions with machine learning and practical scam signals.
            Get a clear risk result in seconds—so you can apply with confidence.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/job-analysis" className="primary-btn">
              Check a Job <ArrowRight size={19} />
            </Link>
            <Link to="/about" className="secondary-btn">How it works</Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600 dark:text-slate-300">
            {["PDF & TXT upload", "Instant analysis", "Simple risk insights"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-500" /> {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: .92, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: .7, delay: .15 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute inset-10 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="glass-card relative rounded-[2rem] p-5 shadow-2xl shadow-blue-900/10 sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">Fake Job Detection AI</p>
                <p className="mt-1 font-semibold text-slate-800 dark:text-white">Fraud detection assistant</p>
              </div>
              <ShieldCheck className="text-emerald-500" />
            </div>
            <Lottie animationData={introanime} loop autoplay className="mx-auto w-full max-w-sm" />
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/80">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Protection status</span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600"><span className="status-dot" /> Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
