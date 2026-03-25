#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create slug from name
function createSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Create new author
function createNewAuthor(name, role = 'Contributor', email = '') {
  const slug = createSlug(name);
  const filename = `${slug}.md`;
  
  // Check if author already exists
  const authorPath = path.join(__dirname, '../src/content/authors', filename);
  if (fs.existsSync(authorPath)) {
    console.log(`Author already exists: ${filename}`);
    return;
  }
  
  const template = fs.readFileSync(path.join(__dirname, '../templates/author-template.md'), 'utf8');
  
  const authorContent = template
    .replace('"author-slug"', `"${slug}"`)
    .replace('"Full Name"', `"${name}"`)
    .replace('"Position/Title"', `"${role}"`)
    .replace('/team/author-slug.png', `/team/${slug}.png`)
    .replace('email@example.com', email || 'contact@bitcoininstitute.ch');
  
  fs.writeFileSync(authorPath, authorContent);
  
  console.log(`Created new author: ${filename}`);
  console.log(`Edit it at: src/content/authors/${filename}`);
  console.log(`Add photo at: public/team/${slug}.png`);
  console.log('\nRemember to:');
  console.log('- Add professional headshot photo');
  console.log('- Update bio and expertise');
  console.log('- Add social media links');
  console.log('- Set published: true when ready');
}

// Command line interface
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node scripts/new-author.js "Full Name" ["Role"] ["email@example.com"]');
  console.log('Example: node scripts/new-author.js "John Smith" "Senior Analyst" "john@example.com"');
  process.exit(1);
}

const name = args[0];
const role = args[1] || 'Contributor';
const email = args[2] || '';

createNewAuthor(name, role, email);
