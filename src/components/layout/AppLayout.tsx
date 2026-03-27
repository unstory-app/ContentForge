"use client";

import Sidebar from "./Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
            <Sidebar />
            <main className="flex-1 overflow-y-auto max-h-screen">
                {children}
            </main>
        </div>
    );
}
