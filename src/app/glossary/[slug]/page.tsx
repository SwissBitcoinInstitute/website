import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getGlossaryTermBySlug, getAllGlossaryTerms } from '@/lib/content'
import { getDomainByTitle } from '@/lib/glossary-domains'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import GlossaryTermSchema from '@/components/schema/GlossaryTermSchema'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const term = await getGlossaryTermBySlug(params.slug)
  
  if (!term) {
    return {
      title: 'Term Not Found | Swiss Bitcoin Institute'
    }
  }
  
  return {
    title: `${term.term} - Bitcoin Glossary | Swiss Bitcoin Institute`,
    description: term.shortDefinition,
    openGraph: {
      title: `${term.term} | Bitcoin Glossary`,
      description: term.shortDefinition,
      images: ['/opengraph-image.png'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${term.term} | Bitcoin Glossary`,
      description: term.shortDefinition,
      images: ['/opengraph-image.png'],
    },
  }
}

export async function generateStaticParams() {
  const terms = await getAllGlossaryTerms()
  
  return terms.map((term) => ({
    slug: term.slug,
  }))
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const term = await getGlossaryTermBySlug(params.slug)
  
  if (!term) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data for SEO */}
      <GlossaryTermSchema term={term} />
      
      {/* Navigation */}
      <div className="swiss-section-sm bg-white border-b">
        <div className="swiss-grid">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/glossary" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Glossary
              </Link>
            </Button>
            
            {term.domains && term.domains.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {term.domains.map(domainTitle => {
                  const domain = getDomainByTitle(domainTitle)
                  if (!domain) return null
                  return (
                    <Badge
                      key={domainTitle}
                      className={`text-xs px-3 py-1.5 bg-gradient-to-r ${domain.gradient} border ${domain.accent} text-gray-900 font-medium flex items-center gap-1.5`}
                    >
                      <span>{domain.icon}</span>
                      <span>{domainTitle}</span>
                    </Badge>
                  )
                })}
              </div>
            ) : term.category ? (
              <Badge variant="secondary" className="flex items-center gap-2">
                <BookOpen className="w-3 h-3" />
                {term.category}
              </Badge>
            ) : null}
          </div>
        </div>
      </div>

      {/* Term Content */}
      <div className="swiss-section">
        <div className="swiss-grid">
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-6 text-gray-900">{term.term}</h1>
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {term.domains && term.domains.length > 0 && (
                  <>
                    {term.domains.map(domainTitle => {
                      const domain = getDomainByTitle(domainTitle)
                      if (!domain) return null
                      return (
                        <Badge
                          key={domainTitle}
                          className={`text-sm px-3 py-1.5 bg-gradient-to-r ${domain.gradient} border ${domain.accent} text-gray-900 font-medium flex items-center gap-1.5`}
                        >
                          <span>{domain.icon}</span>
                          <span>{domainTitle}</span>
                        </Badge>
                      )
                    })}
                  </>
                )}
                {term.relatedArticle && (
                  <Link href={`/research/SBI-${term.relatedArticle.padStart(3, '0')}`}>
                    <Badge variant="outline" className="hover:bg-bitcoin-orange/10 hover:border-bitcoin-orange cursor-pointer">
                      Featured in SBI-{term.relatedArticle.padStart(3, '0')}
                    </Badge>
                  </Link>
                )}
              </div>
              
            </header>
            
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => {
                    // Skip if it's the same as the term name (subtitle)
                    if (children?.toString().trim().toLowerCase() === term.term.toLowerCase()) {
                      return null;
                    }
                    return <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>;
                  },
                  h2: ({ children }) => {
                    // Skip if it's the same as the term name (subtitle)
                    if (children?.toString().trim().toLowerCase() === term.term.toLowerCase()) {
                      return null;
                    }
                    return <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>;
                  },
                  h3: ({ children }) => <h4 className="text-lg font-semibold mt-5 mb-2">{children}</h4>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-bitcoin-orange hover:underline">
                      {children}
                    </a>
                  ),
                }}
              >
                {term.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </div>


      {/* Back to Glossary CTA */}
      <div className="swiss-section bg-background">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Explore More Terms</h3>
            <p className="text-gray-600 mb-6">
              Browse our comprehensive glossary to deepen your Bitcoin understanding.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="/glossary">
                <BookOpen className="w-4 h-4 mr-2" />
                View All Terms
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

