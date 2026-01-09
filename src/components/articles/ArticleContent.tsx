import { Article, Author } from '@/lib/content';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import ArticleWithGlossary from './ArticleWithGlossary';
import ReadingControls from './ReadingControls';
import TableOfContents from './TableOfContents';

interface ArticleContentProps {
  article: Article;
  author?: Author;
}

// Helper function to get header image path from article ID and slug
const getHeaderImagePath = (articleId: string, slug: string): string | null => {
  // Handle special slug-based mappings first (these take precedence)
  const slugToImageMap: Record<string, string> = {
    'beyond-the-hype': 'sbi-beyond-the-hype',
    'bitcoin-intelligence-advantage': 'sbi-as-big-as-the-internet',
  };
  
  if (slugToImageMap[slug]) {
    return `/sbi-research-headers/${slugToImageMap[slug]}.webp`;
  }
  
  // Then check if ID matches SBI-XXX pattern (SBI-001 -> sbi-001.webp)
  const normalizedId = articleId.toLowerCase();
  if (normalizedId.match(/^sbi-\d{3}$/)) {
    return `/sbi-research-headers/${normalizedId}.webp`;
  }
  
  return null;
};

const ArticleContent = ({ article, author }: ArticleContentProps) => {
  const headerImage = getHeaderImagePath(article.id, article.slug);
  
  return (
    <article className="max-w-4xl mx-auto">
      {/* Article Header Image */}
      {headerImage && (
        <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
          <Image
            src={headerImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent"></div>
        </div>
      )}
      
      {/* Article Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          <Badge variant="secondary">{article.id}</Badge>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{author?.name || article.author}</span>
          </div>
          <span>Block {article.blockHeight}</span>
        </div>
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          {article.excerpt}
        </p>
      </header>
      
      {/* Table of Contents */}
      <TableOfContents content={article.content} />
      
      {/* Article Content with Glossary */}
      <div className="article-content transition-all duration-200">
        <ArticleWithGlossary content={article.content} />
      </div>
    </article>
  );
};

export { ReadingControls };

export default ArticleContent;