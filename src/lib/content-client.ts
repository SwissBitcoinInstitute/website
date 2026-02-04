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

// Client-side content loading functions (for use in client components)
// fetchArticles returns metadata only (no content) for listing pages
export async function fetchArticles(): Promise<ArticleMeta[]> {
  try {
    const response = await fetch('/api/articles');
    if (!response.ok) throw new Error('Failed to fetch articles');
    return response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`/api/articles/${slug}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    return null;
  }
}

export async function fetchAuthors(): Promise<Author[]> {
  try {
    const response = await fetch('/api/authors');
    if (!response.ok) throw new Error('Failed to fetch authors');
    return response.json();
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

export async function fetchAuthor(id: string): Promise<Author | null> {
  try {
    const response = await fetch(`/api/authors/${id}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error(`Error fetching author ${id}:`, error);
    return null;
  }
}

// Foresight articles functions
export async function getForesightArticles(): Promise<Article[]> {
  try {
    const response = await fetch('/api/foresight');
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Error fetching foresight articles:', error);
    return [];
  }
}

export async function getForesightArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`/api/foresight/${slug}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching foresight article:', error);
    return null;
  }
}
