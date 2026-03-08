"use client";

import { useState } from "react";
import { lobbyistRegistrations } from "@/data/lobbyists";

// Derived analytics
function getTopLobbyists() {
  const counts: Record<string, { name: string; org: string; title: string; targets: Set<string>; topics: Set<string>; count: number }> = {};
  lobbyistRegistrations.forEach((r) => {
    if (!counts[r.lobbyistName]) {
      counts[r.lobbyistName] = { name: r.lobbyistName, org: r.organization, title: r.lobbyistTitle, targets: new Set(), topics: new Set(), count: 0 };
    }
    counts[r.lobbyistName].targets.add(r.lobbiedPerson);
    counts[r.lobbyistName].topics.add(r.subjectMatter);
    counts[r.lobbyistName].count++;
  });
  return Object.values(counts).sort((a, b) => b.count - a.count);
}

function getMostLobbiedOfficials() {
  const counts: Record<string, { name: string; title: string; org: string; lobbyists: Set<string>; topics: Set<string>; count: number }> = {};
  lobbyistRegistrations.forEach((r) => {
    if (!counts[r.lobbiedPerson]) {
      counts[r.lobbiedPerson] = { name: r.lobbiedPerson, title: r.lobbiedTitle, org: r.lobbiedOrg, lobbyists: new Set(), topics: new Set(), count: 0 };
    }
    counts[r.lobbiedPerson].lobbyists.add(r.lobbyistName);
    counts[r.lobbiedPerson].topics.add(r.subjectMatter);
    counts[r.lobbiedPerson].count++;
  });
  return Object.values(counts).sort((a, b) => b.count - a.count);
}

function getTopOrganizations() {
  const counts: Record<string, { name: string; type: string; lobbyists: Set<string>; targets: Set<string>; topics: Set<string>; count: number }> = {};
  lobbyistRegistrations.forEach((r) => {
    if (!counts[r.organization]) {
      counts[r.organization] = { name: r.organization, type: r.type, lobbyists: new Set(), targets: new Set(), topics: new Set(), count: 0 };
    }
    counts[r.organization].lobbyists.add(r.lobbyistName);
    counts[r.organization].targets.add(r.lobbiedPerson);
    counts[r.organization].topics.add(r.subjectMatter);
    counts[r.organization].count++;
  });
  return Object.values(counts).sort((a, b) => b.count - a.count);
}

function getTopicClusters() {
  const clusters: Record<string, { topic: string; lobbyists: Set<string>; officials: Set<string>; orgs: Set<string>; count: number }> = {};
  lobbyistRegistrations.forEach((r) => {
    if (!clusters[r.subjectMatter]) {
      clusters[r.subjectMatter] = { topic: r.subjectMatter, lobbyists: new Set(), officials: new Set(), orgs: new Set(), count: 0 };
    }
    clusters[r.subjectMatter].lobbyists.add(r.lobbyistName);
    clusters[r.subjectMatter].officials.add(r.lobbiedPerson);
    clusters[r.subjectMatter].orgs.add(r.organization);
    clusters[r.subjectMatter].count++;
  });
  return Object.values(clusters).sort((a, b) => b.count - a.count);
}

type Tab = "power" | "relationships" | "registry";

