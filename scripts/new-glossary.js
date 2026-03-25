#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const categories = [
  'Protocol & Technology',
  'Mining & Consensus',
  'Keys & Wallets',
  'Second Layer',
  'Monetary Theory',
  'Economics & Markets',
  'Other'
];

async function main() {
  console.log('\nSwiss Bitcoin Institute - New Glossary Term Creator\n');

  const term = await question('Term name (e.g., "Block Height"): ');
  if (!term.trim()) {
    console.error('Error: Term name is required');
    rl.close();
    process.exit(1);
  }

  const slug = slugify(term);
  console.log(`Generated slug: ${slug}`);

  console.log('\nAvailable categories:');
  categories.forEach((cat, i) => console.log(`  ${i + 1}. ${cat}`));
  const categoryIndex = await question('Select category (1-7): ');
  const category = categories[parseInt(categoryIndex) - 1] || 'Other';

  const shortDef = await question('\nShort definition (for tooltips, 1-2 sentences):\n');
  if (!shortDef.trim()) {
    console.error('Error: Short definition is required');
    rl.close();
    process.exit(1);
  }

  const relatedArticle = await question('\nRelated article ID (optional, e.g., "SBI-001"): ');

  const template = `---
term: "${term}"
slug: "${slug}"
category: "${category}"
shortDefinition: "${shortDef}"
${relatedArticle.trim() ? `relatedArticle: "${relatedArticle.trim()}"` : '# relatedArticle: "SBI-XXX"'}
published: true
---

# ${term}

## Overview

${shortDef}

## Technical Details

[Provide detailed explanation of the term here]

- Key point 1
- Key point 2
- Key point 3

## Use Cases

[Describe practical applications and examples]

## Swiss Context

[If applicable, describe relevance to Switzerland]

## Related Terms

- [Related Term 1](/glossary/related-term-1)
- [Related Term 2](/glossary/related-term-2)

## Further Reading

- [Bitcoin Technical Resources](https://bitcoin.org/en/developer-guide)
`;

  const filename = `${slug}.md`;
  const filepath = path.join(__dirname, '..', 'src', 'content', 'glossary', filename);

  // Check if file already exists
  if (fs.existsSync(filepath)) {
    console.error(`\nError: Glossary term "${filename}" already exists!`);
    rl.close();
    process.exit(1);
  }

  // Create the file
  fs.writeFileSync(filepath, template, 'utf8');

  console.log(`\nCreated glossary term: ${filename}`);
  console.log(`Location: src/content/glossary/${filename}`);
  console.log(`URL: /glossary/${slug}`);
  console.log('\nNext steps:');
  console.log('  1. Edit the file to add detailed content');
  console.log('  2. The term will automatically highlight in articles');
  console.log('  3. Commit and push to deploy\n');

  rl.close();
}

main().catch(error => {
  console.error('\nError:', error.message);
  rl.close();
  process.exit(1);
});

