// Research domain definitions matching the SBI research framework

export interface ResearchDomain {
  title: string;
  icon: string;
  gradient: string;
  accent: string;
  anchorId: string;
  keywords: string[]; // Keywords to help auto-assign terms
}

export const RESEARCH_DOMAINS: ResearchDomain[] = [
  {
    title: "Markets & Geopolitics",
    icon: "🌍",
    gradient: "from-blue-50 to-blue-100/50",
    accent: "bg-blue-500",
    anchorId: "markets-geopolitics",
    keywords: [
      "geopolitics", "trade", "sanctions", "currency wars", "reserve currency",
      "petrodollar", "international trade", "aid", "geoeconomics", "capital controls",
      "global economy", "sovereignty", "nation state", "diplomacy", "financialization",
      "financial markets", "financial instruments", "financial capitalism", "global markets"
    ]
  },
  {
    title: "Finance & Economics",
    icon: "💼",
    gradient: "from-green-50 to-green-100/50",
    accent: "bg-green-500",
    anchorId: "finance-economics",
    keywords: [
      "monetary", "inflation", "deflation", "fiscal", "economics", "cbdc",
      "central bank", "banking", "credit", "debt", "money supply", "monetary premium",
      "debt deflation", "fiscal dominance", "monetary system",
      "economic policy", "savings", "lending", "investment"
    ]
  },
  {
    title: "Technology & Innovation",
    icon: "⚡",
    gradient: "from-purple-50 to-purple-100/50",
    accent: "bg-purple-500",
    anchorId: "technology-innovation",
    keywords: [
      "protocol", "technology", "cryptography", "blockchain", "node", "consensus",
      "layer", "ark", "lightning", "smart contract", "programmable", "innovation",
      "infrastructure", "scalability", "privacy", "utxo", "hash", "block",
      "transaction", "bitcoin core", "second layer"
    ]
  },
  {
    title: "Energy & Climate",
    icon: "🌱",
    gradient: "from-orange-50 to-orange-100/50",
    accent: "bg-orange-500",
    anchorId: "energy-climate",
    keywords: [
      "mining", "energy", "climate", "renewable", "grid", "electricity",
      "carbon", "emissions", "sustainability", "hashrate", "miner", "mining farm",
      "mining pool", "proof of work", "energy consumption", "solar", "wind",
      "hydroelectric"
    ]
  },
  {
    title: "Access & Agency",
    icon: "🔓",
    gradient: "from-teal-50 to-teal-100/50",
    accent: "bg-teal-500",
    anchorId: "access-agency",
    keywords: [
      "inclusion", "access", "privacy", "censorship", "sovereignty", "agency",
      "permissionless", "unbanked", "financial inclusion", "civil liberties",
      "freedom", "autonomy", "self-custody", "financial sovereignty"
    ]
  },
  {
    title: "Strategy & Policy",
    icon: "📋",
    gradient: "from-indigo-50 to-indigo-100/50",
    accent: "bg-indigo-500",
    anchorId: "strategy-policy",
    keywords: [
      "policy", "regulation", "strategy", "governance", "regulatory", "legal",
      "framework", "compliance", "government", "national", "strategic",
      "competitive", "paradigm", "framework", "law"
    ]
  }
];

// Mapping from old categories to likely domains
export const CATEGORY_TO_DOMAINS: Record<string, string[]> = {
  "Mining & Consensus": ["Technology & Innovation", "Energy & Climate"],
  "Protocol & Technology": ["Technology & Innovation"],
  "Second Layer": ["Technology & Innovation"],
  "Monetary Theory": ["Finance & Economics"],
  "General": [] // Flag for manual review
};

// Mapping from article IDs to likely domains (based on article topics)
export const ARTICLE_TO_DOMAINS: Record<string, string[]> = {
  "SBI-001": ["Finance & Economics", "Strategy & Policy"],
  "SBI-002": ["Technology & Innovation"],
  "SBI-003": ["Markets & Geopolitics", "Strategy & Policy"],
  "SBI-004": ["Finance & Economics", "Markets & Geopolitics"],
  "SBI-005": ["Finance & Economics", "Technology & Innovation"],
  "SBI-006": ["Energy & Climate"],
  "SBI-007": ["Strategy & Policy"],
  "004": ["Finance & Economics", "Markets & Geopolitics"], // Related article format (financialization is in SBI-004)
  "002": ["Technology & Innovation"],
  "003": ["Markets & Geopolitics", "Strategy & Policy"],
  "006": ["Energy & Climate"]
};

/**
 * Suggest domains for a glossary term based on category, related article, and content
 */
export function suggestDomains(
  category: string,
  relatedArticle?: string,
  content?: string,
  term?: string
): string[] {
  const suggestedDomains = new Set<string>();

  // 1. Check category mapping
  const categoryDomains = CATEGORY_TO_DOMAINS[category] || [];
  categoryDomains.forEach(domain => suggestedDomains.add(domain));

  // 2. Check related article mapping
  if (relatedArticle) {
    const articleDomains = ARTICLE_TO_DOMAINS[relatedArticle] || [];
    articleDomains.forEach(domain => suggestedDomains.add(domain));
  }

  // 3. Check content keywords if category is "General" or no domains found
  if (category === "General" || suggestedDomains.size === 0) {
    const searchText = `${term || ""} ${content || ""}`.toLowerCase();
    
    RESEARCH_DOMAINS.forEach(domain => {
      const matchesKeyword = domain.keywords.some(keyword => 
        searchText.includes(keyword.toLowerCase())
      );
      if (matchesKeyword) {
        suggestedDomains.add(domain.title);
      }
    });
  }

  return Array.from(suggestedDomains);
}

/**
 * Get domain configuration by title
 */
export function getDomainByTitle(title: string): ResearchDomain | undefined {
  return RESEARCH_DOMAINS.find(domain => domain.title === title);
}

