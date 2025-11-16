import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OWASP from "./pages/OWASP";
import Practices from "./pages/Practices";
import Checklists from "./pages/Checklists";
import Templates from "./pages/Templates";
import SocialEngineering from "./pages/SocialEngineering";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/owasp" element={<OWASP />} />
          <Route path="/practices" element={<Practices />} />
          <Route path="/checklists" element={<Checklists />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/social-engineering" element={<SocialEngineering />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
