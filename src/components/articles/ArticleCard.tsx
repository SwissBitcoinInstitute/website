import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ArticleMeta, Author } from "@/lib/content";

interface ArticleCardProps {
  article: ArticleMeta;
  author?: Author;
}

const ArticleCard = ({ article, author }: ArticleCardProps) => {
  const headerImage = article.headerImage ? `/sbi-research-headers/${article.headerImage}` : null;
  
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
              <span>Block {article.blockHeight}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>{article.readTime}</span>
            </div>
          </div>
          
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="tagGray" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600 truncate">
                {author?.name || article.author}
              </span>
            </div>
            
            <div className="link-research text-xs sm:text-sm whitespace-nowrap">
              Read Full Report →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;