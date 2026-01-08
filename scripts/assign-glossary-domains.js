#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Domain definitions matching glossary-domains.ts
const CATEGORY_TO_DOMAINS = {
  "Mining & Consensus": ["Technology & Innovation", "Energy & Climate"],
  "Protocol & Technology": ["Technology & Innovation"],
  "Second Layer": ["Technology & Innovation"],
  "Monetary Theory": ["Finance & Economics"],
  "General": [] // Flag for manual review
};

const ARTICLE_TO_DOMAINS = {
  "SBI-001": ["Finance & Economics", "Strategy & Policy"],
  "SBI-002": ["Technology & Innovation"],
  "SBI-003": ["Markets & Geopolitics", "Strategy & Policy"],
  "SBI-004": ["Finance & Economics", "Markets & Geopolitics"],
  "SBI-005": ["Finance & Economics", "Technology & Innovation"],
  "SBI-006": ["Energy & Climate"],
  "SBI-007": ["Strategy & Policy"],
  "001": ["Finance & Economics", "Strategy & Policy"],
  "002": ["Technology & Innovation"],
  "003": ["Markets & Geopolitics", "Strategy & Policy"],
  "004": ["Finance & Economics", "Markets & Geopolitics"],
  "005": ["Finance & Economics", "Technology & Innovation"],
  "006": ["Energy & Climate"],
  "007": ["Strategy & Policy"]
};

const DOMAIN_KEYWORDS = {
  "Markets & Geopolitics": [
    "geopolitics", "trade", "sanctions", "currency wars", "reserve currency",
    "petrodollar", "international trade", "aid", "geoeconomics", "capital controls",
    "global economy", "sovereignty", "nation state", "diplomacy", "financialization",
    "financial markets", "financial instruments", "financial capitalism", "global markets"
  ],
  "Finance & Economics": [
    "monetary", "inflation", "deflation", "fiscal", "economics", "cbdc",
    "central bank", "banking", "credit", "debt", "money supply", "monetary premium",
    "debt deflation", "fiscal dominance", "monetary system",
    "economic policy", "savings", "lending", "investment"
  ],
  "Technology & Innovation": [
    "protocol", "technology", "cryptography", "blockchain", "node", "consensus",
    "layer", "ark", "lightning", "smart contract", "programmable", "innovation",
    "infrastructure", "scalability", "privacy", "utxo", "hash", "block",
    "transaction", "bitcoin core", "second layer"
  ],
  "Energy & Climate": [
    "mining", "energy", "climate", "renewable", "grid", "electricity",
    "carbon", "emissions", "sustainability", "hashrate", "miner", "mining farm",
    "mining pool", "proof of work", "energy consumption", "solar", "wind",
    "hydroelectric"
  ],
  "Access & Agency": [
    "inclusion", "access", "privacy", "censorship", "sovereignty", "agency",
    "permissionless", "unbanked", "financial inclusion", "civil liberties",
    "freedom", "autonomy", "self-custody", "financial sovereignty"
  ],
  "Strategy & Policy": [
    "policy", "regulation", "strategy", "governance", "regulatory", "legal",
    "framework", "compliance", "government", "national", "strategic",
    "competitive", "paradigm", "framework", "law"
  ]
};

function suggestDomains(category, relatedArticle, content, term) {
  const suggestedDomains = new Set();

  // 1. Check category mapping
  const categoryDomains = CATEGORY_TO_DOMAINS[category] || [];
  categoryDomains.forEach(domain => suggestedDomains.add(domain));

  // 2. Check related article mapping
  if (relatedArticle) {
    // Handle both "SBI-004" and "004" formats
    const articleKey = relatedArticle.startsWith('SBI-') ? relatedArticle : relatedArticle;
    const articleDomains = ARTICLE_TO_DOMAINS[articleKey] || ARTICLE_TO_DOMAINS[relatedArticle] || [];
    articleDomains.forEach(domain => suggestedDomains.add(domain));
  }

  // 3. Check content keywords if category is "General" or no domains found
  if (category === "General" || suggestedDomains.size === 0) {
    const searchText = `${term || ""} ${content || ""}`.toLowerCase();
    
    Object.entries(DOMAIN_KEYWORDS).forEach(([domain, keywords]) => {
      const matchesKeyword = keywords.some(keyword => 
        searchText.includes(keyword.toLowerCase())
      );
      if (matchesKeyword) {
        suggestedDomains.add(domain);
      }
    });
  }

  return Array.from(suggestedDomains);
}

function updateGlossaryFile(filePath, domains) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Update frontmatter with domains
  data.domains = domains;
  
  // Reconstruct file with updated frontmatter
  const updatedFile = matter.stringify(content, data);
  fs.writeFileSync(filePath, updatedFile, 'utf8');
}

function main() {
  const glossaryDirectory = path.join(process.cwd(), 'src/content/glossary');
  
  if (!fs.existsSync(glossaryDirectory)) {
    console.error(`Glossary directory not found: ${glossaryDirectory}`);
    process.exit(1);
  }

  const filenames = fs.readdirSync(glossaryDirectory);
  const results = {
    autoAssigned: [],
    needsReview: [],
    errors: []
  };

  filenames.forEach(filename => {
    if (!filename.endsWith('.md')) return;

    const filePath = path.join(glossaryDirectory, filename);
    
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      const category = data.category || 'General';
      const relatedArticle = data.relatedArticle || '';
      const content = fileContents;
      const term = data.term || filename.replace('.md', '');
      
      // Skip if domains already exist
      if (data.domains && Array.isArray(data.domains) && data.domains.length > 0) {
        console.log(`✓ ${term} already has domains: ${data.domains.join(', ')}`);
        return;
      }
      
      const suggestedDomains = suggestDomains(category, relatedArticle, content, term);
      
      if (suggestedDomains.length === 0 || category === "General") {
        results.needsReview.push({
          term,
          file: filename,
          category,
          relatedArticle,
          suggested: suggestedDomains
        });
        console.log(`⚠ ${term} needs manual review (category: ${category})`);
      } else {
        updateGlossaryFile(filePath, suggestedDomains);
        results.autoAssigned.push({
          term,
          file: filename,
          domains: suggestedDomains
        });
        console.log(`✓ ${term} → ${suggestedDomains.join(', ')}`);
      }
    } catch (error) {
      results.errors.push({
        file: filename,
        error: error.message
      });
      console.error(`✗ Error processing ${filename}: ${error.message}`);
    }
  });

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Auto-assigned: ${results.autoAssigned.length}`);
  console.log(`Needs review: ${results.needsReview.length}`);
  console.log(`Errors: ${results.errors.length}`);

  if (results.needsReview.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('TERMS NEEDING MANUAL REVIEW');
    console.log('='.repeat(60));
    results.needsReview.forEach(({ term, category, relatedArticle, suggested }) => {
      console.log(`\n${term}`);
      console.log(`  Category: ${category}`);
      console.log(`  Related Article: ${relatedArticle || 'none'}`);
      console.log(`  Suggested: ${suggested.length > 0 ? suggested.join(', ') : 'none (needs manual assignment)'}`);
    });
  }

  if (results.errors.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('ERRORS');
    console.log('='.repeat(60));
    results.errors.forEach(({ file, error }) => {
      console.log(`${file}: ${error}`);
    });
  }
}

main();

