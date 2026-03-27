"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 backdrop-blur-md sticky top-0 z-50 bg-white/80 dark:bg-[#09090b]/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold text-xl">
              C
            </div>
            <span className="font-bold text-xl uppercase tracking-tighter">ContentForge</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white transition-colors">Features</a>
            <Link href="/puter-demo" className="text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white transition-colors">Puter Demo</Link>
            <a href="#" className="text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white transition-colors">Pricing</a>
          </div>
          <button className="px-5 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black text-sm font-semibold rounded-full hover:opacity-90 transition-all active:scale-[0.98]">
            Get Started
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Beta: 1 Idea → 10+ Viral Content Pieces
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            TURN ONE IDEA <br />
            <span className="text-zinc-300 dark:text-zinc-700">INTO AN EMPIRE.</span>
          </h1>
          <p className="max-w-2xl text-xl text-zinc-500 dark:text-zinc-400 mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            ContentForge AI transforms your YouTube videos and scripts into 
            platform-optimized threads, posts, and short-form scripts in seconds.
            Built on Puter&apos;s serverless cloud infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <button className="px-8 py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-zinc-200 dark:shadow-none">
              Start Building Free
            </button>
            <Link href="/puter-demo" className="px-8 py-4 bg-transparent border border-zinc-200 dark:border-zinc-800 font-bold rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center justify-center">
              Explore Puter APIs
            </Link>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-100 dark:border-zinc-900">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Multi-Platform</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Generated content for Twitter, LinkedIn, and YouTube Shorts from a single input link.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Cloud Native</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Powered by Puter.js for zero-latency AI processing and secure cloud storage.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">SEO Optimized</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Every output is designed to rank and capture maximum attention algorithmically.
                </p>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-20 border-t border-zinc-100 dark:border-zinc-900">
         <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
           <div className="flex items-center gap-2 grayscale brightness-50 dark:brightness-200 opacity-50">
              <Image src="/next.svg" alt="Next.js" width={100} height={20} />
              <span className="text-xl font-bold">x PUTER</span>
           </div>
           <p className="text-zinc-400 text-sm">Built with passion for the creator economy.</p>
         </div>
      </footer>
    </div>
  );
}
