"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useState, useEffect } from "react";
import { puterAuth, puterKV } from "@/lib/puter";

export default function SettingsPage() {
    const [user, setUser] = useState<{ username: string; uid: string } | null>(null);
    const [brandVoice, setBrandVoice] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (await puterAuth.isSignedIn()) {
                const data = await puterAuth.getUser();
                setUser(data);
                
                // Load brand voice from KV
                try {
                    const kv = await puterKV.get("brand_voice");
                    if (kv && kv.value) setBrandVoice(kv.value);
                } catch (err) {}
            }
        };
        load();
    }, []);

    const saveBrandVoice = async () => {
        setIsSaving(true);
        try {
            await puterKV.set("brand_voice", brandVoice);
            alert("Brand Voice updated successfully!");
        } catch (err) {
            alert("Failed to save brand voice.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-6 py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight mb-4">SETTINGS.</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Manage your account and cloud environment.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <section className="p-8 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-transparent flex flex-col gap-6">
                        <h2 className="text-xl font-bold">Brand Voice Studio</h2>
                        <p className="text-sm text-zinc-500">Describe your tone (e.g., &quot;Aggressive, data-driven, uses emojis, short sentences&quot;). This trains your ContentForge AI.</p>
                        <textarea 
                            value={brandVoice}
                            onChange={(e) => setBrandVoice(e.target.value)}
                            placeholder="e.g. Professional yet edgy, focusing on actionable advice for SaaS founders..."
                            className="w-full h-40 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all font-medium"
                        />
                        <button 
                            onClick={saveBrandVoice}
                            disabled={isSaving}
                            className="w-full py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black font-bold rounded-xl text-sm transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {isSaving ? "Saving..." : "Update Brand Voice"}
                        </button>
                    </section>
                    
                    <div className="space-y-12">
                        <section className="p-8 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-transparent">
                            <h2 className="text-xl font-bold mb-6">Profile</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Username</label>
                                    <div className="text-lg font-medium">{user?.username || "Guest"}</div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Puter ID</label>
                                    <div className="text-sm font-mono text-zinc-500">{user?.uid || "N/A"}</div>
                                </div>
                            </div>
                        </section>

                        <section className="p-8 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-transparent flex flex-col">
                            <h2 className="text-xl font-bold mb-6">Account Actions</h2>
                            <button 
                                onClick={() => puterAuth.signOut().then(() => window.location.href = '/')}
                                className="px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-xl text-sm border border-red-100 dark:border-red-900/30 transition-all active:scale-[0.98]"
                            >
                                Sign Out of ContentForge
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
