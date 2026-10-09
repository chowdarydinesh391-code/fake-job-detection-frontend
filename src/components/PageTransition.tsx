
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  transition?: "fade" | "slide-up" | "slide-left" | "slide-right";
}

export default function PageTransition({
  children,
  className = "",
  transition = "fade",
}: PageTransitionProps) {
  // Define different animation variants
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    "slide-up": {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    "slide-left": {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    "slide-right": {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
  };

  const selectedVariant = variants[transition];

  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={{ duration: 0.4 }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
