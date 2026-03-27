"use client";

import { useState, useEffect } from "react";
import { puterAI, puterKV, puterFS, puterAuth, getPuter } from "@/lib/puter";

export default function PuterDashboard() {
    const [status, setStatus] = useState("Initializing...");
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [aiOutput, setAiOutput] = useState("");
    const [kvValue, setKvValue] = useState("");
    const [fsList, setFsList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const checkPuter = () => {
            const puter = getPuter();
            if (puter) {
                setStatus("Puter.js Loaded");
                checkAuth();
            } else {
                setTimeout(checkPuter, 500);
            }
        };
        checkPuter();
    }, []);

    const checkAuth = async () => {
        try {
            const signedIn = await puterAuth.isSignedIn();
            if (signedIn) {
                const userData = await puterAuth.getUser();
                setUser(userData);
            }
        } catch (e) {
            console.error("Auth check failed", e);
        }
    };

    const setLoading = (key: string, value: boolean) => {
        setIsLoading(prev => ({ ...prev, [key]: value }));
    };

    const testAI = async () => {
        setLoading("ai", true);
        setAiOutput("Generating response...");
        try {
            const response = await puterAI.chat("Explain ContentForge AI in one catchy sentence.");
            setAiOutput(response.message.content);
        } catch (e) {
            setAiOutput("Error with AI: " + e);
        } finally {
            setLoading("ai", false);
        }
    };

    const testKV = async () => {
        setLoading("kv", true);
        try {
            await puterKV.set("test-key", "Hello from ContentForge!");
            const val = await puterKV.get("test-key");
            setKvValue(val.value);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading("kv", false);
        }
    };

    const testFS = async () => {
        setLoading("fs", true);
        try {
            await puterFS.write("hello.txt", "Puter Cloud Storage Test");
            const list = await puterFS.list();
            setFsList(list.map((f) => f.name));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading("fs", false);
        }
    };

    const testTTS = async () => {
        setLoading("tts", true);
        try {
            await puterAI.txt2speech("Welcome to ContentForge AI, powered by Puter.");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading("tts", false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
            <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                    <span className="text-xs font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400">
                        {status}
                    </span>
                </div>
                {user ? (
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{user.username}</span>
                        <button 
                            onClick={() => puterAuth.signOut().then(() => setUser(null))}
                            className="text-sm text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
                        >
                            Log out
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => puterAuth.signIn().then(checkAuth)}
                        className="px-4 py-1.5 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black text-sm font-medium rounded-lg hover:opacity-90 transition-all"
                    >
                        Sign in with Puter
                    </button>
                )}
            </div>

            <div className="max-w-3xl mb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                    Cloud OS for your <br />
                    <span className="text-zinc-400 dark:text-zinc-600">content engine.</span>
                </h1>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    ContentForge AI integrates Puter.js to provide zero-latency AI, 
                    cloud storage, and NoSQL databases directly in your browser.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* AI Service */}
                <section className="group p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all bg-white dark:bg-transparent">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-2">AI Intelligence</h2>
                        <p className="text-sm text-zinc-500">Access GPT-4, Claude 3, and Gemini Pro instantly.</p>
                    </div>
                    <button 
                        onClick={testAI} 
                        disabled={isLoading["ai"]}
                        className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium text-sm transition-transform active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading["ai"] ? "Processing..." : "Generate AI Insight"}
                    </button>
                    {aiOutput && (
                        <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm border border-zinc-100 dark:border-zinc-800 animate-in fade-in slide-in-from-bottom-2">
                            {aiOutput}
                        </div>
                    )}
                </section>

                {/* Storage Service */}
                <section className="group p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all bg-white dark:bg-transparent">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-2">Cloud Storage</h2>
                        <p className="text-sm text-zinc-500">Persistent file system for your assets and logic.</p>
                    </div>
                    <button 
                        onClick={testFS} 
                        disabled={isLoading["fs"]}
                        className="w-full py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl font-medium text-sm border border-zinc-200 dark:border-zinc-700 transition-transform active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading["fs"] ? "Syncing..." : "Test File System"}
                    </button>
                    {fsList.length > 0 && (
                        <div className="mt-6 space-y-2">
                            {fsList.map(f => (
                                <div key={f} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-xs border border-zinc-100 dark:border-zinc-800">
                                    <span className="font-medium">📄 {f}</span>
                                    <span className="text-zinc-400">Cloud</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* KV Service */}
                <section className="group p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all bg-white dark:bg-transparent">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-2">NoSQL Database</h2>
                        <p className="text-sm text-zinc-500">Key-Value store for your application state.</p>
                    </div>
                    <button 
                        onClick={testKV} 
                        disabled={isLoading["kv"]}
                        className="w-full py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl font-medium text-sm border border-zinc-200 dark:border-zinc-700 transition-transform active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading["kv"] ? "Saving..." : "Test KV Store"}
                    </button>
                    {kvValue && (
                        <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm border border-zinc-100 dark:border-zinc-800">
                            <span className="text-zinc-400 mr-2">Value:</span>
                            <span className="font-mono">{kvValue}</span>
                        </div>
                    )}
                </section>

                {/* Multimedia Service */}
                <section className="group p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all bg-white dark:bg-transparent">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-2">Multimedia</h2>
                        <p className="text-sm text-zinc-500">Text-to-Speech and OCR capabilities.</p>
                    </div>
                    <button 
                        onClick={testTTS}
                        disabled={isLoading["tts"]}
                        className="w-full py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl font-medium text-sm border border-zinc-200 dark:border-zinc-700 transition-transform active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading["tts"] ? "Buffering..." : "Test Voice API"}
                    </button>
                </section>

                {/* Networking Service */}
                <section className="group p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all bg-white dark:bg-transparent">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-2">Global Networking</h2>
                        <p className="text-sm text-zinc-500">Direct Sockets and Peer-to-Peer connectivity.</p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 font-mono text-xs text-zinc-500">
                        puter.net.Socket()
                    </div>
                </section>
            </div>
        </div>
    );
}
