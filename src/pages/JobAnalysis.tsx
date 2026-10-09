import { useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, FileText, Loader2, ScanSearch, ShieldCheck, Sparkles, Download, History as HistoryIcon, Wifi, WifiOff, BrainCircuit, ExternalLink, Building2, Gauge, Globe2, SearchCheck } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DragDropUploader from "@/components/DragDropUploader";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://fake-job-detection-backend-w5t3.onrender.com";

const API_URL =
  import.meta.env.VITE_API_URL || `${API_BASE}/predict`;
const suspicious = ["payment", "urgent", "wire transfer", "no experience", "personal info", "limited time", "click here", "easy money", "registration fee", "whatsapp", "telegram", "otp", "bank details"];
type Signal = { label: string; matches?: string[] };
type Result = { isFake: boolean; score: number; confidence: number; reasons: string[]; signals: Signal[]; source: string; company: string; url: string };

const explain = (isFake: boolean, score: number, signals: Signal[]) => {
  if (signals.length) return `The model result is supported by ${signals.length} suspicious signal${signals.length > 1 ? "s" : ""}. Review the employer and never pay money to obtain a job.`;
  return isFake ? `The ML model flagged this listing as risky (${score}%). Verify the company, recruiter and application channel before sharing information.` : `The listing was not strongly flagged by the model. A low score is not proof of legitimacy, so verify the employer independently.`;
};

