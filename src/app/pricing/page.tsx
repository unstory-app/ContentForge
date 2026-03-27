import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check } from "lucide-react";

export default function PricingPage() {
    const tiers = [
        {
            name: "Creator",
            price: "Free",
            description: "Perfect for starting your content journey.",
            features: ["5 Forge sessions / mo", "Standard AI models", "Puter Cloud Sync", "Community support"],
            button: "Get Started",
            highlight: false
        },
        {
            name: "Pro",
            price: "$29",
            description: "For creators scaling their presence.",
            features: ["Unlimited Forge sessions", "Premium Claude/Gemini models", "Custom Brand Voice", "Priority support", "Direct Export to X"],
            button: "Go Pro",
            highlight: true
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-24">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic">
                        PRICING <br />
                        <span className="text-zinc-300 dark:text-zinc-700">FOR BUILDERS.</span>
                    </h1>
                    <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                        Simple, transparent pricing to help you forge an empire.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {tiers.map((tier) => (
                        <div key={tier.name} className={`
                            p-10 border rounded-[2rem] flex flex-col h-full transition-all
                            ${tier.highlight 
                                ? "bg-zinc-900 border-zinc-800 text-white dark:bg-white dark:text-black dark:border-white shadow-2xl scale-105 z-10" 
                                : "bg-white border-zinc-100 dark:bg-transparent dark:border-zinc-900"
                            }
                        `}>
                            <h3 className="text-lg font-bold uppercase tracking-widest mb-2 opacity-60">{tier.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-5xl font-black">{tier.price}</span>
                                {tier.price !== "Free" && <span className="text-sm font-bold opacity-60">/mo</span>}
                            </div>
                            <p className="text-sm font-medium mb-10 opacity-70">{tier.description}</p>
                            
                            <ul className="space-y-4 mb-12 flex-1">
                                {tier.features.map(f => (
                                    <li key={f} className="flex items-center gap-3 text-sm font-bold">
                                        <Check size={16} className={tier.highlight ? "text-blue-400" : "text-zinc-400"} />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button className={`
                                w-full py-4 rounded-2xl font-black transition-all active:scale-[0.98]
                                ${tier.highlight 
                                    ? "bg-white text-black dark:bg-black dark:text-white" 
                                    : "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-black"
                                }
                            `}>
                                {tier.button}
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
