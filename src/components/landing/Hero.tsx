import Link from "next/link";

export default function Hero() {
  return (
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
        <button className="px-8 py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-zinc-200 dark:shadow-none outline-none">
          Start Building Free
        </button>
        <Link href="/puter-demo" className="px-8 py-4 bg-transparent border border-zinc-200 dark:border-zinc-800 font-bold rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center justify-center">
          Explore Puter APIs
        </Link>
      </div>
    </section>
  );
}
