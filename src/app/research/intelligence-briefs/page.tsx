"use client";

import { useState, useEffect } from 'react';
import { fetchArticles, fetchAuthors, ArticleMeta, Author } from '@/lib/content-client';
import ArticleCard from '@/components/articles/ArticleCard';
import NewsletterSection from '@/components/sections/NewsletterSection'
import CTAButton from '@/components/ui/cta-button';

export default function IntelligenceBriefsPage() {
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [articlesData, authorsData] = await Promise.all([
          fetchArticles(),
          fetchAuthors()
        ]);
        setArticles(articlesData);
        setAuthors(authorsData);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const getAuthorById = (authorId: string) => {
    return authors.find(author => author.id === authorId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading intelligence briefs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-right-top md:bg-top bg-no-repeat"
          style={{
            backgroundImage: 'url(/offerings-images/Intelligence-Briefs-Chemister-lab-ETHZ.jpg)',
          }}
        />
        {/* White overlay for strong fade effect - 80% opacity (image at ~20% visibility) */}
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="swiss-grid relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="mb-6 text-gray-900">Bitcoin Intelligence Briefs</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Expert Bitcoin analysis that goes beyond the headlines – one dedicated deep dive per domain, every quarter, by SBI Fellows.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Reports */}
      <section id="intelligence" className="swiss-section bg-gradient-to-b from-gray-50 to-white scroll-mt-24">
        <div className="swiss-grid">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="swiss-blue-gradient-accent mx-auto"></div>
            </div>
            <h2>Latest Intelligence Briefs</h2>
            <p className="swiss-prose max-w-3xl mx-auto text-gray-600">
              Deep-dive analysis and strategic insights from our research team, published at specific
              block heights to ensure transparency and immutability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                author={getAuthorById(article.author)}
              />
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No intelligence reports available at this time.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />

      {/* CTA Section */}
      <section className="swiss-section bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 cta-section-bg"></div>
        <div className="swiss-grid relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-medium text-white mb-6">
              Need Custom Intelligence?
            </h2>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Get tailored Bitcoin intelligence and strategic analysis for your specific
              industry, market, or organizational needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <CTAButton variant="primary" size="lg" href="/inquiry?service=research">
                Request Custom Analysis
              </CTAButton>
              <CTAButton
                variant="secondary"
                size="lg"
                href="/research"
                className="border-white text-gray-900 bg-white hover:bg-gray-100"
              >
                View Research Offering
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
