import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export default function FeatureCard({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .5, delay }} viewport={{ once: true }}
      className="glass-card group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10 dark:hover:border-blue-800"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-950/60 dark:text-blue-400">
          <Icon size={24} />
        </div>
        <ArrowUpRight className="text-slate-300 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{description}</p>
    </motion.div>
  );
}
