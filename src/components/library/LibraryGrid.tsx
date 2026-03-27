"use client";

import { useState, useEffect } from "react";
import { puterFS } from "@/lib/puter";

interface SavedContent {
    name: string;
    content: string;
    date: string;
}

export default function LibraryGrid() {
    const [savedFiles, setSavedFiles] = useState<SavedContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadLibrary = async () => {
            try {
                // Ensure the library directory exists
                try { await puterFS.mkdir("library"); } catch(e) {}
                
                const files = await puterFS.list("library");
                const contents = await Promise.all(
                    files.map(async (file) => {
                        const content = await puterFS.read(`library/${file.name}`);
                        return { 
                            name: file.name, 
                            content: content.toString(),
                            date: new Date(file.mtime).toLocaleDateString()
                        };
                    })
                );
                setSavedFiles(contents);
            } catch (e) {
                console.error("Failed to load library", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadLibrary();
    }, []);

    const deleteFile = async (name: string) => {
        if (!confirm("Are you sure you want to delete this forged content?")) return;
        try {
            await puterFS.delete(`library/${name}`);
            setSavedFiles(prev => prev.filter(f => f.name !== name));
        } catch (e) {
            alert("Delete failed");
        }
    };

    if (isLoading) {
        return <div className="p-12 text-center text-zinc-400">Loading your content library...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedFiles.map((file, idx) => (
                <div key={idx} className="group p-8 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all bg-white dark:bg-transparent flex flex-col h-fit">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{file.date}</span>
                        <button 
                            onClick={() => deleteFile(file.name)}
                            className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            Delete
                        </button>
                    </div>
                    <div className="text-sm line-clamp-6 leading-relaxed mb-6 text-zinc-600 dark:text-zinc-400 font-medium italic">
                        &quot;{file.content.substring(0, 300)}...&quot;
                    </div>
                    <button 
                        onClick={() => {
                            navigator.clipboard.writeText(file.content);
                            alert("Content copied!");
                        }}
                        className="mt-auto py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                        Copy Full Content
                    </button>
                </div>
            ))}

            {savedFiles.length === 0 && (
                <div className="col-span-full py-40 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-3xl text-center">
                    <p className="text-zinc-400 font-medium">Your library is currently empty. Start forging!</p>
                </div>
            )}
        </div>
    );
}
