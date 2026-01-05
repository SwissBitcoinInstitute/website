"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CTAButton from '@/components/ui/cta-button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { fetchArticles, fetchAuthors, Article, Author } from '@/lib/content-client';
import ArticleCard from '@/components/articles/ArticleCard';

const Research = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive our latest Bitcoin intelligence reports."
    });
    setEmail('');
  };

  const getAuthorById = (authorId: string) => {
    return authors.find(author => author.id === authorId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading intelligence reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <span className="pill-hero mb-6">
                <span className="mr-2">🧠</span>
                <span className="pill-hero-text">Strategic Intelligence</span>
              </span>
            </div>
            <h1>Bitcoin Intelligence</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              We cover all strategic aspects of Bitcoin and deliver actionable insights for your decision-making on a regular basis. Stay ahead with Bitcoin intelligence that matters.
            </p>
          </div>
        </div>
      </section>

      {/* Research Domains */}
      <section className="swiss-section bg-gray-50">
        <div className="swiss-grid">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="swiss-blue-gradient-accent mx-auto"></div>
            </div>
            <h2>Six Research Domains</h2>
            <p className="swiss-prose max-w-4xl mx-auto text-gray-600">
              Our research spans six interconnected domains that capture Bitcoin's full strategic significance
              for Switzerland's leadership in the global monetary system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Markets & Geopolitics",
                question: "What happens when nations and companies can settle trade in a neutral asset beyond the control of any single state?",
                icon: "🌍"
              },
              {
                title: "Finance & Economics",
                question: "What happens when fixed-supply, rules-based money challenges inflationary systems and the fusion of money and state power?",
                icon: "💰"
              },
              {
                title: "Technology & Innovation",
                question: "What innovations become possible when financial infrastructure is open, programmable, and free from centralized control?",
                icon: "⚡"
              },
              {
                title: "Energy & Climate",
                question: "How does Bitcoin's direct link to energy markets impact grid stability, renewable build-out, and climate mitigation strategies?",
                icon: "⚡"
              },
              {
                title: "Access & Agency",
                question: "How can permissionless, neutral money improve financial inclusion and protect civil liberties?",
                icon: "🔓"
              },
              {
                title: "Strategy & Policy",
                question: "How should Switzerland balance innovation, sovereignty, and risk when Bitcoin challenges traditional monetary and regulatory paradigms?",
                icon: "🎯"
              }
            ].map((domain, index) => (
              <Link
                key={index}
                href="/domains"
                className="group block h-full"
              >
                <div className="card-general card-gradient-hover h-full flex flex-col p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-swiss-blue/10 to-swiss-blue/5 flex items-center justify-center mb-4 group-hover:from-swiss-blue/20 group-hover:to-swiss-blue/10 transition-all duration-300">
                      <span className="text-2xl">{domain.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:swiss-blue-gradient-text transition-colors">
                      {domain.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed flex-grow mb-4">
                    {domain.question}
                    </p>
                  <div className="flex items-center text-sm font-medium swiss-blue-gradient-text mt-auto">
                    <span>Explore domain</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ResQ Package */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="swiss-blue-gradient-accent mx-auto"></div>
              </div>
              <h2>Quarterly Research Package</h2>
              <p className="text-lg text-gray-600 mb-8">
                Original, forward-looking fundamental research on Bitcoin giving a 360° view. Plus selected curated and fellow-commented Bitcoin news. Every quarter.
              </p>
            </div>

            <div className="bg-gradient-to-r from-swiss-blue/5 to-swiss-blue/10 rounded-2xl p-8 border border-swiss-blue/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quarterly Intelligence Package</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="swiss-blue-gradient-text mr-3 mt-1">•</span>
                      <span>360° fundamental Bitcoin research</span>
                    </li>
                    <li className="flex items-start">
                      <span className="swiss-blue-gradient-text mr-3 mt-1">•</span>
                      <span>Forward-looking strategic insights</span>
                    </li>
                    <li className="flex items-start">
                      <span className="swiss-blue-gradient-text mr-3 mt-1">•</span>
                      <span>Curated Bitcoin news with expert commentary</span>
                    </li>
                    <li className="flex items-start">
                      <span className="swiss-blue-gradient-text mr-3 mt-1">•</span>
                      <span>Quarterly delivery schedule</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <CTAButton variant="primary" size="lg" href="/inquiry?service=research" className="mb-4">
                    Learn More
                  </CTAButton>
                  <p className="text-sm text-gray-500">
                    Contact us for pricing and subscription details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Reports */}
      <section className="swiss-section bg-gradient-to-b from-gray-50 to-white">
        <div className="swiss-grid">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="swiss-blue-gradient-accent mx-auto"></div>
            </div>
            <h2>Latest Intelligence Reports</h2>
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

      {/* Newsletter Subscription */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-swiss-blue/20 shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-swiss-blue/20 to-swiss-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl">📧</span>
                </div>
                
                <h2 className="text-3xl font-semibold mb-6 text-gray-900">
                  Stay Ahead with Bitcoin Intelligence
                </h2>
                
                <p className="swiss-prose-lg mb-8 text-gray-600 max-w-2xl mx-auto">
                  Strategic Bitcoin insights directly to your mailbox. Twice a month. Unsubscribe anytime.
                </p>
                
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input 
                      type="email" 
                      placeholder="your.email@company.com" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required 
                      className="h-12 flex-1" 
                    />
                    <Button 
                      type="submit" 
                      className="h-12 px-8 swiss-blue-gradient swiss-blue-gradient-hover text-white whitespace-nowrap w-full sm:w-auto"
                    >
                      Subscribe to Intelligence Brief
                    </Button>
                  </div>
                </form>
                
                <p className="text-sm text-gray-500 mt-4">
                  Join our growing community of Bitcoin intelligence subscribers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
              <CTAButton variant="primary" size="lg" href="/inquiry?service=research" showArrow>
                Request Custom Analysis
              </CTAButton>
              <CTAButton variant="secondary" size="lg" href="/contact" className="bg-white text-gray-900 hover:bg-gray-100">
                Discuss Your Needs
              </CTAButton>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Research;

