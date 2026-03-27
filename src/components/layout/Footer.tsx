import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
        <div className="flex items-center gap-2 grayscale brightness-50 dark:brightness-200 opacity-50">
          <Image src="/next.svg" alt="Next.js" width={100} height={20} />
          <span className="text-xl font-bold">x PUTER</span>
        </div>
        <p className="text-zinc-400 text-sm">Built with passion for the creator economy.</p>
      </div>
    </footer>
  );
}
