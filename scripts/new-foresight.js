#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function createForesightArticle() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log(`
Usage: npm run new:foresight "<title>"

Example: npm run new:foresight "Swiss Banks Adopt Bitcoin: What It Means"

This will:
- Create a new foresight article file
- Generate a slug from the title
- Use the foresight template
- Auto-increment the FST-XXX ID
`);
    process.exit(1);
  }

  const title = args[0];
  
  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

  // Get next FST number
  const foresightDir = path.join(__dirname, '..', 'src', 'content', 'foresight');
  let nextNumber = 1;
  
  if (fs.existsSync(foresightDir)) {
    const files = fs.readdirSync(foresightDir);
    const fstNumbers = files
      .filter(f => f.endsWith('.md'))
      .map(f => {
        const match = f.match(/^(\d+)-/);
        return match ? parseInt(match[1]) : 0;
      })
      .filter(n => n > 0);
    
    if (fstNumbers.length > 0) {
      nextNumber = Math.max(...fstNumbers) + 1;
    }
  }

  const fstId = `FST-${String(nextNumber).padStart(3, '0')}`;
  const filename = `${String(nextNumber).padStart(2, '0')}-${slug}.md`;
  const today = new Date().toISOString().split('T')[0];
  
  // Read template
  const templatePath = path.join(__dirname, '..', 'templates', 'foresight-template.md');
  
  if (!fs.existsSync(templatePath)) {
    console.error('Foresight template not found at:', templatePath);
    process.exit(1);
  }
  
  let template = fs.readFileSync(templatePath, 'utf8');
  
  // Replace placeholders
  template = template.replace('FST-XXX', fstId);
  template = template.replace('Article Title: Connect Bitcoin to Current News', title);
  template = template.replace('YYYY-MM-DD', today);
  
  // Ensure foresight directory exists
  if (!fs.existsSync(foresightDir)) {
    fs.mkdirSync(foresightDir, { recursive: true });
  }
  
  // Write file
  const filePath = path.join(foresightDir, filename);
  
  if (fs.existsSync(filePath)) {
    console.error(`File already exists: ${filename}`);
    process.exit(1);
  }
  
  fs.writeFileSync(filePath, template);
  
  console.log(`Created new foresight article: ${filename}`);
  console.log(`Edit it at: src/content/foresight/${filename}`);
  console.log(`URL will be: /foresight/${slug}`);
  console.log('');
  console.log('Remember to:');
  console.log('- Connect Bitcoin to current news');
  console.log('- Keep it under 300 words');
  console.log('- Include Swiss-specific context');
  console.log('- Set published: true when ready');
}

createForesightArticle();
