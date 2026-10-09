import { motion } from "framer-motion";
import { BrainCircuit, FileSearch, LockKeyhole, Server, ShieldCheck, Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import teamAnimation from "./Animation - 1742749560990.json";

const stack = [
  { title: "Machine Learning", text: "The trained model evaluates job descriptions and predicts whether a listing is likely to be fraudulent.", icon: BrainCircuit },
  { title: "NLP & Text Signals", text: "Text processing helps identify suspicious wording, promises, urgency and payment-related signals.", icon: FileSearch },
  { title: "Flask API", text: "A lightweight Python API connects the trained model to the React interface for real-time predictions.", icon: Server },
  { title: "Secure by Design", text: "The interface encourages users to verify employers and avoid sharing sensitive information with untrusted recruiters.", icon: LockKeyhole },
];

export default function About() {
  return (
    <PageTransition transition="slide-left">
      <Navbar />
      <main className="min-h-screen bg-slate-50 px-5 pb-24 pt-28 dark:bg-slate-950 lg:px-8">
        <section className="container mx-auto grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="section-kicker"><Sparkles size={15} /> About the project</span>
            <h1 className="section-title">Technology that puts job safety first.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              JobGuard is a final-year project focused on detecting potentially fraudulent job postings using machine learning and natural-language signals.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-300">
              <ShieldCheck /> Designed to help job seekers make safer decisions.
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6 }}>
            <div className="glass-card rounded-[2rem] p-6 shadow-2xl shadow-blue-900/10">
              <Lottie animationData={teamAnimation} loop className="mx-auto w-full max-w-lg" />
            </div>
          </motion.div>
        </section>

        <section className="container mx-auto py-12">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="section-kicker">Project architecture</span>
            <h2 className="section-title text-3xl">From job text to useful insight.</h2>
            <p className="section-copy">A simple full-stack flow connects the user interface, Python API and trained ML model.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {stack.map(({ title, text, icon: Icon }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
                className="glass-card rounded-3xl p-7">
                <div className="icon-box mb-5"><Icon size={22} /></div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
