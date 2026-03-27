import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PuterDashboard from "@/components/puter/PuterDashboard";

export const metadata: Metadata = {
  title: "Puter Demo | ContentForge AI",
  description: "Explore the power of Puter.js v2 services integrated into ContentForge AI. Test AI models, cloud storage, and NoSQL databases directly in the browser.",
};

export default function PuterDemoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
      <Navbar />
      <main>
        <PuterDashboard />
      </main>
      <Footer />
    </div>
  );
}
