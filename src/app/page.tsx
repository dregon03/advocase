import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">Advocase</div>
        <Link
          href="/dashboard"
          className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
        >
          Open Dashboard
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center pt-24 pb-16 px-8">
        <div className="text-sm font-medium text-blue-400 mb-4 tracking-wide uppercase">
          Ontario Government Relations Intelligence
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Track every bill. Know every lobbyist.
          <br />
          <span className="text-blue-400">Win every file.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
          Real-time bill tracking from the Ontario Legislative Assembly, lobbyist registry
          intelligence from OICO, and AI-powered impact analysis — all in one platform.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-lg text-base font-medium transition"
        >
          Explore the Dashboard
        </Link>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto grid grid-cols-4 gap-6 px-8 pb-20">
        {[
          { value: "92+", label: "Bills Tracked" },
          { value: "12+", label: "Active Lobbyist Registrations" },
          { value: "15+", label: "Ministries Covered" },
          { value: "Live", label: "OLA & OICO Data" },
        ].map((s) => (
          <div key={s.label} className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="text-3xl font-bold text-blue-400">{s.value}</div>
            <div className="text-sm text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-8 pb-24">
        <h2 className="text-2xl font-bold text-center mb-12">What Advocase Does</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              title: "Bill Tracker",
              desc: "Every bill in the 44th Parliament — status, sponsors, ministry, sector tags. Filter by what matters to your clients.",
            },
            {
              title: "Lobbyist Intelligence",
              desc: "Who is lobbying whom, on what topic. Map the relationships between organizations, lobbyists, and government officials.",
            },
            {
              title: "Impact Analysis",
              desc: "AI-powered analysis of each bill's potential impact on industries, with precedent tracking and stakeholder mapping.",
            },
            {
              title: "Ministry Mapping",
              desc: "See which ministries are most active, which ministers are sponsoring legislation, and where the policy action is.",
            },
            {
              title: "Sector Alerts",
              desc: "Set up alerts by industry sector — get notified when new bills or lobbying activity affect your clients' interests.",
            },
            {
              title: "Relationship Graph",
              desc: "Visualize the connections between lobbyists, organizations, officials, and bills in an interactive network.",
            },
          ].map((f) => (
            <div key={f.title} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        Advocase — Built for Ontario government relations professionals.
        <br />
        Data sourced from ola.org and oico.on.ca.
      </footer>
    </div>
  );
}
