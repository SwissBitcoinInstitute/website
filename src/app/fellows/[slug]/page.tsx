import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, Linkedin, ChevronLeft, ChevronRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTeamMemberBySlug, getResearchFellows } from '@/lib/team';
import { getAuthorById, getArticlesByAuthor } from '@/lib/content';
import PersonSchema from '@/components/schema/PersonSchema';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArticleCard from '@/components/articles/ArticleCard';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const member = getTeamMemberBySlug(params.slug, 'fellow');

  if (!member || member.category !== 'fellow') {
    return {
      title: 'Fellow Not Found | Swiss Bitcoin Institute',
    };
  }

  return {
    title: `${member.name} - ${member.role} | Swiss Bitcoin Institute`,
    description: member.bio,
    openGraph: {
      title: `${member.name} - ${member.role}`,
      description: member.bio,
      type: 'profile',
      images: [member.photo],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${member.name} - ${member.role}`,
      description: member.bio,
      images: [member.photo],
    },
  };
}

export async function generateStaticParams() {
  const fellows = getResearchFellows();
  return fellows.map((fellow) => ({
    slug: fellow.slug,
  }));
}

export default async function FellowPage({ params }: PageProps) {
  const member = getTeamMemberBySlug(params.slug, 'fellow');

  if (!member || member.category !== 'fellow') {
    notFound();
  }

  // Try to get detailed author content from markdown file
  const author = await getAuthorById(member.slug);

  // Get articles by this fellow
  // The getArticlesByAuthor function handles slug mapping automatically
  const fellowArticles = await getArticlesByAuthor(member.slug);
  
  // Sort articles by date (newest first)
  fellowArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Get authors for all articles
  const articlesWithAuthors = await Promise.all(
    fellowArticles.map(async (article) => {
      const articleAuthor = await getAuthorById(article.author);
      return { article, author: articleAuthor || undefined };
    })
  );

  // Get all fellows for navigation
  const allFellows = getResearchFellows();
  const currentIndex = allFellows.findIndex(f => f.slug === params.slug);
  const nextFellow = currentIndex < allFellows.length - 1 ? allFellows[currentIndex + 1] : null;
  const prevFellow = currentIndex > 0 ? allFellows[currentIndex - 1] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data for SEO */}
      <PersonSchema member={member} />

      {/* Navigation */}
      <div className="swiss-section-sm bg-white border-b">
        <div className="swiss-grid">
          <Button variant="ghost" asChild>
            <Link href="/fellows" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Fellows
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="swiss-section bg-gradient-to-b from-gray-50 to-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={member.photo}
                    alt={`Photo of ${member.name}, ${member.role} at Swiss Bitcoin Institute`}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-3 text-gray-900">
                  {member.name}
                </h1>
                
                <p className="text-2xl text-bitcoin-orange font-semibold mb-4">
                  {member.role}
                </p>

                {/* Expertise Tags */}
                {member.tags && member.tags.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {member.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Links */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {member.email && (
                    <Button variant="default" asChild>
                      <a href={`mailto:${member.email}`} className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                    </Button>
                  )}
                  {member.linkedin && member.linkedin !== '#' && (
                    <Button variant="outline" asChild>
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {member.twitter && member.twitter !== '#' && (
                    <Button variant="outline" asChild>
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Image
                          src="/twitter-x-logo- vector.avif"
                          alt="X"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        X
                      </a>
                    </Button>
                  )}
                  {member.github && member.github !== '#' && (
                    <Button variant="outline" asChild>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {member.nostr && (
                    <Button variant="outline" asChild>
                      <a
                        href={member.nostr}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <span className="text-sm font-medium">Nostr</span>
                      </a>
                    </Button>
                  )}
                  {member.bluesky && (
                    <Button variant="outline" asChild>
                      <a
                        href={member.bluesky}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <span className="text-sm font-medium">BlueSky</span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">About</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {member.bio}
            </p>

            {/* Display author markdown content if available */}
            {author && author.content && (
              <div className="space-y-8 mt-8">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => {
                      // Skip h1 if it's the same as the member's name (duplicate)
                      const headingText = String(children).trim();
                      if (headingText === member.name || headingText === member.name.replace('Dr. ', '')) {
                        return null;
                      }
                      return <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 first:mt-0">{children}</h2>;
                    },
                    h2: ({ children }) => (
                      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h3>
                    ),
                    h3: ({ children }) => (
                      <h4 className="text-lg font-semibold mt-5 mb-2 text-gray-900">{children}</h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-lg text-gray-700 leading-relaxed mb-4">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-lg text-gray-700 leading-relaxed">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900">{children}</strong>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-swiss-blue pl-4 my-4 italic text-gray-600">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">
                        {children}
                      </code>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-swiss-blue hover:underline"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {author.content}
                </ReactMarkdown>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Articles Section */}
      {fellowArticles.length > 0 && (
        <section className="swiss-section bg-white">
          <div className="swiss-grid">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">Research & Articles</h2>
                <p className="text-sm sm:text-base text-gray-600">
                  {member.name.split(' ')[member.name.split(' ').length - 1]}'s contributions to Bitcoin intelligence and research.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {articlesWithAuthors.map(({ article, author: articleAuthor }) => (
                  <ArticleCard 
                    key={article.slug} 
                    article={article} 
                    author={articleAuthor}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Navigation to Next/Previous Fellow */}
      {(nextFellow || prevFellow) && (
        <section className="swiss-section bg-white border-t border-gray-200">
          <div className="swiss-grid">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                {prevFellow ? (
                  <Button variant="outline" asChild className="flex items-center gap-2">
                    <Link href={`/fellows/${prevFellow.slug}`}>
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Previous</span>
                      <span className="sm:hidden">Prev</span>
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <Button variant="ghost" asChild>
                  <Link href="/fellows">View All Fellows</Link>
                </Button>
                
                {nextFellow ? (
                  <Button variant="outline" asChild className="flex items-center gap-2">
                    <Link href={`/fellows/${nextFellow.slug}`}>
                      <span className="hidden sm:inline">Next</span>
                      <span className="sm:hidden">Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="swiss-section bg-gray-900">
        <div className="swiss-grid">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Work with {member.name.split(' ')[member.name.split(' ').length - 1]}
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Interested in collaboration, speaking engagements, or strategic consulting?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="bg-white text-gray-900 hover:bg-gray-100">
                <Link href="/fellows">View All Fellows</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
