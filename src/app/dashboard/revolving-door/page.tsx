import { lobbyistRegistrations } from "@/data/lobbyists";

export default function RevolvingDoorPage() {
  const formerInsiders = lobbyistRegistrations.filter(
    (r) => r.formerPublicOffices.length > 0 && !r.formerPublicOffices.includes("None")
  );

  const byOfficeType: Record<string, typeof formerInsiders> = {};
  formerInsiders.forEach((r) => {
    r.formerPublicOffices.forEach((office) => {
      if (office === "None") return;
      if (!byOfficeType[office]) byOfficeType[office] = [];
      byOfficeType[office].push(r);
    });
  });

  // Who are they targeting now?
  const insiderTargets = formerInsiders.flatMap((r) =>
    r.targetMinisterOffices.map((t) => ({ lobbyist: r.lobbyistName, org: r.organization, target: t, formerRole: r.formerPublicOffices[0] }))
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Revolving Door Tracker</h1>
        <p className="text-slate-500 mt-1">Former government insiders now registered as lobbyists — and who they are targeting.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-3xl font-bold text-red-600">{formerInsiders.length}</div>
          <div className="text-sm text-slate-500 mt-1">Former Gov Insiders</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-3xl font-bold text-slate-900">{lobbyistRegistrations.length}</div>
          <div className="text-sm text-slate-500 mt-1">Total Registrations</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-3xl font-bold text-orange-600">{Math.round((formerInsiders.length / lobbyistRegistrations.length) * 100)}%</div>
          <div className="text-sm text-slate-500 mt-1">Insider Rate</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-3xl font-bold text-purple-600">{new Set(formerInsiders.map((r) => r.organization)).size}</div>
          <div className="text-sm text-slate-500 mt-1">Firms with Insiders</div>
        </div>
      </div>

      {/* By Former Role */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Former Government Roles</h2>
          <p className="text-xs text-slate-400 mt-0.5">What positions did these lobbyists hold before entering the private sector?</p>
        </div>
        <div className="divide-y divide-slate-100">
          {Object.entries(byOfficeType).sort(([, a], [, b]) => b.length - a.length).map(([office, regs]) => (
            <div key={office} className="px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-900">{office}</span>
                <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-medium">{regs.length} lobbyist{regs.length > 1 ? "s" : ""}</span>
              </div>
              <div className="space-y-2">
                {regs.map((r, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2.5">
                    <div>
                      <span className="text-sm font-medium text-slate-900">{r.lobbyistName}</span>
                      <span className="text-xs text-slate-400 ml-2">{r.organization}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Now lobbying: {r.lobbiedPerson}</div>
                      <div className="text-xs text-slate-400">{r.topic}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insider Targeting Map */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Where Former Insiders Are Targeting</h2>
          <p className="text-xs text-slate-400 mt-0.5">Which offices are being lobbied by people who used to work in government?</p>
        </div>
        <div className="divide-y divide-slate-100">
          {insiderTargets.map((t, i) => (
            <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-xs text-red-600 font-bold">!</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{t.lobbyist}</div>
                  <div className="text-xs text-slate-500">{t.org} — Former: {t.formerRole}</div>
                </div>
              </div>
              <div className="text-xs text-slate-500 text-right max-w-sm">{t.target}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Profiles */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Full Insider Profiles</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {formerInsiders.map((r, i) => (
            <div key={i} className="px-5 py-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{r.lobbyistName}</h3>
                    <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-medium">Former Gov</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      r.type === "Consultant" ? "bg-purple-50 text-purple-700" : "bg-green-50 text-green-700"
                    }`}>{r.type}</span>
                  </div>
                  <div className="text-sm text-slate-500 mt-0.5">{r.lobbyistTitle} — {r.organization}</div>
                </div>
                <div className="text-right text-xs text-slate-400">
                  Reg: {r.registrationNo}<br />
                  Filed: {r.initialFilingDate}
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-3 mb-3">
                <div className="text-xs text-red-600 font-medium mb-1">Former Public Office</div>
                <div className="text-sm text-red-800">{r.formerPublicOffices.filter((o) => o !== "None").join(", ")}</div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <div className="text-xs text-blue-600 font-medium mb-1">Lobbying Goals</div>
                <div className="text-sm text-blue-800">{r.lobbyingGoals}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-slate-400 font-medium mb-1">Targeting Minister Offices</div>
                  <div className="flex flex-wrap gap-1">
                    {r.targetMinisterOffices.map((t) => (
                      <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t.replace("Office of the ", "")}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium mb-1">Communication Methods</div>
                  <div className="flex flex-wrap gap-1">
                    {r.communicationTechniques.map((t) => (
                      <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