export default function LobbyistsPage() {
  const [tab, setTab] = useState<Tab>("power");
  const [search, setSearch] = useState("");

  const topLobbyists = getTopLobbyists();
  const mostLobbied = getMostLobbiedOfficials();
  const topOrgs = getTopOrganizations();
  const topics = getTopicClusters();

  const filteredRegistry = lobbyistRegistrations.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.lobbyistName.toLowerCase().includes(q) ||
      r.organization.toLowerCase().includes(q) ||
      r.lobbiedPerson.toLowerCase().includes(q) ||
      r.topic.toLowerCase().includes(q) ||
      r.subjectMatter.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Lobbyist Intelligence</h1>
        <p className="text-slate-500 mt-1">Power analysis, relationship mapping, and registry data from OICO.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 mb-6 w-fit">
        {([
          { id: "power" as Tab, label: "Power Analysis" },
          { id: "relationships" as Tab, label: "Relationship Map" },
          { id: "registry" as Tab, label: "Full Registry" },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              tab === t.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Power Analysis Tab */}
      {tab === "power" && (
        <div className="space-y-6">
          {/* Most Lobbied Officials */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="font-bold text-slate-900">Most Lobbied Officials</h2>
              <p className="text-xs text-slate-400 mt-0.5">Government officials receiving the most lobbying activity</p>
            </div>
            <div className="divide-y divide-slate-100">
              {mostLobbied.map((o, i) => (
                <div key={o.name} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                      i === 0 ? "bg-red-500" : i === 1 ? "bg-orange-500" : i === 2 ? "bg-yellow-500" : "bg-slate-400"
                    }`}>{i + 1}</div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{o.name}</div>
                      <div className="text-xs text-slate-500">{o.title}</div>
                      <div className="text-xs text-slate-400">{o.org}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">{o.count}</div>
                    <div className="text-xs text-slate-400">registrations</div>
                    <div className="flex gap-1 mt-1 justify-end">
                      {[...o.topics].map((t) => (
                        <span key={t} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Lobbying Organizations */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="font-bold text-slate-900">Top Lobbying Organizations</h2>
              <p className="text-xs text-slate-400 mt-0.5">Organizations with the most active lobbying registrations</p>
            </div>
            <div className="divide-y divide-slate-100">
              {topOrgs.map((org) => (
                <div key={org.name} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{org.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      <span className={`inline-block px-2 py-0.5 rounded-full font-medium mr-2 ${
                        org.type === "Consultant" ? "bg-purple-50 text-purple-700" :
                        org.type === "In-house" ? "bg-green-50 text-green-700" :
                        "bg-blue-50 text-blue-700"
                      }`}>{org.type}</span>
                      {org.lobbyists.size} lobbyist{org.lobbyists.size > 1 ? "s" : ""} — targeting {org.targets.size} official{org.targets.size > 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end max-w-xs">
                    {[...org.topics].map((t) => (
                      <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Clusters */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="font-bold text-slate-900">Lobbying by Topic</h2>
              <p className="text-xs text-slate-400 mt-0.5">Which policy areas are getting the most lobbying attention</p>
            </div>
            <div className="divide-y divide-slate-100">
              {topics.map((t) => (
                <div key={t.topic} className="px-5 py-4 hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">{t.topic}</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{t.count} registration{t.count > 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>{t.orgs.size} org{t.orgs.size > 1 ? "s" : ""}</span>
                    <span>{t.lobbyists.size} lobbyist{t.lobbyists.size > 1 ? "s" : ""}</span>
                    <span>{t.officials.size} official{t.officials.size > 1 ? "s" : ""} targeted</span>
                  </div>
                  {/* Activity bar */}
                  <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${Math.min((t.count / lobbyistRegistrations.length) * 100 * 3, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Relationship Map Tab */}
      {tab === "relationships" && (
        <div className="space-y-6">
          {/* Connection Cards */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="font-bold text-slate-900">Lobbying Connections</h2>
              <p className="text-xs text-slate-400 mt-0.5">Every registered lobbying relationship — who is talking to whom, about what</p>
            </div>
            <div className="divide-y divide-slate-100">
              {lobbyistRegistrations.map((r, i) => (
                <div key={i} className="px-5 py-4 hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3 mb-2">
                    {/* Lobbyist */}
                    <div className="flex-1 bg-purple-50 rounded-lg p-3">
                      <div className="text-xs text-purple-500 font-medium uppercase tracking-wider mb-1">Lobbyist</div>
                      <div className="text-sm font-medium text-slate-900">{r.lobbyistName}</div>
                      <div className="text-xs text-slate-500">{r.lobbyistTitle}</div>
                      <div className="text-xs text-slate-400">{r.organization}</div>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center gap-1 px-2">
                      <div className="text-xs text-slate-400 font-medium">lobbied</div>
                      <div className="text-slate-300 text-lg">&rarr;</div>
                    </div>

                    {/* Official */}
                    <div className="flex-1 bg-blue-50 rounded-lg p-3">
                      <div className="text-xs text-blue-500 font-medium uppercase tracking-wider mb-1">Official</div>
                      <div className="text-sm font-medium text-slate-900">{r.lobbiedPerson}</div>
                      <div className="text-xs text-slate-500">{r.lobbiedTitle}</div>
                      <div className="text-xs text-slate-400">{r.lobbiedOrg}</div>
                    </div>
                  </div>

                  {/* Lobbying Goals */}
                  <div className="bg-slate-50 rounded-lg p-2.5 mt-2 mb-2">
                    <div className="text-xs text-slate-400 font-medium mb-0.5">Lobbying Goal</div>
                    <div className="text-xs text-slate-600">{r.lobbyingGoals}</div>
                  </div>

                  {/* Topic + Techniques */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{r.subjectMatter}</span>
                    {r.activityTypes.map((a) => (
                      <span key={a} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{a}</span>
                    ))}
                    {r.formerPublicOffices.some((o) => o !== "None") && (
                      <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-medium">Former Gov</span>
                    )}
                    <span className="ml-auto text-xs text-slate-400">Reg: {r.registrationNo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ministry Heatmap */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900 mb-1">Ministry Lobbying Heatmap</h2>
            <p className="text-xs text-slate-400 mb-4">Which ministries are receiving the most lobbying attention</p>
            <div className="space-y-2">
              {(() => {
                const ministryCounts: Record<string, number> = {};
                lobbyistRegistrations.forEach((r) => {
                  ministryCounts[r.lobbiedOrg] = (ministryCounts[r.lobbiedOrg] || 0) + 1;
                });
                return Object.entries(ministryCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([ministry, count]) => (
                    <div key={ministry} className="flex items-center gap-3">
                      <div className="w-64 text-sm text-slate-700 truncate">{ministry.replace("Ministry of ", "")}</div>
                      <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${(count / lobbyistRegistrations.length) * 100 * 2.5}%` }}
                        >
                          <span className="text-xs font-medium text-white">{count}</span>
                        </div>
                      </div>
                    </div>
                  ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Full Registry Tab */}
      {tab === "registry" && (
        <div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search lobbyists, organizations, officials, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Lobbyist</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Organization</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Type</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Lobbied Official</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Topic</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistry.map((r, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition align-top">
                    <td className="px-5 py-3">
                      <div className="text-sm font-medium text-slate-900">{r.lobbyistName}</div>
                      <div className="text-xs text-slate-400">{r.lobbyistTitle}</div>
                      {r.formerPublicOffices.some((o) => o !== "None") && (
                        <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">Former Gov</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-sm text-slate-600">{r.organization}</div>
                      {r.clientName && <div className="text-xs text-slate-400 mt-0.5">Client: {r.clientName}</div>}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        r.type === "Consultant" ? "bg-purple-50 text-purple-700" :
                        r.type === "In-house" ? "bg-green-50 text-green-700" :
                        "bg-blue-50 text-blue-700"
                      }`}>{r.type}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-sm text-slate-900">{r.lobbiedPerson}</div>
                      <div className="text-xs text-slate-400">{r.lobbiedTitle}</div>
                      <div className="text-xs text-slate-300 mt-0.5">{r.targetMinisterOffices.length} offices, {r.targetMinistries.length} ministries</div>
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-500 max-w-xs">
                      <div>{r.topic}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {r.activityTypes.map((a) => (
                          <span key={a} className="text-xs bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded">{a}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">{r.status}</span>
                      <div className="text-xs text-slate-300 mt-1">{r.registrationNo}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
