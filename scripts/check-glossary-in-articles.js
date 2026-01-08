#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Get all glossary terms
const glossaryDir = path.join(process.cwd(), 'src/content/glossary');
const articlesDir = path.join(process.cwd(), 'src/content/articles');

const glossaryTerms = [];
const articles = [];

// Load all glossary terms
const glossaryFiles = fs.readdirSync(glossaryDir).filter(f => f.endsWith('.md'));
glossaryFiles.forEach(filename => {
  const filePath = path.join(glossaryDir, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  glossaryTerms.push({
    term: data.term,
    slug: data.slug,
    relatedArticle: data.relatedArticle || null,
  });
});

// Load all articles
const articleFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && !f.startsWith('.'));
articleFiles.forEach(filename => {
  const filePath = path.join(articlesDir, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  articles.push({
    id: data.id,
    title: data.title,
    slug: filename.replace('.md', ''),
    content: content,
  });
});

// Function to normalize term for searching (lowercase, remove special chars, handle variations)
function normalizeTerm(term) {
  return term.toLowerCase()
    .replace(/[()–—]/g, ' ') // Remove parentheses and em/en dashes
    .replace(/\s+/g, ' ')
    .trim();
}

// Function to extract key words from a term (remove common words like "the", "a", etc.)
function extractKeyWords(term) {
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'at', 'by', 'for', 'with']);
  return term.toLowerCase()
    .replace(/[()–—]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
}

// Function to check if term is mentioned in content
function isTermMentioned(term, content) {
  const normalizedContent = content.toLowerCase();
  const normalizedTerm = normalizeTerm(term);
  
  // Special handling for common variations
  const termVariations = {
    'proof of work (pow)': ['proof-of-work', 'proof of work', 'pow', 'p o w'],
    'utxo – unspent transaction output': ['utxo', 'unspent transaction', 'unspent transaction output'],
    'asp – ark service provider': ['asp', 'ark service provider', 'ark service'],
    'sha-256': ['sha-256', 'sha256', 'sha 256'],
    'ripemd-160': ['ripemd-160', 'ripemd160', 'ripemd 160'],
    '51 percent attack': ['51 percent', '51%', '51-percent', 'majority attack'],
    'block header': ['block header', 'block-header'],
    'block subsidy': ['block subsidy', 'block-subsidy', 'subsidy'],
    'coinbase transaction': ['coinbase transaction', 'coinbase-transaction', 'coinbase'],
    'hash function': ['hash function', 'hash-function', 'hashfunction'],
    'hashrate': ['hashrate', 'hash rate', 'hash-rate'],
    'mining farm': ['mining farm', 'mining-farm'],
    'nonce': ['nonce'],
  };
  
  // Check if we have specific variations
  const lowerTerm = term.toLowerCase();
  if (termVariations[lowerTerm]) {
    for (const variation of termVariations[lowerTerm]) {
      const regex = new RegExp(`\\b${variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(normalizedContent)) {
        return true;
      }
    }
  }
  
  // Extract key words for compound terms
  const keyWords = extractKeyWords(term);
  
  // For terms with multiple key words, check if all key words appear
  if (keyWords.length > 1) {
    const allKeyWordsPresent = keyWords.every(word => {
      const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(normalizedContent);
    });
    if (allKeyWordsPresent) {
      return true;
    }
  }
  
  // Check the full normalized term and variations
  const variations = [
    normalizedTerm,
    normalizedTerm.replace(/\s+/g, '-'), // with hyphens
    normalizedTerm.replace(/\s+/g, ''), // no spaces
  ];
  
  for (const variation of variations) {
    if (variation.length > 2) {
      const regex = new RegExp(`\\b${variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(normalizedContent)) {
        return true;
      }
      // Also check without word boundaries for partial matches
      if (normalizedContent.includes(variation)) {
        return true;
      }
    }
  }
  
  // For single-word terms, check direct match
  if (keyWords.length === 1) {
    const word = keyWords[0];
    const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(normalizedContent)) {
      return true;
    }
  }
  
  return false;
}

// Check each term against all articles
const results = {
  mentioned: [],
  notMentioned: [],
  hasRelatedArticle: [],
  missingFromRelated: [],
};

glossaryTerms.forEach(({ term, slug, relatedArticle }) => {
  let foundInAnyArticle = false;
  const foundInArticles = [];
  
  articles.forEach(article => {
    if (isTermMentioned(term, article.content)) {
      foundInAnyArticle = true;
      foundInArticles.push(article.id);
    }
  });
  
  if (foundInAnyArticle) {
    results.mentioned.push({
      term,
      slug,
      foundIn: foundInArticles,
      relatedArticle,
    });
    
    // Check if term has relatedArticle but wasn't found in it
    if (relatedArticle) {
      const expectedId = `SBI-${relatedArticle.padStart(3, '0')}`;
      if (!foundInArticles.includes(expectedId)) {
        results.missingFromRelated.push({
          term,
          slug,
          expectedArticle: expectedId,
          foundIn: foundInArticles,
        });
      }
    }
  } else {
    results.notMentioned.push({
      term,
      slug,
      relatedArticle,
    });
  }
  
  if (relatedArticle) {
    results.hasRelatedArticle.push({ term, slug, relatedArticle });
  }
});

// Print results
console.log('='.repeat(80));
console.log('GLOSSARY TERMS CHECK RESULTS');
console.log('='.repeat(80));
console.log(`\nTotal glossary terms: ${glossaryTerms.length}`);
console.log(`Terms mentioned in articles: ${results.mentioned.length}`);
console.log(`Terms NOT mentioned in any article: ${results.notMentioned.length}`);
console.log(`Terms with relatedArticle field: ${results.hasRelatedArticle.length}`);
console.log(`Terms with relatedArticle but not found in that article: ${results.missingFromRelated.length}`);

if (results.notMentioned.length > 0) {
  console.log('\n' + '='.repeat(80));
  console.log('TERMS NOT MENTIONED IN ANY ARTICLE:');
  console.log('='.repeat(80));
  results.notMentioned.forEach(({ term, slug, relatedArticle }) => {
    console.log(`\n${term} (${slug})`);
    if (relatedArticle) {
      console.log(`  ⚠ Has relatedArticle: SBI-${relatedArticle.padStart(3, '0')} but not found there`);
    } else {
      console.log(`  ❌ No relatedArticle field set`);
    }
  });
}

if (results.missingFromRelated.length > 0) {
  console.log('\n' + '='.repeat(80));
  console.log('TERMS WITH RELATED ARTICLE BUT NOT FOUND IN THAT ARTICLE:');
  console.log('='.repeat(80));
  results.missingFromRelated.forEach(({ term, slug, expectedArticle, foundIn }) => {
    console.log(`\n${term} (${slug})`);
    console.log(`  Expected in: ${expectedArticle}`);
    console.log(`  Actually found in: ${foundIn.join(', ') || 'none'}`);
  });
}

if (results.notMentioned.length === 0 && results.missingFromRelated.length === 0) {
  console.log('\n✅ All glossary terms are mentioned in at least one article!');
}

