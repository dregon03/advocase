export interface Committee {
  name: string;
  slug: string;
  chair: string;
  chairParty: "PC" | "NDP" | "LIB" | "GRN";
  members: { name: string; party: "PC" | "NDP" | "LIB" | "GRN" }[];
  currentBusiness: string[];
  upcomingMeetings: { date: string; topic: string; type: "Hearing" | "Clause-by-Clause" | "Presentation" | "Regular" }[];
  recentTranscripts: { date: string; topic: string }[];
}

export const committees: Committee[] = [
  {
    name: "Standing Committee on Finance and Economic Affairs",
    slug: "finance-economic-affairs",
    chair: "Ernie Hardeman",
    chairParty: "PC",
    members: [
      { name: "Ernie Hardeman", party: "PC" },
      { name: "Deepak Anand", party: "PC" },
      { name: "Andrew Dowie", party: "PC" },
      { name: "Stephanie Bowman", party: "LIB" },
      { name: "Catherine Fife", party: "NDP" },
    ],
    currentBusiness: ["Pre-budget consultations 2026", "Review of Bill 68 (Budget Measures No. 2)"],
    upcomingMeetings: [
      { date: "2026-03-12", topic: "Pre-budget consultations — Day 1", type: "Hearing" },
      { date: "2026-03-14", topic: "Pre-budget consultations — Day 2", type: "Hearing" },
    ],
    recentTranscripts: [
      { date: "2025-11-20", topic: "Bill 68 — Clause-by-clause consideration" },
      { date: "2025-10-28", topic: "Fall economic statement review" },
    ],
  },
  {
    name: "Standing Committee on Justice Policy",
    slug: "justice-policy",
    chair: "Brian Saunderson",
    chairParty: "PC",
    members: [
      { name: "Brian Saunderson", party: "PC" },
      { name: "Laura Smith", party: "PC" },
      { name: "Rob Cerjanec", party: "PC" },
      { name: "Kristyn Wong-Tam", party: "NDP" },
      { name: "Lucille Collard", party: "LIB" },
    ],
    currentBusiness: ["Bill 75 — Keeping Criminals Behind Bars Act (referred after 2nd reading)"],
    upcomingMeetings: [
      { date: "2026-03-10", topic: "Bill 75 — Public hearings", type: "Hearing" },
      { date: "2026-03-17", topic: "Bill 75 — Clause-by-clause", type: "Clause-by-Clause" },
    ],
    recentTranscripts: [
      { date: "2025-12-09", topic: "Bill 75 — Second reading debate" },
    ],
  },
  {
    name: "Standing Committee on Heritage, Infrastructure and Cultural Policy",
    slug: "heritage-infrastructure-cultural-policy",
    chair: "Matthew Rae",
    chairParty: "PC",
    members: [
      { name: "Matthew Rae", party: "PC" },
      { name: "Dave Smith", party: "PC" },
      { name: "Joseph Racinsky", party: "PC" },
      { name: "Mary-Margaret McMahon", party: "LIB" },
      { name: "Peter Tabuns", party: "NDP" },
    ],
    currentBusiness: ["Bill 9 — Municipal Accountability Act (referred after 3rd reading)"],
    upcomingMeetings: [],
    recentTranscripts: [
      { date: "2025-12-04", topic: "Bill 9 — Clause-by-clause consideration" },
    ],
  },
  {
    name: "Standing Committee on Social Policy",
    slug: "social-policy",
    chair: "Brian Riddell",
    chairParty: "PC",
    members: [
      { name: "Brian Riddell", party: "PC" },
      { name: "Natalia Kusendova-Bashta", party: "PC" },
      { name: "France Gélinas", party: "NDP" },
      { name: "Adil Shamji", party: "LIB" },
    ],
    currentBusiness: ["Long-term care staffing review", "Review of primary care delivery"],
    upcomingMeetings: [
      { date: "2026-03-11", topic: "LTC staffing — Stakeholder presentations", type: "Presentation" },
    ],
    recentTranscripts: [
      { date: "2025-11-18", topic: "Bill 33 — Supporting Children and Students Act" },
    ],
  },
  {
    name: "Standing Committee on the Interior",
    slug: "interior",
    chair: "Ric Bresee",
    chairParty: "PC",
    members: [
      { name: "Ric Bresee", party: "PC" },
      { name: "Mike Harris", party: "PC" },
      { name: "Guy Bourgouin", party: "NDP" },
      { name: "Stephen Blais", party: "LIB" },
    ],
    currentBusiness: ["Northern Ontario infrastructure review", "Mining permit reform study"],
    upcomingMeetings: [
      { date: "2026-03-18", topic: "Mining permits — Northern deputations", type: "Hearing" },
    ],
    recentTranscripts: [
      { date: "2025-11-25", topic: "Bill 27 — Resource Management and Safety Act" },
    ],
  },
  {
    name: "Standing Committee on Government Agencies",
    slug: "government-agencies",
    chair: "Will Bouma",
    chairParty: "PC",
    members: [
      { name: "Will Bouma", party: "PC" },
      { name: "Chris Glover", party: "NDP" },
      { name: "John Fraser", party: "LIB" },
    ],
    currentBusiness: ["Agency appointee review"],
    upcomingMeetings: [],
    recentTranscripts: [],
  },
  {
    name: "Standing Committee on Procedure and House Affairs",
    slug: "procedure-house-affairs",
    chair: "Todd Smith",
    chairParty: "PC",
    members: [
      { name: "Todd Smith", party: "PC" },
      { name: "Marit Stiles", party: "NDP" },
      { name: "Ted Hsu", party: "LIB" },
    ],
    currentBusiness: ["Standing orders review"],
    upcomingMeetings: [],
    recentTranscripts: [],
  },
  {
    name: "Standing Committee on Public Accounts",
    slug: "public-accounts",
    chair: "Tom Rakocevic",
    chairParty: "NDP",
    members: [
      { name: "Tom Rakocevic", party: "NDP" },
      { name: "Jennifer Stevens", party: "NDP" },
      { name: "Donna Skelly", party: "PC" },
      { name: "Andrea Hazell", party: "LIB" },
    ],
    currentBusiness: ["Auditor General reports review", "Government spending oversight"],
    upcomingMeetings: [
      { date: "2026-03-13", topic: "AG Report — Infrastructure Ontario", type: "Regular" },
    ],
    recentTranscripts: [
      { date: "2025-12-02", topic: "AG Report — Healthcare system capacity" },
    ],
  },
];
