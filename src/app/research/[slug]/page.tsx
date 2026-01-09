import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ArticleContent, { ReadingControls } from '@/components/articles/ArticleContent'
import ArticleDisclaimer from '@/components/articles/ArticleDisclaimer'
import { getArticleBySlug, getAllArticles, getAuthorById } from '@/lib/content'
import ArticleSchema from '@/components/schema/ArticleSchema'

interface PageProps {
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found | Swiss Bitcoin Institute'
    }
  }

  const author = await getAuthorById(article.author)
  
  return {
    title: `${article.title} | Swiss Bitcoin Institute`,
    description: article.excerpt,
    authors: author ? [{ name: author.name }] : undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: author ? [author.name] : undefined,
      tags: article.tags,
      images: ['/opengraph-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: ['/opengraph-image.png'],
    },
  }
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await getAllArticles()
  
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

// Server component - renders on the server for SEO
export default async function ArticlePageRoute({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    notFound()
  }

  const author = await getAuthorById(article.author)

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data for SEO */}
      <ArticleSchema article={article} author={author || undefined} />
      
      {/* Navigation */}
      <div className="swiss-section-sm bg-white border-b">
        <div className="swiss-grid">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" asChild>
              <Link href="/research" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Research
              </Link>
            </Button>
            
            <div className="flex items-center gap-3">
              <ReadingControls />
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="swiss-section">
        <div className="swiss-grid">
          <ArticleContent article={article} author={author || undefined} />
        </div>
      </div>

      {/* Author Bio Section */}
      {author && (
        <div className="swiss-section bg-muted/30">
          <div className="swiss-grid">
            <div className="max-w-4xl mx-auto">
              <div className="bg-background rounded-lg p-8 border">
                <div className="flex items-start gap-6">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{author.name}</h3>
                    <p className="text-muted-foreground mb-3">{author.role}</p>
                    <p className="text-sm leading-relaxed mb-4">{author.bio}</p>
                    
                    {author.expertise && author.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {author.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Articles CTA */}
      <div className="swiss-section bg-background">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">Explore More Research</h3>
            <p className="text-muted-foreground mb-6">
              Discover more strategic insights and analysis from our research team.
            </p>
            <Button asChild size="lg">
              <Link href="/research">
                View All Reports
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Disclaimer Popup */}
      <ArticleDisclaimer />
    </div>
  )
}
