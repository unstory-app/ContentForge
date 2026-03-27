import { Metadata } from "next";
import AppLayout from "@/components/layout/AppLayout";
import LibraryGrid from "@/components/library/LibraryGrid";

export const metadata: Metadata = {
  title: "Content Library | ContentForge AI",
  description: "Manage and distribute your forged content pieces.",
};

export default function LibraryPage() {
  return (
    <AppLayout>
        <div className="max-w-7xl mx-auto px-6 py-12">
            <header className="mb-12">
                <h1 className="text-4xl font-black tracking-tight mb-4">YOUR LIBRARY.</h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    All your forged content, saved securely in the cloud.
                </p>
            </header>
            <LibraryGrid />
        </div>
    </AppLayout>
  );
}
