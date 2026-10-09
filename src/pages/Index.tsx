import { AlertTriangle, BarChart3, FileSearch, Languages, ShieldCheck, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import FeatureCard from "@/components/FeatureCard";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const features = [
  ["AI Pattern Recognition", "Machine-learning patterns help identify signals commonly associated with fraudulent job listings.", BarChart3],
  ["Suspicious Signal Scan", "Find warning signs such as payment requests, unrealistic promises and urgency-driven language.", AlertTriangle],
  ["Document Analysis", "Upload PDF or TXT job descriptions and extract their text directly in your browser.", FileSearch],
  ["Language Analysis", "NLP-oriented checks look at wording, structure and suspicious phrases in a listing.", Languages],
  ["Clear Risk Result", "Get a simple result with a risk score and practical reasons instead of confusing technical output.", ShieldCheck],
  ["Job Seeker First", "Designed for quick checks before you share personal information or spend time applying.", Users],
] as const;

export default function Index() {
  return (
    <PageTransition transition="fade">
      <Navbar />
      <Hero />

      <section className="relative bg-white px-5 py-24 dark:bg-slate-950 lg:px-8">
        <div className="container mx-auto">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="section-kicker">Built for safer applications</span>
            <h2 className="section-title">One quick check. More confidence.</h2>
            <p className="section-copy">A clean workflow that combines your project’s ML model with user-friendly scam indicators.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, description, icon], i) => (
              <FeatureCard key={title} title={title} description={description} icon={icon} delay={i * .06} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-20 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-8 text-white shadow-2xl lg:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[.2em] text-blue-300">Ready to check?</p>
                <h3 className="mt-3 text-3xl font-black sm:text-4xl">Don’t let a fake offer decide your next move.</h3>
                <p className="mt-4 max-w-2xl text-blue-100">Paste a job description or upload a file and run the detector.</p>
              </div>
              <Link to="/job-analysis" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-blue-700 shadow-lg transition hover:-translate-y-1">
                Open Detector <ArrowRight size={19} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </PageTransition>
  );
}
