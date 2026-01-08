import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Article, Author } from "@/lib/content";

interface ArticleCardProps {
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

const ArticleCard = ({ article, author }: ArticleCardProps) => {
  const headerImage = getHeaderImagePath(article.id, article.slug);
  
  return (
    <Link href={`/research/${article.slug}`} className="block h-full">
      <div className="card-research card-gradient-hover h-full group overflow-hidden">
        {headerImage && (
          <div className="relative h-32 w-full overflow-hidden">
            <Image
              src={headerImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
          </div>
        )}
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>Block {article.blockHeight}</span>
            <span>•</span>
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
          
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            {article.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="tagGray">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {author?.name || article.author}
              </span>
            </div>
            
            <div className="link-research text-sm">
              Read Full Report →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;