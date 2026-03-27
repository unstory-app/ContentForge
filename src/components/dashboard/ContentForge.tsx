"use client";

import { useState } from "react";
import { puterAI, puterFS, puterKV } from "@/lib/puter";

interface ContentPiece {
    type: string;
    content: string;
}

export default function ContentForge() {
    const [input, setInput] = useState("");
    const [hookStyle, setHookStyle] = useState("Discovery");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<ContentPiece[]>([]);
    const [error, setError] = useState("");

    const hookStyles = ["Discovery", "Controversial", "Storytelling", "Educational", "Aggressive"];

    const handleForge = async () => {
        if (!input) return;
        setIsLoading(true);
        setError("");
        setResults([]);

        try {
            // Load brand voice
            let brandVoice = "Expert content strategist, clear, concise, and professional.";
            try {
                const kv = await puterKV.get("brand_voice");
                if (kv && kv.value) brandVoice = kv.value;
            } catch (err) {}

            const prompt = `
                Act as a world-class content strategist. 
                Your Brand Voice: "${brandVoice}"
                Style of Hooks: "${hookStyle}"
                
                For the following input (YouTube link or idea): "${input}"
                Generate the following content pieces to maximize reach:
                1. 5 Viral Tweets (each with a hook styled as "${hookStyle}" and value)
                2. 3 Short-form Video Scripts (intro, middle, hook-outro)
                3. 1 High-authority LinkedIn Post (structured with storytelling and CTA)
                
                Return the response in a structured format that I can easily parse. Use clear headings for each piece.
            `;

            const response = await puterAI.chat(prompt, { model: "claude-3-5-sonnet" });
            const rawContent = response.message.content;
            
            // Simple parsing logic (can be refined with more structured prompting)
            const pieces: ContentPiece[] = [];
            
            if (rawContent.includes("Tweet")) {
                pieces.push({ type: "Twitter Threads", content: rawContent.split("Short-form")[0] });
            }
            if (rawContent.includes("Short-form")) {
                pieces.push({ type: "Video Scripts", content: rawContent.split("Short-form")[1].split("LinkedIn")[0] || rawContent.split("Short-form")[1] });
            }
            if (rawContent.includes("LinkedIn")) {
                pieces.push({ type: "LinkedIn Post", content: rawContent.split("LinkedIn")[1] });
            }

            if (pieces.length === 0) {
                pieces.push({ type: "Generated Content", content: rawContent });
            }

            setResults(pieces);
        } catch (err: any) {
            setError(err.message || "Failed to generate content. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const saveToCloud = async (content: string, type: string) => {
        try {
            const fileName = `library/forge_${Date.now()}_${type.toLowerCase().replace(/\s+/g, "_")}.txt`;
            // Ensure directory
            try { await puterFS.mkdir("library"); } catch(err) {}
            await puterFS.write(fileName, content);
            alert("Saved to Content Library!");
        } catch (err) {
            alert("Failed to save to cloud.");
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <header className="mb-12">
                <h1 className="text-4xl font-black tracking-tight mb-4 italic">THE FORGE.</h1>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-lg">
                    Turn one idea into an empire. We generate X threads, scripts, and LinkedIn authority posts in seconds.
                </p>
            </header>

            <div className="space-y-6 mb-12">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Content Source</label>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste a YouTube link or describe your big idea..."
                        className="w-full h-32 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all font-medium"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Hook Style</label>
                    <div className="flex flex-wrap gap-2">
                        {hookStyles.map(style => (
                            <button
                                key={style}
                                onClick={() => setHookStyle(style)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                                    hookStyle === style 
                                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white" 
                                    : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400"
                                }`}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleForge}
                    disabled={isLoading}
                    className="w-full py-5 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black font-black text-lg rounded-3xl transition-all active:scale-[0.98] disabled:opacity-50 hover:shadow-2xl hover:-translate-y-1"
                >
                    {isLoading ? "FORGING CONTENT..." : "FORGE CONTENT"}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 mb-8">
                    {error}
                </div>
            )}

            <div className="space-y-8">
                {results.map((piece, i) => (
                    <div key={i} className="p-8 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] bg-white dark:bg-transparent animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{piece.type}</span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => {
                                        const text = encodeURIComponent(piece.content.substring(0, 280));
                                        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                                    }}
                                    className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-lg hover:bg-blue-100 transition-all"
                                >
                                    PUBLISH TO X
                                </button>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(piece.content);
                                        alert("Copied to clipboard!");
                                    }}
                                    className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900 text-[10px] font-bold rounded-lg hover:bg-zinc-100 transition-all"
                                >
                                    COPY
                                </button>
                                <button 
                                    onClick={() => saveToCloud(piece.content, piece.type)}
                                    className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-lg hover:opacity-90 transition-all"
                                >
                                    SAVE TO CLOUD
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
                            {piece.content.trim()}
                        </div>
                    </div>
                ))}
            </div>

            {results.length === 0 && !isLoading && !error && (
                <div className="text-center py-32 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-3xl">
                    <p className="text-zinc-400 font-medium">Your forged content will appear here.</p>
                </div>
            )}
        </div>
    );
}
