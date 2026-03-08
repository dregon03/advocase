import { bills } from "@/data/bills";
import { lobbyistRegistrations } from "@/data/lobbyists";
import { stakeholders } from "@/data/stakeholders";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return bills.map((b) => ({ id: String(b.number) }));
}

export default async function BillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bill = bills.find((b) => b.number === Number(id));
  if (!bill) return notFound();

  // Cross-reference: find lobbyists active on this bill's sectors/ministry
  const relatedLobbyists = lobbyistRegistrations.filter((r) =>
    bill.sectors.some((s) => r.subjectMatter.includes(s)) ||
    (bill.ministry && r.lobbiedOrg.includes(bill.ministry.replace("Ministry of ", "")))
  );

  // Cross-reference: find stakeholders connected to this bill
  const relatedStakeholders = stakeholders.filter((s) =>
    s.billsSponsored.includes(bill.number) ||
    s.topTopics.some((t) => bill.sectors.includes(t))
  );

  // Find similar bills (same sectors)
  const similarBills = bills.filter((b) =>
    b.number !== bill.number && b.sectors.some((s) => bill.sectors.includes(s))
  ).slice(0, 5);

  return (
    <div>
      <Link href="/dashboard/bills" className="text-sm text-blue-600 hover:underline mb-4 inline-block">&larr; All Bills</Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-slate-900">Bill {bill.number}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                bill.status === "Royal Assent" ? "bg-green-50 text-green-700" :
                bill.status === "First Reading" ? "bg-yellow-50 text-yellow-700" :
                bill.status === "Second Reading" ? "bg-blue-50 text-blue-700" :
                bill.status === "Third Reading" ? "bg-purple-50 text-purple-700" :
                "bg-red-50 text-red-700"
              }`}>{bill.status}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                bill.type === "Government" ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-600"
              }`}>{bill.type}</span>
            </div>
            <h1 className="text-lg font-medium text-slate-700 mb-1">{bill.title}</h1>
            {bill.ministry && <div className="text-sm text-slate-500">{bill.ministry}</div>}
          </div>
          {bill.type === "Government" && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-right">
              <div className="text-xs text-green-600 font-medium">Passage Likelihood</div>
              <div className="text-lg font-bold text-green-700">High</div>
              <div className="text-xs text-green-500">Government bills: ~90% pass rate</div>
            </div>
          )}
        </div>

        <div className="flex gap-6 text-sm">
          <div>
            <span className="text-slate-400">Sponsor(s): </span>
            <span className="text-slate-700 font-medium">{bill.sponsors.join(", ")}</span>
          </div>
          {bill.statusDate && (
            <div>
              <span className="text-slate-400">Date: </span>
              <span className="text-slate-700">{bill.statusDate}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {bill.sectors.map((s) => (
            <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{s}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Related Lobbyists */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">Active Lobbyists on This Topic</h2>
            <p className="text-xs text-slate-400 mt-0.5">Organizations lobbying on sectors related to this bill</p>
          </div>
          {relatedLobbyists.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {relatedLobbyists.map((r, i) => (
                <div key={i} className="px-5 py-3 hover:bg-slate-50 transition">
                  <div className="text-sm font-medium text-slate-900">{r.lobbyistName}</div>
                  <div className="text-xs text-slate-500">{r.organization} — {r.type}</div>
                  <div className="text-xs text-slate-400 mt-0.5">Lobbying {r.lobbiedPerson} on: {r.topic}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-8 text-center text-sm text-slate-400">No active lobbyists on this topic — potential white space for your client.</div>
          )}
        </div>

        {/* Key Stakeholders */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">Key Stakeholders</h2>
            <p className="text-xs text-slate-400 mt-0.5">Officials connected to this bill</p>
          </div>
          <div className="divide-y divide-slate-100">
            {relatedStakeholders.map((s) => (
              <div key={s.name} className="px-5 py-3 hover:bg-slate-50 transition">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-900">{s.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    s.party === "PC" ? "bg-blue-50 text-blue-700" :
                    s.party === "NDP" ? "bg-orange-50 text-orange-700" :
                    s.party === "LIB" ? "bg-red-50 text-red-700" :
                    "bg-green-50 text-green-700"
                  }`}>{s.party}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    s.influence === "Very High" ? "bg-red-50 text-red-600" :
                    s.influence === "High" ? "bg-orange-50 text-orange-600" :
                    "bg-slate-100 text-slate-600"
                  }`}>{s.influence}</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{s.title}</div>
                <div className="text-xs text-slate-400">{s.lobbyingReceived} lobbying registrations received</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Bills */}
      {similarBills.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mt-6">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">Related Bills</h2>
            <p className="text-xs text-slate-400 mt-0.5">Other bills affecting the same sectors</p>
          </div>
          <div className="divide-y divide-slate-100">
            {similarBills.map((b) => (
              <Link key={b.number} href={`/dashboard/bills/${b.number}`} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition block">
                <div>
                  <span className="text-sm font-medium text-slate-900">Bill {b.number}</span>
                  <span className="text-sm text-slate-500 ml-2">{b.shortTitle}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  b.status === "Royal Assent" ? "bg-green-50 text-green-700" :
                  b.status === "Lost" ? "bg-red-50 text-red-700" :
                  "bg-yellow-50 text-yellow-700"
                }`}>{b.status}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