export default function JobAnalysis() {
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [backendOnline, setBackendOnline] = useState(false);
  const [urlCheck, setUrlCheck] = useState<any>(null);
  const [companyCheck, setCompanyCheck] = useState<any>(null);
  const [checkingUrl, setCheckingUrl] = useState(false);
  const [checkingCompany, setCheckingCompany] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const getSignals = (text: string): Signal[] => {
    const lower = text.toLowerCase();
    const words = suspicious.filter((word) => lower.includes(word));
    return words.slice(0, 8).map((word) => ({ label: word.replace(/\b\w/g, c => c.toUpperCase()), matches: [word] }));
  };

  const analyzeUrl = async () => {
    if (!url.trim()) { toast({ title: "Enter a URL", description: "Add the company or job website first.", variant: "destructive" }); return; }
    setCheckingUrl(true);
    try { const r = await fetch(`${API_BASE}/analyze-url`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) }); if (!r.ok) throw new Error(); setUrlCheck(await r.json()); setBackendOnline(true); }
    catch { toast({ title: "URL check failed", description: "Make sure the Flask backend is running.", variant: "destructive" }); } finally { setCheckingUrl(false); }
  };

  const verifyCompany = async () => {
    if (!company.trim() && !url.trim()) { toast({ title: "Add company details", description: "Enter a company name or website.", variant: "destructive" }); return; }
    setCheckingCompany(true);
    try { const r = await fetch(`${API_BASE}/verify-company`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ company, url }) }); if (!r.ok) throw new Error(); setCompanyCheck(await r.json()); setBackendOnline(true); }
    catch { toast({ title: "Verification failed", description: "Make sure the Flask backend is running.", variant: "destructive" }); } finally { setCheckingCompany(false); }
  };

  const analyze = async () => {
    if (!description.trim()) {
      toast({ title: "Add a job description", description: "Paste text or upload a PDF/TXT file first.", variant: "destructive" });
      return;
    }
    setAnalyzing(true); setResult(null);
    try {
      const response = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ description: description.trim() }) });
      if (!response.ok) throw new Error("Backend unavailable");
      const data = await response.json(); setBackendOnline(true);
      const isFake = Boolean(data.isFake ?? String(data.prediction || "").toLowerCase().includes("fake"));
      const localSignals = getSignals(description);
      const signals: Signal[] = data.signals?.length ? data.signals : localSignals;
      const score = typeof data.score === "number" ? Math.round(data.score) : Math.min(97, Math.max(8, isFake ? 68 + signals.length * 4 : 18 + signals.length * 5));
      const confidence = typeof data.confidence === "number" ? Math.round(data.confidence) : Math.min(99, Math.max(55, 100 - Math.abs(50 - score)));
      const reasons = signals.length ? signals.slice(0, 5).map((s: Signal) => `${s.label}${s.matches?.length ? `: ${s.matches.join(", ")}` : " detected"}`) : isFake ? ["The machine-learning model flagged this listing as potentially fraudulent."] : ["No common scam phrases were detected in the text."];
      const nextResult = { isFake, score, confidence, reasons, signals, source: "ML model + scam signal scan", company, url };
      setResult(nextResult);
      const history = (() => { try { return JSON.parse(localStorage.getItem("fjd_history") || "[]"); } catch { return []; } })();
      history.unshift({ id: Date.now(), preview: description.trim().slice(0, 180), isFake, score, confidence, reasons, signals, company, url, createdAt: new Date().toISOString(), user: user?.enrollment });
      localStorage.setItem("fjd_history", JSON.stringify(history.slice(0, 100)));
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch {
      setBackendOnline(false); toast({ title: "Backend not connected", description: "Start the Flask API at http://127.0.0.1:5000 and try again.", variant: "destructive" });
    } finally { setAnalyzing(false); }
  };

  return <PageTransition transition="slide-left"><Navbar /><main className="min-h-screen bg-slate-50 px-5 pb-24 pt-28 dark:bg-slate-950 lg:px-8"><div className="container mx-auto max-w-6xl">
    <div className="mx-auto mb-10 max-w-3xl text-center"><span className="section-kicker"><ScanSearch size={15}/> AI job safety scanner</span><h1 className="section-title mt-4">Check a job before you apply.</h1><p className="section-copy">ML prediction, confidence, scam indicators and practical safety guidance in one report.</p><div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold shadow-sm dark:border-slate-800 dark:bg-slate-900">{backendOnline ? <><Wifi size={14} className="text-emerald-500"/> Backend connected</> : <><WifiOff size={14} className="text-amber-500"/> Backend status: connect when analyzing</>}</div></div>
    <div className="mb-6 grid gap-4 md:grid-cols-2">
      <button onClick={analyzeUrl} disabled={checkingUrl} className="secondary-btn justify-center">{checkingUrl ? <><Loader2 size={17} className="animate-spin"/> Checking URL...</> : <><Globe2 size={18}/> Analyze Job / Company URL</>}</button>
      <button onClick={verifyCompany} disabled={checkingCompany} className="secondary-btn justify-center">{checkingCompany ? <><Loader2 size={17} className="animate-spin"/> Verifying...</> : <><SearchCheck size={18}/> Quick Company Verification</>}</button>
    </div>
    {(urlCheck || companyCheck) && <div className="mb-8 grid gap-5 md:grid-cols-2">
      {urlCheck && <div className="glass-card rounded-3xl p-6"><div className="flex items-center gap-3"><Globe2 className="text-blue-600"/><div><h3 className="font-black dark:text-white">URL security check</h3><p className="text-xs text-slate-500">Heuristic screening, not live reputation verification.</p></div></div><div className="mt-5 flex items-center justify-between"><span className="text-sm font-bold">URL risk</span><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">{urlCheck.score || 0}%</span></div>{urlCheck.flags?.length ? <ul className="mt-4 space-y-2">{urlCheck.flags.map((f:string)=><li key={f} className="text-sm text-slate-600 dark:text-slate-300">• {f}</li>)}</ul> : <p className="mt-4 text-sm text-emerald-700">No basic URL red flags detected.</p>}</div>}
      {companyCheck && <div className="glass-card rounded-3xl p-6"><div className="flex items-center gap-3"><SearchCheck className="text-emerald-600"/><div><h3 className="font-black dark:text-white">Company verification</h3><p className="text-xs text-slate-500">Name/domain consistency and basic website checks.</p></div></div><div className="mt-5 flex items-center justify-between"><span className="text-sm font-bold">Trust indicator</span><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">{companyCheck.trustScore || 0}%</span></div>{companyCheck.flags?.length ? <ul className="mt-4 space-y-2">{companyCheck.flags.map((f:string)=><li key={f} className="text-sm text-slate-600 dark:text-slate-300">• {f}</li>)}</ul> : <p className="mt-4 text-sm text-emerald-700">No basic consistency red flags detected.</p>}</div>}
    </div>}
    <div className="mb-6 grid gap-4 md:grid-cols-2"><div><label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Company name <span className="font-normal text-slate-400">(optional)</span></label><div className="relative"><Building2 className="absolute left-4 top-3.5 text-slate-400" size={18}/><input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Example: ABC Technologies" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900"/></div></div><div><label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Company / job URL <span className="font-normal text-slate-400">(optional)</span></label><div className="relative"><ExternalLink className="absolute left-4 top-3.5 text-slate-400" size={18}/><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://company.com/careers" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900"/></div></div></div>
    <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]"><motion.div initial={{opacity:0,x:-15}} animate={{opacity:1,x:0}} className="glass-card rounded-[2rem] p-6 lg:p-8"><div className="mb-6 flex items-center gap-3"><span className="icon-box"><FileText size={21}/></span><div><h2 className="font-bold text-slate-900 dark:text-white">Upload listing</h2><p className="text-sm text-slate-500">PDF or TXT</p></div></div><DragDropUploader onExtractedText={setDescription}/><div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm leading-6 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-200"><strong className="flex items-center gap-2"><ShieldCheck size={16}/> Safety tip</strong> Never pay an employer to get a job or share OTP, bank or card information before verifying the company.</div></motion.div>
      <motion.div initial={{opacity:0,x:15}} animate={{opacity:1,x:0}} className="glass-card rounded-[2rem] p-6 lg:p-8"><div className="mb-5 flex items-center justify-between"><div><h2 className="font-bold text-slate-900 dark:text-white">Job description</h2><p className="text-sm text-slate-500">Paste the complete listing for better analysis.</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800">{description.length} chars</span></div><textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Example: We are hiring a remote data entry specialist..." className="min-h-[360px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"/><button onClick={analyze} disabled={analyzing} className="primary-btn mt-5 w-full py-4">{analyzing ? <><Loader2 className="animate-spin" size={19}/> Analyzing with AI...</> : <><ScanSearch size={19}/> Analyze Job</>}</button></motion.div></div>
    {result && <motion.div ref={resultRef} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className={`mt-8 rounded-[2rem] border p-6 shadow-xl lg:p-8 ${result.isFake?"border-rose-200 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/20":"border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/20"}`}>
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_220px]"><div><div className={`mb-3 flex items-center gap-3 ${result.isFake?"text-rose-600":"text-emerald-600"}`}>{result.isFake?<AlertTriangle size={30}/>:<CheckCircle2 size={30}/>}<span className="text-sm font-bold uppercase tracking-widest">{result.isFake?"High risk detected":"Looks safer"}</span></div><h2 className="text-3xl font-black text-slate-900 dark:text-white">{result.isFake?"Potential Fake Job":"Potentially Legitimate Job"}</h2><p className="mt-2 text-slate-600 dark:text-slate-300">{result.company || "Job listing"}{result.company && result.url ? " • " : ""}{result.url}</p><div className="mt-4 rounded-2xl border border-blue-100 bg-white/70 p-4 dark:border-blue-900/50 dark:bg-slate-900/60"><p className="flex gap-2 text-sm leading-6 text-slate-700 dark:text-slate-200"><BrainCircuit className="mr-2 inline text-blue-600" size={17}/>{explain(result.isFake,result.score,result.signals)}</p></div><ul className="mt-5 space-y-3">{result.reasons.map(reason=><li key={reason} className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-200"><span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${result.isFake?"bg-rose-500":"bg-emerald-500"}`}/>{reason}</li>)}</ul></div><div className="relative mx-auto grid h-48 w-48 place-items-center rounded-full bg-white shadow-lg dark:bg-slate-900"><div className={`absolute inset-3 rounded-full border-[12px] ${result.isFake?"border-rose-100 dark:border-rose-950":"border-emerald-100 dark:border-emerald-950"}`}/><div className="text-center"><p className="text-4xl font-black text-slate-900 dark:text-white">{result.score}%</p><p className="text-xs font-bold uppercase tracking-widest text-slate-500">risk score</p><p className="mt-2 text-xs font-bold text-blue-600">{result.confidence}% confidence</p></div></div></div>
      <div className="mt-7 grid gap-4 border-t border-current/10 pt-5 md:grid-cols-3"><div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/60"><Gauge className="text-blue-600" size={20}/><p className="mt-2 text-xs font-bold uppercase text-slate-500">Risk level</p><p className="font-black dark:text-white">{result.score>=75?"High":result.score>=45?"Medium":"Low"}</p></div><div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/60"><AlertTriangle className="text-amber-500" size={20}/><p className="mt-2 text-xs font-bold uppercase text-slate-500">Signals found</p><p className="font-black dark:text-white">{result.signals.length}</p></div><div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/60"><ShieldCheck className="text-emerald-500" size={20}/><p className="mt-2 text-xs font-bold uppercase text-slate-500">Advice</p><p className="font-black dark:text-white">Verify before applying</p></div></div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row"><button onClick={()=>window.print()} className="secondary-btn flex-1"><Download size={17}/> Print / Save PDF Report</button><a href="/history" className="secondary-btn flex-1"><HistoryIcon size={17}/> View History</a></div>
    </motion.div>}
    <section className="mt-16"><div className="mx-auto mb-8 max-w-2xl text-center"><span className="section-kicker"><Sparkles size={15}/> Explainable workflow</span><h2 className="section-title text-3xl">From listing to risk report</h2></div><div className="grid gap-5 md:grid-cols-4">{[["01","Upload or paste","Add a job description as text, PDF or TXT."],["02","ML prediction","Your Flask model evaluates the listing."],["03","Explain + verify","Review scam signals, URL and company checks."],["04","Take action","Use the score and guidance before applying."]].map(([n,t,d])=><div key={n} className="glass-card rounded-3xl p-6"><span className="text-sm font-black text-blue-600">{n}</span><h3 className="mt-4 text-lg font-bold dark:text-white">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{d}</p></div>)}</div></section>
  </div></main><Footer/></PageTransition>;
}
