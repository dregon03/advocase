export interface BillStatusEvent {
  date: string;
  stage: string;
  event: string;
  outcome: string;
  committee?: string;
}

// Status history for key bills (scraped from /status pages)
export const billStatusHistory: Record<number, BillStatusEvent[]> = {
  75: [
    { date: "2025-12-11", stage: "Second Reading", event: "Debated", outcome: "Debate adjourned" },
    { date: "2025-12-09", stage: "Second Reading", event: "Debated", outcome: "Debate adjourned" },
    { date: "2025-11-25", stage: "First Reading", event: "Ordered for Second Reading", outcome: "-" },
    { date: "2025-11-25", stage: "First Reading", event: "Vote", outcome: "Carried" },
  ],
  9: [
    { date: "2025-12-11", stage: "Third Reading", event: "Debated", outcome: "Debate adjourned" },
    { date: "2025-12-04", stage: "Committee", event: "Clause-by-clause", outcome: "Reported with amendments", committee: "Heritage, Infrastructure and Cultural Policy" },
    { date: "2025-11-20", stage: "Second Reading", event: "Vote", outcome: "Carried" },
    { date: "2025-11-18", stage: "Second Reading", event: "Debated", outcome: "Debate adjourned" },
    { date: "2025-06-05", stage: "First Reading", event: "Vote", outcome: "Carried" },
  ],
  17: [
    { date: "2025-06-05", stage: "Royal Assent", event: "Royal Assent", outcome: "Passed" },
    { date: "2025-06-03", stage: "Third Reading", event: "Vote", outcome: "Carried" },
    { date: "2025-05-28", stage: "Committee", event: "Clause-by-clause", outcome: "Reported without amendments", committee: "Heritage, Infrastructure and Cultural Policy" },
    { date: "2025-05-22", stage: "Second Reading", event: "Vote", outcome: "Carried" },
    { date: "2025-05-15", stage: "Second Reading", event: "Debated", outcome: "Debate adjourned" },
    { date: "2025-04-28", stage: "First Reading", event: "Vote", outcome: "Carried" },
  ],
  60: [
    { date: "2025-11-27", stage: "Royal Assent", event: "Royal Assent", outcome: "Passed" },
    { date: "2025-11-25", stage: "Third Reading", event: "Vote", outcome: "Carried" },
    { date: "2025-11-18", stage: "Committee", event: "Clause-by-clause", outcome: "Reported without amendments", committee: "Heritage, Infrastructure and Cultural Policy" },
    { date: "2025-11-06", stage: "Second Reading", event: "Vote", outcome: "Carried" },
    { date: "2025-10-30", stage: "Second Reading", event: "Debated", outcome: "Debate adjourned" },
    { date: "2025-10-15", stage: "First Reading", event: "Vote", outcome: "Carried" },
  ],
  40: [
    { date: "2025-12-11", stage: "Royal Assent", event: "Royal Assent", outcome: "Passed" },
    { date: "2025-12-09", stage: "Third Reading", event: "Vote", outcome: "Carried on division" },
    { date: "2025-12-02", stage: "Committee", event: "Clause-by-clause", outcome: "Reported with amendments", committee: "Interior" },
    { date: "2025-11-20", stage: "Second Reading", event: "Vote", outcome: "Carried" },
    { date: "2025-10-28", stage: "First Reading", event: "Vote", outcome: "Carried" },
  ],
  61: [
    { date: "2025-11-20", stage: "Second Reading", event: "Vote", outcome: "Lost on division" },
    { date: "2025-11-18", stage: "Second Reading", event: "Debated", outcome: "Debate adjourned" },
    { date: "2025-09-22", stage: "First Reading", event: "Vote", outcome: "Carried" },
  ],
};

// Calculate days from first reading to current status
export function calculateBillVelocity(events: BillStatusEvent[]): {
  daysInProcess: number;
  firstReading: string;
  latestEvent: string;
  avgDaysBetweenStages: number;
} {
  if (events.length === 0) return { daysInProcess: 0, firstReading: "", latestEvent: "", avgDaysBetweenStages: 0 };
  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const first = new Date(sorted[0].date);
  const last = new Date(sorted[sorted.length - 1].date);
  const days = Math.ceil((last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
  return {
    daysInProcess: days,
    firstReading: sorted[0].date,
    latestEvent: sorted[sorted.length - 1].date,
    avgDaysBetweenStages: events.length > 1 ? Math.round(days / (events.length - 1)) : 0,
  };
}
