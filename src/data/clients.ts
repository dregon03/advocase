export interface Client {
  name: string;
  industry: string;
  sectors: string[];
  watchedBills: number[];
  competitors: string[];
  keyOfficials: string[];
  activeLobbyists: string[];
  riskLevel: "High" | "Medium" | "Low";
  notes: string;
}

export const clientWorkspaces: Client[] = [
  {
    name: "Brookfield Properties",
    industry: "Real Estate Development",
    sectors: ["Housing", "Construction", "Municipal Government"],
    watchedBills: [6, 9, 17, 51, 60, 82],
    competitors: ["Mattamy Homes"],
    keyOfficials: ["Rob Flack", "Jessica Bell"],
    activeLobbyists: ["Jennifer Wright", "Daniel Kim"],
    riskLevel: "High",
    notes: "Bill 51 (Rent Stabilization) could impact rental portfolio margins. Bills 17 and 60 are favorable — faster approvals. Monitor NDP housing critics closely.",
  },
  {
    name: "Ontario Power Generation",
    industry: "Energy & Utilities",
    sectors: ["Energy", "Natural Resources"],
    watchedBills: [27, 40, 50],
    competitors: [],
    keyOfficials: ["Stephen Lecce", "Mike Harris"],
    activeLobbyists: ["Amanda Torres"],
    riskLevel: "Medium",
    notes: "Bill 40 (Affordable Energy) passed — favorable for generation procurement. Bill 50 (No Free Ride for Fossil Fuels) unlikely to pass as private member bill.",
  },
  {
    name: "Shopify",
    industry: "Technology",
    sectors: ["Technology", "Trade & Commerce"],
    watchedBills: [2, 5, 46, 56, 61, 72, 91],
    competitors: [],
    keyOfficials: ["Stephen Lecce", "Andrea Khanjin"],
    activeLobbyists: ["Michelle Duong"],
    riskLevel: "Low",
    notes: "Bill 61 (AI Strategy) lost — may need to re-engage on next session. Bill 91 (Right to Repair) could affect hardware partnerships. Cutting Red Tape Act favorable.",
  },
  {
    name: "LifeLabs",
    industry: "Healthcare Services",
    sectors: ["Healthcare"],
    watchedBills: [7, 11, 13, 44, 85],
    competitors: [],
    keyOfficials: ["Sylvia Jones", "France Gélinas"],
    activeLobbyists: ["Robert Bhatt"],
    riskLevel: "Medium",
    notes: "NDP pushing multiple healthcare transparency and staffing bills. Most stuck at First Reading but watch for momentum. Bill 13 (Primary Care) passed — may create new referral requirements.",
  },
  {
    name: "Ontario Home Builders' Association",
    industry: "Trade Association — Construction",
    sectors: ["Housing", "Construction", "Regulation"],
    watchedBills: [9, 17, 46, 56, 60],
    competitors: ["Ontario Real Estate Association"],
    keyOfficials: ["Rob Flack", "Andrea Khanjin"],
    activeLobbyists: ["Mark Thompson", "Jennifer Wright"],
    riskLevel: "Low",
    notes: "Legislative environment highly favorable. Multiple government bills accelerating approvals and reducing red tape. Continue supporting government agenda.",
  },
];
