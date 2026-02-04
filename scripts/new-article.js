#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the next article ID
function getNextArticleId() {
  const articlesDir = path.join(__dirname, '../src/content/articles');
  const files = fs.readdirSync(articlesDir);
  
  const ids = files
    .filter(file => file.startsWith('SBI-') && file.endsWith('.md'))
    .map(file => {
      const match = file.match(/SBI-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    })
    .filter(id => !isNaN(id));
  
  const maxId = Math.max(0, ...ids);
  return String(maxId + 1).padStart(3, '0');
}

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// Create new article
function createNewArticle(title, author = 'unknown') {
  const articleId = getNextArticleId();
  const filename = `SBI-${articleId}.md`;
  
  // Create article content based on the schema
  const articleContent = `---
id: "SBI-${articleId}"
title: "${title}"
author: "${author}"
date: "${getCurrentDate()}"
blockHeight: ""
excerpt: "A brief description of your article that will appear in article listings and social media previews."
tags: ["Tag 1", "Tag 2", "Tag 3"]
readTime: "" # Leave empty to auto-calculate
featured: false
published: false # Set to true when ready to publish
---

# ${title}

Write your article content here using Markdown formatting.

## Section Headers

Use ## for main sections and ### for subsections.

### Key Points

- Use bullet points for lists
- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- \`inline code\` for technical terms

### Swiss Context

Always consider how your topic relates to Switzerland and Swiss interests.

## Conclusion

Summarize your key findings and their implications for Swiss leaders and organizations.

---

**Author Guidelines:**
- Use clear, executive-friendly language
- Include specific Swiss context where relevant
- Cite sources and data where appropriate
- Keep paragraphs concise and scannable
- Include actionable insights
`;
  
  const articlePath = path.join(__dirname, '../src/content/articles', filename);
  fs.writeFileSync(articlePath, articleContent);
  
  console.log(`✅ Created new article: ${filename}`);
  console.log(`📝 Edit it at: src/content/articles/${filename}`);
  console.log('\nRemember to:');
  console.log('- Add your content');
  console.log('- Update the blockHeight');
  console.log('- Update tags and excerpt');
  console.log('- Set published: true when ready');
}

// Command line interface
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node scripts/new-article.js "Article Title" [author-id]');
  console.log('Example: node scripts/new-article.js "Bitcoin and Energy" marcus-dapp');
  process.exit(1);
}

const title = args[0];
const author = args[1] || 'unknown';

createNewArticle(title, author);
