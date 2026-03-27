"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    Library, 
    Settings, 
    CreditCard, 
    Zap,
    History
} from "lucide-react";

const navItems = [
    { name: "Forge Workspace", href: "/dashboard", icon: LayoutDashboard },
    { name: "Content Library", href: "/library", icon: Library },
    { name: "Usage History", href: "#", icon: History },
    { name: "Upgrade to Pro", href: "/pricing", icon: Zap, highlight: true },
];

const footerItems = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Billing", href: "/pricing", icon: CreditCard },
];

export default function Sidebar() {
    const pathname = usePathname();

    const NavLink = ({ item }: { item: typeof navItems[0] }) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
            <Link 
                href={item.href}
                className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                    ${isActive 
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-lg" 
                        : "text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }
                    ${item.highlight ? "text-blue-600 dark:text-blue-400" : ""}
                `}
            >
                <Icon size={18} />
                {item.name}
            </Link>
        );
    };

    return (
        <aside className="w-64 border-r border-zinc-100 dark:border-zinc-900 h-screen sticky top-0 bg-white dark:bg-[#09090b] flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center gap-2 mb-12 px-2">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold text-xl">
                    C
                </div>
                <span className="font-bold text-lg uppercase tracking-tighter">ContentForge</span>
            </div>

            <nav className="flex-1 flex flex-col gap-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 px-4">Menu</div>
                {navItems.map((item) => (
                    <NavLink key={item.href} item={item} />
                ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col gap-2">
                {footerItems.map((item) => (
                    <NavLink key={item.href} item={item} />
                ))}
            </div>
        </aside>
    );
}
