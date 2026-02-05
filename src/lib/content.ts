import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export interface ArticleMeta {
  id: string;
  title: string;
  author: string;
  date: string;
  blockHeight: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  published: boolean;
  slug: string;
  headerImage?: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  expertise: string[];
  published: boolean;
  content?: string;
}

export interface GlossaryTerm {
  term: string;
  slug: string;
  category: string;
  domains?: string[]; // Array of research domain names
  shortDefinition: string;
  content: string;
  relatedArticle?: string;
  published: boolean;
}

// Server-side content loading functions
export async function getAllArticles(): Promise<Article[]> {
  const articles: Article[] = [];
  const articlesDirectory = path.join(process.cwd(), 'src/content/articles');
  
  try {
    // Check if directory exists
    if (!fs.existsSync(articlesDirectory)) {
      console.warn(`Articles directory not found: ${articlesDirectory}`);
      return articles;
    }
    
    const filenames = fs.readdirSync(articlesDirectory);
    console.log(`Found ${filenames.length} files in articles directory`);
    
    for (const filename of filenames) {
      if (filename.endsWith('.md')) {
        try {
          const filePath = path.join(articlesDirectory, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContents);
          
          // Extract slug from filename
          const slug = filename.replace('.md', '');
          
          // Validate required fields
          if (!data.title) {
            console.warn(`Article ${filename} missing title, skipping`);
            continue;
          }
          
          // Auto-calculate read time if not provided
          const readTime = data.readTime || calculateReadTime(content);
          
          // Auto-generate excerpt if not provided
          const excerpt = data.excerpt || generateExcerpt(content);
          
          // Ensure all required fields are present with defaults
          const article: Article = {
            id: data.id || slug,
            title: data.title,
            author: data.author || 'Unknown',
            date: data.date || new Date().toISOString().split('T')[0],
            blockHeight: data.blockHeight || '0',
            excerpt,
            tags: Array.isArray(data.tags) ? data.tags : [],
            readTime,
            featured: Boolean(data.featured),
            published: data.published !== false, // Default to true
            content: content, // Keep as raw markdown for ReactMarkdown
            slug,
            headerImage: data.headerImage,
          };
          
          articles.push(article);
          console.log(`Loaded article: ${article.title} (${article.readTime})`);
        } catch (fileError) {
          console.error(`Error loading article ${filename}:`, fileError);
        }
      }
    }
    
    // Sort by date (newest first) and filter published articles
    return articles
      .filter(article => article.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading articles directory:', error);
    return [];
  }
}

// Get all articles metadata (without content) - for listing pages
export async function getAllArticlesMeta(): Promise<ArticleMeta[]> {
  const articles = await getAllArticles();
  return articles.map(({ content, ...meta }) => meta);
}

// Helper function to calculate read time
function calculateReadTime(content: string, isForesight = false): string {
  const wordsPerMinute = 200; // Average reading speed
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  // For foresight articles, show more granular time
  if (isForesight && minutes <= 1) {
    const seconds = Math.ceil((words / wordsPerMinute) * 60);
    if (seconds < 60) {
      return `${seconds} sec read`;
    }
  }
  
  return `${minutes} min read`;
}

// Helper function to generate excerpt
function generateExcerpt(content: string, maxLength: number = 200): string {
  // Remove markdown headers and formatting
  const cleanContent = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  return cleanContent.substring(0, maxLength).trim() + '...';
}

export async function getAllAuthors(): Promise<Author[]> {
  const authors: Author[] = [];
  const authorsDirectory = path.join(process.cwd(), 'src/content/authors');
  
  try {
    const filenames = fs.readdirSync(authorsDirectory);
    
    for (const filename of filenames) {
      if (filename.endsWith('.md')) {
        const filePath = path.join(authorsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Ensure all required fields are present with defaults
        const author: Author = {
          id: data.id || filename.replace('.md', ''),
          name: data.name || 'Unknown Author',
          role: data.role || 'Contributor',
          bio: data.bio || '',
          avatar: data.avatar || '/placeholder.svg',
          social: {
            linkedin: data.social?.linkedin || '',
            twitter: data.social?.twitter || '',
            email: data.social?.email || '',
          },
          expertise: data.expertise || [],
          published: data.published !== false, // Default to true
          content,
        };
        
        authors.push(author);
      }
    }
    
    // Filter published authors
    return authors.filter(author => author.published);
  } catch (error) {
    console.error('Error reading authors directory:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const filePath = path.join(process.cwd(), 'src/content/articles', `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Ensure all required fields are present with defaults
    const article: Article = {
      id: data.id || slug,
      title: data.title || 'Untitled',
      author: data.author || 'Unknown',
      date: data.date || new Date().toISOString(),
      blockHeight: data.blockHeight || '0',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      readTime: data.readTime || '5 min read',
      featured: data.featured || false,
      published: data.published !== false, // Default to true
      content: content, // Keep as raw markdown for ReactMarkdown
      slug,
      headerImage: data.headerImage,
    };
    
    return article;
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

/**
 * Get articles by author slug
 * Handles mapping of author slugs (e.g., "dr-christian-decker" <-> "christian-decker")
 */
export async function getArticlesByAuthor(authorSlug: string): Promise<Article[]> {
  const allArticles = await getAllArticles();
  
  // Map author slug to article author slug if needed
  // Articles use "dr-christian-decker", team members use "christian-decker"
  const articleSlugMap: Record<string, string> = {
    'christian-decker': 'dr-christian-decker',
  };
  
  const articleAuthorSlug = articleSlugMap[authorSlug] || authorSlug;
  
  // Filter articles by author (check both the team member slug and the article author slug)
  return allArticles.filter(article => 
    article.author === authorSlug || article.author === articleAuthorSlug
  );
}

export async function getAuthorById(id: string): Promise<Author | null> {
  try {
    const filePath = path.join(process.cwd(), 'src/content/authors', `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Ensure all required fields are present with defaults
    const author: Author = {
      id: data.id || id,
      name: data.name || 'Unknown Author',
      role: data.role || 'Contributor',
      bio: data.bio || '',
      avatar: data.avatar || '/placeholder.svg',
      social: {
        linkedin: data.social?.linkedin || '',
        twitter: data.social?.twitter || '',
        email: data.social?.email || '',
      },
      expertise: data.expertise || [],
      published: data.published !== false, // Default to true
      content,
    };
    
    return author;
  } catch (error) {
    console.error(`Error reading author ${id}:`, error);
    return null;
  }
}

// Foresight articles functions
export async function getAllForesightArticles(): Promise<Article[]> {
  const articles: Article[] = [];
  const foresightDirectory = path.join(process.cwd(), 'src/content/foresight');
  
  try {
    // Check if directory exists
    if (!fs.existsSync(foresightDirectory)) {
      console.warn(`Foresight directory not found: ${foresightDirectory}`);
      return articles;
    }
    
    const filenames = fs.readdirSync(foresightDirectory);
    console.log(`Found ${filenames.length} files in foresight directory`);
    
    for (const filename of filenames) {
      if (filename.endsWith('.md')) {
        try {
          const filePath = path.join(foresightDirectory, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContents);
          
          // Skip if missing required fields
          if (!data.title || !data.date) {
            console.log(`Foresight article ${filename} missing title or date, skipping`);
            continue;
          }
          
          // Create slug from filename
          const slug = filename.replace(/\.md$/, '').toLowerCase().replace(/\s+/g, '-');
          
          // Calculate read time (shorter for foresight)
          const readTime = data.readTime || calculateReadTime(content, true); // true for shorter format
          
          // Auto-generate excerpt if not provided
          const excerpt = data.excerpt || generateExcerpt(content);
          
          const article: Article = {
            id: data.id || slug,
            title: data.title,
            author: data.author || 'sbi-team',
            date: data.date,
            blockHeight: data.blockHeight || '',
            excerpt,
            tags: data.tags || ['Foresight'],
            readTime,
            featured: data.featured || false,
            published: data.published !== false, // default to true
            content: content, // Keep as raw markdown for ReactMarkdown
            slug
          };
          
          if (article.published) {
            articles.push(article);
            console.log(`Loaded foresight article: ${article.title} (${article.readTime})`);
          }
        } catch (error) {
          console.error(`Error processing foresight article ${filename}:`, error);
        }
      }
    }
    
    // Sort by date (newest first)
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading foresight articles:', error);
    return articles;
  }
}

export async function getForesightArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllForesightArticles();
  return articles.find(article => article.slug === slug) || null;
}

// Glossary functions
export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  const terms: GlossaryTerm[] = [];
  const glossaryDirectory = path.join(process.cwd(), 'src/content/glossary');
  
  try {
    if (!fs.existsSync(glossaryDirectory)) {
      console.warn(`Glossary directory not found: ${glossaryDirectory}`);
      return terms;
    }
    
    const filenames = fs.readdirSync(glossaryDirectory);
    
    for (const filename of filenames) {
      if (filename.endsWith('.md')) {
        try {
          const filePath = path.join(glossaryDirectory, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContents);
          
          const slug = filename.replace('.md', '');
          
          const term: GlossaryTerm = {
            term: data.term || slug,
            slug,
            category: data.category || 'General',
            domains: data.domains || [], // Read domains from frontmatter
            shortDefinition: data.shortDefinition || '',
            content: content, // Keep as raw markdown for ReactMarkdown
            relatedArticle: data.relatedArticle || '',
            published: data.published !== false,
          };
          
          // If domains missing but category exists, apply auto-mapping for backward compatibility
          // This is done synchronously for simplicity - domains should be assigned via script
          if ((!term.domains || term.domains.length === 0) && term.category) {
            // Simple fallback mapping - will be properly assigned by script
            const categoryMap: Record<string, string[]> = {
              "Mining & Consensus": ["Technology & Innovation", "Energy & Climate"],
              "Protocol & Technology": ["Technology & Innovation"],
              "Second Layer": ["Technology & Innovation"],
              "Monetary Theory": ["Finance & Economics"],
            };
            term.domains = categoryMap[term.category] || [];
          }
          
          if (term.published) {
            terms.push(term);
          }
        } catch (error) {
          console.error(`Error processing glossary term ${filename}:`, error);
        }
      }
    }
    
    // Sort alphabetically by term
    return terms.sort((a, b) => a.term.localeCompare(b.term));
  } catch (error) {
    console.error('Error loading glossary terms:', error);
    return terms;
  }
}

export async function getGlossaryTermBySlug(slug: string): Promise<GlossaryTerm | null> {
  try {
    const filePath = path.join(process.cwd(), 'src/content/glossary', `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const term: GlossaryTerm = {
      term: data.term || slug,
      slug,
      category: data.category || 'General',
      shortDefinition: data.shortDefinition || '',
      content: content, // Keep as raw markdown for ReactMarkdown
      relatedArticle: data.relatedArticle || '',
      published: data.published !== false,
    };
    
    return term;
  } catch (error) {
    console.error(`Error reading glossary term ${slug}:`, error);
    return null;
  }
}

// Convenience exports
export const getAllForesight = getAllForesightArticles;
export const getForesightBySlug = getForesightArticleBySlug;
