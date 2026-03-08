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
          <div className="flex items-center gap-6">
            <span className="text-sm text-slate-400 hidden md:block">Ontario GR Intelligence</span>
            <Link
              href="/dashboard"
              className="bg-white text-slate-900 hover:bg-slate-100 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-white/10"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px] animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[200px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-blue-300">Live — 44th Parliament, 1st Session</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
              <span className="block">Track every</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                bill.
              </span>
              <span className="block mt-2">Know every</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                lobbyist.
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
              Real-time legislative intelligence from the Ontario Legislative Assembly
              and lobbyist registry — powered by AI analysis.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
              >
                Explore the Dashboard
              </Link>
              <Link
                href="/dashboard/bills"
                className="text-sm text-slate-400 hover:text-white transition group flex items-center gap-2"
              >
                Browse Bills
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right — Live Data Cards */}
          <div className="relative hidden lg:block">
            {/* Floating bill card 1 */}
            <div className="absolute top-0 right-0 w-80 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 animate-float shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">BILL 75</span>
                <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2.5 py-0.5 rounded-full font-medium">
                  Second Reading
                </span>
              </div>
              <div className="text-sm font-semibold text-white mb-1">Keeping Criminals Behind Bars Act</div>
              <div className="text-xs text-slate-500 mb-3">Sponsor: Michael S. Kerzner &middot; Solicitor General</div>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-full">Justice</span>
                <span className="text-xs bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-full">Public Safety</span>
              </div>
            </div>

            {/* Floating lobbyist card */}
            <div className="absolute top-44 -left-8 w-72 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 animate-float [animation-delay:1.5s] shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xs font-bold">RE</div>
                <div>
                  <div className="text-sm font-semibold text-white">Rod Elliot</div>
                  <div className="text-xs text-slate-400">Global Public Affairs</div>
                </div>
              </div>
              <div className="text-xs text-slate-500 mb-2">Lobbying: Energy policy, wood products, labour</div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-red-500/15 text-red-300 px-2 py-0.5 rounded-full">Former Gov</span>
                <span className="text-xs bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full">Consultant</span>
              </div>
            </div>

            {/* Floating activity card */}
            <div className="absolute top-[360px] right-12 w-64 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 animate-float [animation-delay:3s] shadow-2xl shadow-black/20">
              <div className="text-xs text-slate-400 mb-2 font-medium">LATEST ACTIVITY</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-xs text-slate-300">Bill 72 — Royal Assent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-xs text-slate-300">Bill 40 — Royal Assent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span className="text-xs text-slate-300">New lobbying reg — Shopify</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  <span className="text-xs text-slate-300">Bill 75 — Debate adjourned</span>
                </div>
              </div>
            </div>

            {/* Connection lines (decorative) */}
            <svg className="absolute inset-0 w-full h-[500px] pointer-events-none opacity-20" viewBox="0 0 400 500">
              <line x1="200" y1="80" x2="80" y2="240" stroke="url(#line-gradient)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="80" x2="300" y2="400" stroke="url(#line-gradient)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="80" y1="240" x2="300" y2="400" stroke="url(#line-gradient)" strokeWidth="1" strokeDasharray="4 4" />
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-slate-500">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-500">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="relative py-24 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "92+", label: "Bills Tracked", sub: "44th Parliament" },
              { value: "4,041", label: "Lobbyist Registrations", sub: "Active in Ontario" },
              { value: "15+", label: "Ministries Mapped", sub: "Full coverage" },
              { value: "8", label: "Standing Committees", sub: "Members & business" },
            ].map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  {s.value}
                </div>
                <div className="text-sm font-medium text-white mt-2">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section 1 — Bill Intelligence */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">Bill Intelligence</div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Every bill.
              <br />
              <span className="text-slate-400">Every stage.</span>
              <br />
              <span className="text-slate-500">Every vote.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-md">
              Track legislation from first reading to Royal Assent. See who sponsors what,
              which committees are reviewing it, and how fast it is moving through the pipeline.
            </p>
            <Link href="/dashboard/bills" className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-2 group transition">
              Explore Bills
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          {/* Visual — Bill Pipeline */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="space-y-4">
              {[
                { bill: "Bill 75", title: "Keeping Criminals Behind Bars Act", stage: "Second Reading", color: "bg-yellow-400", width: "w-2/5" },
                { bill: "Bill 9", title: "Municipal Accountability Act", stage: "Third Reading", color: "bg-blue-400", width: "w-3/5" },
                { bill: "Bill 40", title: "Affordable Energy Act", stage: "Royal Assent", color: "bg-green-400", width: "w-full" },
                { bill: "Bill 17", title: "Building Faster Act", stage: "Royal Assent", color: "bg-green-400", width: "w-full" },
                { bill: "Bill 61", title: "AI Strategy Act", stage: "Lost", color: "bg-red-400", width: "w-1/3" },
              ].map((b) => (
                <div key={b.bill} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-xs font-semibold text-white">{b.bill}</span>
                      <span className="text-xs text-slate-500 ml-2">{b.title}</span>
                    </div>
                    <span className="text-xs text-slate-400">{b.stage}</span>
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

      {/* Feature Section 2 — Lobbyist Intelligence */}
      <section className="py-32 px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual — Network */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-sm order-2 lg:order-1">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-5 font-medium">Relationship Map</div>
            <div className="space-y-3">
              {[
                { from: "Rod Elliot", org: "Global Public Affairs", to: "Stephen Lecce", topic: "Energy policy", former: true },
                { from: "Jennifer Wright", org: "OREA", to: "Rob Flack", topic: "Housing supply", former: false },
                { from: "Robert Bhatt", org: "Earnscliffe", to: "Sylvia Jones", topic: "Healthcare staffing", former: true },
                { from: "Michelle Duong", org: "Shopify", to: "Stephen Lecce", topic: "AI innovation", former: false },
                { from: "Lisa Moreau", org: "Hill+Knowlton", to: "David Piccini", topic: "Gig worker policy", former: true },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-3 group hover:bg-white/[0.06] transition">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {r.from.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white truncate">{r.from}</span>
                      {r.former && <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-full flex-shrink-0">Former Gov</span>}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">{r.org}</div>
                  </div>
                  <svg width="20" height="10" className="text-slate-600 flex-shrink-0">
                    <line x1="0" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
                    <polygon points="17,2 20,5 17,8" fill="currentColor" />
                  </svg>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-medium text-white">{r.to}</div>
                    <div className="text-[10px] text-slate-500">{r.topic}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-4">Lobbyist Intelligence</div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Who&apos;s lobbying
              <br />
              <span className="text-slate-400">whom. And why.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-md">
              Map relationships between lobbyists, organizations, and government officials.
              Track revolving door movements, lobbying goals, and communication techniques.
            </p>
            <Link href="/dashboard/lobbyists" className="text-purple-400 hover:text-purple-300 text-sm font-medium inline-flex items-center gap-2 group transition">
              Explore Lobbyist Intelligence
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlight Quote */}
      <section className="py-24 px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-3xl md:text-4xl font-bold leading-snug mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              &ldquo;Government relations shouldn&apos;t be about who you know.
              It should be about what you know.&rdquo;
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            Advocase levels the playing field with data-driven GR intelligence.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for Ontario GR</h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              From bill tracking to competitive analysis — a complete intelligence platform
              built on real public data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "📜",
                title: "Bill Tracker",
                desc: "92+ bills with status, sponsors, sectors, and committee assignments. Filter and search in real time.",
                href: "/dashboard/bills",
                accent: "from-blue-500 to-cyan-500",
              },
              {
                icon: "🤝",
                title: "Lobbyist Registry",
                desc: "4,000+ registrations with targets, goals, communication techniques, and corporate structure.",
                href: "/dashboard/lobbyists",
                accent: "from-purple-500 to-pink-500",
              },
              {
                icon: "🚪",
                title: "Revolving Door",
                desc: "Former government insiders now lobbying. Track who left office and who they're targeting.",
                href: "/dashboard/revolving-door",
                accent: "from-red-500 to-orange-500",
              },
              {
                icon: "🏛️",
                title: "Committee Intelligence",
                desc: "8 standing committees — members, party balance, scheduled meetings, and active business.",
                href: "/dashboard/committees",
                accent: "from-indigo-500 to-blue-500",
              },
              {
                icon: "⚔️",
                title: "Competitive Landscape",
                desc: "See who else is lobbying on the same issues. Identify crowded vs. open policy spaces.",
                href: "/dashboard/competitive",
                accent: "from-amber-500 to-orange-500",
              },
              {
                icon: "📅",
                title: "Activity Timeline",
                desc: "Chronological feed of bill introductions, passages, and new lobbying registrations.",
                href: "/dashboard/timeline",
                accent: "from-green-500 to-emerald-500",
              },
            ].map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                <div className="mt-4 text-xs text-slate-500 group-hover:text-blue-400 transition flex items-center gap-1">
                  Explore
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-20 px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-6 font-medium">Built on Public Data</div>
          <div className="flex items-center justify-center gap-12 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">ola.org</div>
              <div className="text-xs text-slate-500">Ontario Legislative Assembly</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-lg font-bold text-white">oico.on.ca</div>
              <div className="text-xs text-slate-500">Integrity Commissioner Registry</div>
            </div>
          </div>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            All data sourced from official Ontario government websites.
            Transparent, verifiable, and continuously updated.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to see what&apos;s happening
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              at Queen&apos;s Park?
            </span>
          </h2>
          <p className="text-slate-400 mb-10 max-w-md mx-auto">
            Advocase gives you the full picture — every bill, every lobbyist,
            every connection. Start exploring now.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-10 py-4 rounded-full text-base font-semibold transition-all hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            Open the Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-[10px] font-bold">
              A
            </div>
            <span className="text-sm font-semibold">Advocase</span>
            <span className="text-xs text-slate-600">Ontario GR Intelligence</span>
          </div>
          <div className="text-xs text-slate-600">
            Data: ola.org &middot; oico.on.ca &middot; 44th Parliament, 1st Session
          </div>
        </div>
      </footer>
    </div>
  );
}
