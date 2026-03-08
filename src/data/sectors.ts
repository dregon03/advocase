export interface Sector {
  name: string;
  billCount: number;
  activeLobbyists: number;
  keyOfficials: string[];
  recentActivity: string;
  heatLevel: "Hot" | "Warm" | "Cool";
  bills: number[];
  topOrgs: string[];
}

export const sectors: Sector[] = [
  {
    name: "Housing",
    billCount: 5,
    activeLobbyists: 3,
    keyOfficials: ["Rob Flack", "Jessica Bell"],
    recentActivity: "Bill 60 received Royal Assent (Nov 27). Active lobbying from OREA and Mattamy Homes.",
    heatLevel: "Hot",
    bills: [6, 9, 17, 51, 60, 64, 82],
    topOrgs: ["Ontario Real Estate Association", "Mattamy Homes"],
  },
  {
    name: "Healthcare",
    billCount: 4,
    activeLobbyists: 2,
    keyOfficials: ["Sylvia Jones", "France Gélinas"],
    recentActivity: "Primary Care Act passed. NDP pushing staffing and transparency bills.",
    heatLevel: "Hot",
    bills: [7, 11, 13, 19, 44, 59, 62, 69, 85],
    topOrgs: ["Earnscliffe Strategies"],
  },
  {
    name: "Trade & Commerce",
    billCount: 3,
    activeLobbyists: 2,
    keyOfficials: ["Stephen Lecce", "Victor Fedeli"],
    recentActivity: "Free Trade Act and Buy Ontario Act both received Royal Assent.",
    heatLevel: "Warm",
    bills: [2, 5, 72],
    topOrgs: ["Global Public Affairs", "Ontario Chamber of Commerce"],
  },
  {
    name: "Energy",
    billCount: 2,
    activeLobbyists: 1,
    keyOfficials: ["Stephen Lecce"],
    recentActivity: "Affordable Energy Act passed Dec 11. Ontario Energy Association actively lobbying.",
    heatLevel: "Warm",
    bills: [27, 40, 50],
    topOrgs: ["Ontario Energy Association"],
  },
  {
    name: "Technology",
    billCount: 2,
    activeLobbyists: 4,
    keyOfficials: ["Stephen Lecce", "Andrea Khanjin"],
    recentActivity: "AI Strategy Act (Bill 61) lost. Bell, Rogers, and Shopify actively lobbying on digital economy policy.",
    heatLevel: "Hot",
    bills: [61, 91],
    topOrgs: ["Bell Canada", "Rogers Communications", "Shopify Inc."],
  },
  {
    name: "Justice & Public Safety",
    billCount: 3,
    activeLobbyists: 1,
    keyOfficials: ["Doug Downey", "Michael S. Kerzner"],
    recentActivity: "Bill 75 (Keeping Criminals Behind Bars) at Second Reading.",
    heatLevel: "Warm",
    bills: [10, 25, 75],
    topOrgs: ["Sussex Strategy Group"],
  },
  {
    name: "Labour",
    billCount: 2,
    activeLobbyists: 1,
    keyOfficials: ["David Piccini"],
    recentActivity: "Working for Workers 7 passed Nov 27. Gig worker classification being lobbied.",
    heatLevel: "Cool",
    bills: [30, 36],
    topOrgs: ["Hill+Knowlton Strategies"],
  },
  {
    name: "Education",
    billCount: 1,
    activeLobbyists: 1,
    keyOfficials: ["Paul Calandra"],
    recentActivity: "Supporting Children Act passed Nov 20. EdTech procurement lobbying active.",
    heatLevel: "Cool",
    bills: [33],
    topOrgs: ["StrategyCorp"],
  },
  {
    name: "Natural Resources",
    billCount: 1,
    activeLobbyists: 1,
    keyOfficials: ["Mike Harris"],
    recentActivity: "Resource Management Act passed Dec 3. Mining Association lobbying on permits.",
    heatLevel: "Cool",
    bills: [27],
    topOrgs: ["Ontario Mining Association"],
  },
  {
    name: "Consumer Protection",
    billCount: 2,
    activeLobbyists: 2,
    keyOfficials: ["Tom Rakocevic"],
    recentActivity: "Right to Repair and Consumer Watchdog bills at First Reading. Telecom providers lobbying against broad mandates.",
    heatLevel: "Warm",
    bills: [91, 92],
    topOrgs: ["Bell Canada", "Rogers Communications"],
  },
];
