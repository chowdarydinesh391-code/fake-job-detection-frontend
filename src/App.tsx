import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import type { ReactElement } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import JobAnalysis from "./pages/JobAnalysis";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Chatbot from "@/components/chatbot";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: ReactElement }) {
  const { user } = useAuth();
  const location = useLocation();
  return user ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="/job-analysis" element={<RequireAuth><JobAnalysis /></RequireAuth>} />
              <Route path="/history" element={<RequireAuth><History /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <Chatbot />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
