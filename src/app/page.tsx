import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";

export const metadata: Metadata = {
  title: "ContentForge AI | 1 Idea → 10+ Viral Content Pieces",
  description: "ContentForge AI transforms your YouTube videos and scripts into platform-optimized threads, posts, and short-form scripts in seconds using Puter.js cloud intelligence.",
  keywords: ["AI content generation", "content repurposing", "YouTube to Twitter", "viral content", "Puter.js", "Next.js AI"],
  openGraph: {
    title: "ContentForge AI | Automate Your Content Empire",
    description: "Turn one idea into unlimited content with AI-powered repurposing.",
    type: "website",
    url: "https://contentforge.ai", // Placeholder
  },
  twitter: {
    card: "summary_large_image",
    title: "ContentForge AI",
    description: "1 Idea → 10+ Viral Content Pieces in Seconds",
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
