import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { Article, Author } from "@/lib/content";

interface ArticleCardProps {
  article: Article;
  author?: Author;
}

const ArticleCard = ({ article, author }: ArticleCardProps) => {
  return (
    <Link href={`/research/${article.slug}`} className="block h-full">
      <div className="card-research card-gradient-hover h-full group">
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