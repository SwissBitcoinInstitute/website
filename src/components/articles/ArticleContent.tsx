import { Article, Author } from '@/lib/content';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ArticleWithGlossary from './ArticleWithGlossary';
import ReadingControls from './ReadingControls';
import TableOfContents from './TableOfContents';
import { getTeamMemberBySlug } from '@/lib/team';

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
        <div className="relative w-full h-48 sm:h-56 lg:h-64 mb-6 sm:mb-8 rounded-lg overflow-hidden">
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
      <header className="mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs sm:text-sm">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 leading-tight">{article.title}</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 lg:gap-4 text-muted-foreground mb-4 sm:mb-5">
          <Badge variant="secondary" className="w-fit text-xs sm:text-sm">{article.id}</Badge>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
            <span className="text-xs sm:text-sm lg:text-base">Block {article.blockHeight}</span>
          </div>
          <span className="hidden sm:inline text-gray-400">•</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base">{new Date(article.date).toLocaleDateString()}</span>
          </div>
          <span className="hidden sm:inline text-gray-400">•</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base">{article.readTime}</span>
          </div>
          <span className="hidden sm:inline text-gray-400">•</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            {(() => {
              // Check if author is a fellow and make name clickable
              // Map article author slug to team member slug
              const articleToTeamSlugMap: Record<string, string> = {
                'dr-christian-decker': 'christian-decker',
                'luca-ferrarese': 'luca-ferrarese',
              };
              const teamMemberSlug = articleToTeamSlugMap[article.author] || article.author;
              const teamMember = getTeamMemberBySlug(teamMemberSlug, 'fellow'); // Prefer fellow if exists
              const isFellow = teamMember?.category === 'fellow';
              
              if (isFellow) {
                return (
                  <Link 
                    href={`/fellows/${teamMemberSlug}`}
                    className="link-research hover:underline text-xs sm:text-sm lg:text-base break-words"
                  >
                    {author?.name || article.author}
                  </Link>
                );
              }
              return <span className="text-xs sm:text-sm lg:text-base break-words">{author?.name || article.author}</span>;
            })()}
          </div>
        </div>
        
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
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