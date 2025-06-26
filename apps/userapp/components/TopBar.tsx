"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Send, History } from "lucide-react"; // Example icons

const navItems = [
  { href: "/dashboard", title: "Dashboard", icon: <Home /> },
  { href: "/transfer", title: "Transfer", icon: <Send /> },
  { href: "/transactions", title: "Transactions", icon: <History /> },
];

export default function TopBar() {
  const pathname = usePathname();
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow">
      <span className="text-2xl font-bold text-indigo-700">PayVia</span>
      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
              pathname === item.href ? "text-indigo-600" : "text-slate-500"
            }`}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}