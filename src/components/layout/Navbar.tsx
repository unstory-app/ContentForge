import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 backdrop-blur-md sticky top-0 z-50 bg-white/80 dark:bg-[#09090b]/80">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold text-xl">
            C
          </div>
          <span className="font-bold text-xl uppercase tracking-tighter">ContentForge</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white transition-colors">Features</a>
          <Link href="/dashboard" className="text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white transition-colors">Dashboard</Link>
          <a href="#" className="text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white transition-colors">Pricing</a>
        </div>
        <button className="px-5 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black text-sm font-semibold rounded-full hover:opacity-90 transition-all active:scale-[0.98]">
          Get Started
        </button>
      </div>
    </nav>
  );
}
