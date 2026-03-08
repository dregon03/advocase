import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0f1e]/80 border-b border-white/5">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">
              A
            </div>
            <span className="text-lg font-bold tracking-tight">Advocase</span>
          </div>
          <Link
            href="/dashboard"
            className="bg-white text-slate-900 hover:bg-slate-100 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-white/10"
          >
            Open Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px] animate-pulse [animation-delay:2s]" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-blue-300">Live — 44th Parliament</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold leading-[1.0] tracking-tight mb-10">
              <span className="block">Track every</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                bill.
              </span>
              <span className="block mt-1">Know every</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                lobbyist.
              </span>
            </h1>

            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              Explore Dashboard
            </Link>
          </div>

          {/* Floating cards */}
          <div className="relative hidden lg:block h-[480px]">
            <div className="absolute top-0 right-0 w-80 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 animate-float shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">BILL 75</span>
                <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2.5 py-0.5 rounded-full font-medium">Second Reading</span>
              </div>
              <div className="text-sm font-semibold text-white mb-1">Keeping Criminals Behind Bars Act</div>
              <div className="text-xs text-slate-500">Kerzner &middot; Solicitor General</div>
            </div>

            <div className="absolute top-44 -left-8 w-72 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 animate-float [animation-delay:1.5s] shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xs font-bold">RE</div>
                <div>
                  <div className="text-sm font-semibold text-white">Rod Elliot</div>
                  <div className="text-xs text-slate-400">Global Public Affairs</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-red-500/15 text-red-300 px-2 py-0.5 rounded-full">Former Gov</span>
                <span className="text-xs bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full">Consultant</span>
              </div>
            </div>

            <div className="absolute top-[360px] right-12 w-56 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 animate-float [animation-delay:3s] shadow-2xl shadow-black/20">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-xs text-slate-300">Bill 72 — Royal Assent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span className="text-xs text-slate-300">New reg — Shopify</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  <span className="text-xs text-slate-300">Bill 75 — Debate adj.</span>
                </div>
              </div>
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 500">
              <line x1="200" y1="80" x2="80" y2="240" stroke="url(#lg)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="80" x2="300" y2="400" stroke="url(#lg)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="80" y1="240" x2="300" y2="400" stroke="url(#lg)" strokeWidth="1" strokeDasharray="4 4" />
              <defs>
                <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "92+", label: "Bills" },
            { value: "4,041", label: "Lobbyist Registrations" },
            { value: "15+", label: "Ministries" },
            { value: "8", label: "Committees" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                {s.value}
              </div>
              <div className="text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bill Pipeline */}
      <section className="py-28 px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Every bill.<br />
              <span className="text-slate-500">Every stage.</span>
            </h2>
            <Link href="/dashboard/bills" className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-2 group transition">
              See all bills <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
            <div className="space-y-4">
              {[
                { bill: "Bill 75", stage: "Second Reading", color: "bg-yellow-400", width: "w-2/5" },
                { bill: "Bill 9", stage: "Third Reading", color: "bg-blue-400", width: "w-3/5" },
                { bill: "Bill 40", stage: "Royal Assent", color: "bg-green-400", width: "w-full" },
                { bill: "Bill 17", stage: "Royal Assent", color: "bg-green-400", width: "w-full" },
                { bill: "Bill 61", stage: "Lost", color: "bg-red-400", width: "w-1/3" },
              ].map((b) => (
                <div key={b.bill} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-white">{b.bill}</span>
                    <span className="text-xs text-slate-500">{b.stage}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${b.color} rounded-full ${b.width} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Relationship Map */}
      <section className="py-28 px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 order-2 lg:order-1">
            <div className="space-y-3">
              {[
                { from: "Rod Elliot", to: "Stephen Lecce", former: true },
                { from: "Jennifer Wright", to: "Rob Flack", former: false },
                { from: "Robert Bhatt", to: "Sylvia Jones", former: true },
                { from: "Michelle Duong", to: "Stephen Lecce", former: false },
                { from: "Lisa Moreau", to: "David Piccini", former: true },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {r.from.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="text-xs font-medium text-white flex-1 truncate">{r.from}</span>
                  {r.former && <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-full">Former Gov</span>}
                  <svg width="20" height="10" className="text-slate-600 flex-shrink-0">
                    <line x1="0" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
                    <polygon points="17,2 20,5 17,8" fill="currentColor" />
                  </svg>
                  <span className="text-xs font-medium text-white flex-shrink-0">{r.to}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Who&apos;s lobbying<br />
              <span className="text-slate-500">whom.</span>
            </h2>
            <Link href="/dashboard/lobbyists" className="text-purple-400 hover:text-purple-300 text-sm font-medium inline-flex items-center gap-2 group transition">
              See all lobbyists <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-28 px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🚪", title: "Revolving Door", desc: "Former insiders now lobbying.", href: "/dashboard/revolving-door", accent: "from-red-500 to-orange-500" },
              { icon: "🏛️", title: "Committees", desc: "8 standing committees tracked.", href: "/dashboard/committees", accent: "from-indigo-500 to-blue-500" },
              { icon: "⚔️", title: "Competitive", desc: "Who else is lobbying your issue.", href: "/dashboard/competitive", accent: "from-amber-500 to-orange-500" },
              { icon: "👤", title: "Stakeholders", desc: "Ministers and key MPPs.", href: "/dashboard/stakeholders", accent: "from-cyan-500 to-blue-500" },
              { icon: "🏭", title: "Sectors", desc: "Industry heat map.", href: "/dashboard/sectors", accent: "from-green-500 to-emerald-500" },
              { icon: "📅", title: "Timeline", desc: "Activity feed.", href: "/dashboard/timeline", accent: "from-purple-500 to-pink-500" },
            ].map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            See what&apos;s happening<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              at Queen&apos;s Park.
            </span>
          </h2>
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-10 py-4 rounded-full text-base font-semibold transition-all hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            Open the Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded flex items-center justify-center text-[9px] font-bold">A</div>
            <span className="font-medium text-slate-500">Advocase</span>
          </div>
          <span>ola.org &middot; oico.on.ca</span>
        </div>
      </footer>
    </div>
  );
}
