const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '../public/Bitcoin glossary – terms.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV (simple parser for this structure)
const lines = csvContent.split('\n');
const glossaryDir = path.join(__dirname, '../src/content/glossary');

// Ensure directory exists
if (!fs.existsSync(glossaryDir)) {
  fs.mkdirSync(glossaryDir, { recursive: true });
}

let imported = 0;
let skipped = 0;

// Start from line 10 (after headers)
for (let i = 10; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  
  // Split by semicolon
  const parts = line.split(';');
  if (parts.length < 5) continue;
  
  const term = parts[0]?.trim();
  const status = parts[1]?.trim();
  const reviewed = parts[2]?.trim();
  const description = parts[3]?.trim();
  const linkedArticle = parts[4]?.trim();
  
  if (!term || !description) {
    skipped++;
    continue;
  }
  
  // Only import "good to go" terms with descriptions
  if (status !== 'good to go') {
    skipped++;
    continue;
  }
  
  // Create slug from term
  const slug = term
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  // Determine category based on term content
  let category = 'General';
  if (term.includes('Mining') || term.includes('Hash') || term.includes('ASIC') || term.includes('Proof of Work')) {
    category = 'Mining & Consensus';
  } else if (term.includes('Block') || term.includes('Transaction') || term.includes('UTXO') || term.includes('Node')) {
    category = 'Protocol & Technology';
  } else if (term.includes('Wallet') || term.includes('Key') || term.includes('Address') || term.includes('Signature')) {
    category = 'Keys & Wallets';
  } else if (term.includes('Lightning') || term.includes('Channel') || term.includes('Ark') || term.includes('Layer')) {
    category = 'Second Layer';
  } else if (term.includes('Fiat') || term.includes('Inflation') || term.includes('Money') || term.includes('Gold') || term.includes('Fiscal')) {
    category = 'Monetary Theory';
  }
  
  // Create markdown content
  const markdown = `---
term: "${term}"
slug: "${slug}"
category: "${category}"
shortDefinition: "${description.substring(0, 150)}..."
relatedArticle: "${linkedArticle || ''}"
published: true
---

# ${term}

${description}

${linkedArticle ? `\n## Related Intelligence\n\nThis term is explored in depth in [SBI-${linkedArticle.padStart(3, '0')}](/intelligence/SBI-${linkedArticle.padStart(3, '0')}).\n` : ''}
`;
  
  // Write to file
  const filename = `${slug}.md`;
  const filepath = path.join(glossaryDir, filename);
  
  fs.writeFileSync(filepath, markdown);
  imported++;
  
  console.log(`Imported: ${term}`);
}

console.log(`\n=== Import Complete ===`);
console.log(`Imported: ${imported} terms`);
console.log(`Skipped: ${skipped} terms`);

