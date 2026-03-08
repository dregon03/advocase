"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "My Dashboard", href: "/dashboard", icon: "🏠" },
  { label: "Bills", href: "/dashboard/bills", icon: "📜" },
  { label: "Lobbying Activity", href: "/dashboard/competitive", icon: "📡" },
  { label: "Lobbyists", href: "/dashboard/lobbyists", icon: "🤝" },
  { label: "Stakeholders", href: "/dashboard/stakeholders", icon: "👤" },
  { label: "Sectors", href: "/dashboard/sectors", icon: "🏭" },
  { label: "Revolving Door", href: "/dashboard/revolving-door", icon: "🚪" },
  { label: "Committees", href: "/dashboard/committees", icon: "🏛️" },
  { label: "Timeline", href: "/dashboard/timeline", icon: "📅" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-[#0f172a] text-white min-h-screen flex flex-col">
      <div className="p-5 border-b border-slate-700">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Advocase
        </Link>
        <div className="text-xs text-slate-400 mt-0.5">Ontario GR Intelligence</div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1.5">Active Client</div>
        <div className="text-sm font-semibold text-white">Brookfield Properties</div>
        <div className="text-xs text-slate-400 mt-0.5">Real Estate Development</div>
        <div className="flex gap-1 mt-2">
          <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">High Risk</span>
        </div>
      </div>
      <div className="p-4 border-t border-slate-700">
        <div className="text-xs text-slate-500">44th Parliament, 1st Session</div>
        <div className="text-xs text-slate-500">Data: ola.org / oico.on.ca</div>
      </div>
    </aside>
  );
}
