import { Heart, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto px-5 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white"><ShieldCheck size={21} /></span>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Fake Job Detection</p>
              <p className="text-sm text-slate-500">Smarter job search. Safer career.</p>
            </div>
          </div>
          <p className="flex items-center gap-2 text-sm text-slate-500">
            Made with <Heart size={16} className="fill-current text-rose-500" /> for job seekers
          </p>
        </div>
      </div>
    </footer>
  );
}
