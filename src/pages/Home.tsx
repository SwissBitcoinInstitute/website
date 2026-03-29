"use client";

import { useState, useEffect } from 'react';
import CTAButton from '@/components/ui/cta-button';
import NewsletterSection from '@/components/sections/NewsletterSection';
import NewsletterButton from '@/components/ui/newsletter-button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { fetchArticles, ArticleMeta } from '@/lib/content-client';
import { testimonials } from '@/data/testimonials';

const Home = () => {
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    fetchArticles().then(data => {
      setArticles(data);
      setLoadingArticles(false);
    });
  }, []);

  // Filter for highlighted articles (maintain order)
  const highlightedIds = ['SBI-003', 'SBI-008', 'SBI-005'];
  const researchHighlights = highlightedIds
    .map(id => articles.find(a => a.id === id))
    .filter((a): a is ArticleMeta => a !== undefined);
  const principles = [{
    icon: "",
    title: "Sovereignty",
    description: "Self-custody and monetary independence"
  }, {
    icon: "",
    title: "Neutrality",
    description: "Non-partisan, evidence-based research"
  }, {
    icon: "",
    title: "Consensus",
    description: "Transparent, collaborative decision-making"
  }, {
    icon: "",
    title: "Decentralization",
    description: "Distributed systems and resilience"
  }, {
    icon: "",
    title: "Liberty",
    description: "Economic freedom and individual rights"
  }];
  const services = [{
    title: "Executive Education",
    description: "Compact and tailored formats that cut through the noise",
    icon: "",
    primaryCta: { text: "Explore options", link: "/education" },
    secondaryCta: { text: "Request Course Information", link: "/inquiry?service=courses#service-selection" }
  }, {
    title: "Bitcoin Research",
    description: "Curated and packaged into actionable insights",
    icon: "",
    primaryCta: { text: "View offering", link: "/research" },
    secondaryCta: { text: "Book Discovery Call", link: "/inquiry?service=research&discovery=true" }
  }, {
    title: "Speaking",
    description: "Informative, entertaining or thought-provoking?",
    icon: "",
    primaryCta: { text: "View talks", link: "/speaking" },
    secondaryCta: { text: "Submit Speaking Request", link: "/inquiry?service=speaking#service-selection" }
  }];
  return <div className="min-h-screen">
    {/* Hero Section */}
    <section className="swiss-hero swiss-gradient relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-right-top md:bg-top bg-no-repeat"
        style={{
          backgroundImage: 'url(/sbi-realism-hero-v2.jpg)',
        }}
      />
      {/* White overlay for strong fade effect - 80% opacity (image at ~20% visibility) */}
      <div className="absolute inset-0 bg-white/80"></div>
      <div className="swiss-grid relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-gray-900">Grasp Bitcoin. Navigate the Shift with Conviction and Clarity.</h1>
          <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700">
            The global monetary order is shifting – and Bitcoin's role is widely misunderstood. We provide independent, in-depth expertise for decision-makers in business, politics, and civil society.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <CTAButton variant="primary" size="lg" href="/inquiry?service=research&discovery=true" className="shadow-2xl">
              Book Discovery Call
            </CTAButton>
          </div>
        </div>
      </div>
    </section>


    {/* What We Do Section */}
    <section className="swiss-section bg-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 swiss-blue-gradient-subtle opacity-50"></div>

      <div className="swiss-grid relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="swiss-blue-gradient-accent mx-auto"></div>
          </div>
          <h2>How can we help?</h2>
          <p className="swiss-prose-lg max-w-3xl mx-auto text-gray-600">
            Our goal is to make you proficient in all strategic aspects of Bitcoin. You choose which channel best supports your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.primaryCta.link}
              className="group block h-full"
            >
              <div className="card-general card-gradient-hover h-full flex flex-col">
                <div className="relative z-10 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-base flex-grow">
                    {service.description}
                  </p>

                  {/* Link format matching glossary */}
                  <div className="link-research text-sm mt-auto">
                    {service.primaryCta.text} →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>

    {/* Research Highlights */}
    <section className="swiss-section bg-white">
      <div className="swiss-grid">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="swiss-blue-gradient-accent mx-auto"></div>
          </div>
          <h2>Latest Bitcoin Research</h2>
          <p className="swiss-prose max-w-3xl mx-auto text-gray-600">
            We intend to cover the entire Bitcoin space across all relevant domains. Read our latest Intelligence Briefs here.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loadingArticles ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="card-research h-full overflow-hidden animate-pulse">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))
          ) : (
            researchHighlights.map((article) => {
              const headerImage = article.headerImage ? `/sbi-research-headers/${article.headerImage}` : null;

              return (
                <Link key={article.id} href={`/research/${article.slug}`} className="group block">
                  <div className="card-research card-gradient-hover h-full overflow-hidden">
                    {headerImage && (
                      <div className="relative h-32 w-full overflow-hidden">
                        <Image
                          src={headerImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/25 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="tagBlue">Research</Badge>
                        <span className="text-gray-500 text-sm">{article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">
                        {article.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{article.excerpt}</p>
                      <div className="link-research text-sm">
                        Read Analysis →
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="swiss-section bg-gray-50">
      <div className="swiss-grid">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="swiss-blue-gradient-accent mx-auto"></div>
            </div>
            <h2>What Leaders Say</h2>
          </div>

          <div className="space-y-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card-general flex flex-col md:flex-row items-center md:items-start gap-8 p-8 md:p-10 card-gradient-hover group">
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
                  <div className="flex-shrink-0 w-32 h-32 md:w-36 md:h-36 relative rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover bg-gray-200"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="swiss-prose-lg italic text-gray-700 mb-6">
                      <span className="text-xl md:text-2xl text-gray-400 font-serif mr-1 relative top-1">&ldquo;</span>
                      {testimonial.text}<span className="text-xl md:text-2xl text-gray-400 font-serif relative top-1">&rdquo;</span>
                    </p>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}, <span className="font-medium text-gray-800">{testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Newsletter */}
    <NewsletterSection />

    {/* Final CTA */}
    <section className="swiss-section bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 cta-section-bg"></div>
      <div className="swiss-grid relative">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="mb-8 text-white">Partner with us to shape Switzerland's leadership in the Bitcoin age</h2>
          <p className="swiss-prose mb-12 text-gray-300 max-w-3xl mx-auto">
            Join the transition to sound digital money with Switzerland's most trusted Bitcoin research and education platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <CTAButton variant="primary" size="lg" href="/inquiry" className="shadow-2xl">
              Let's Connect
            </CTAButton>
            <CTAButton variant="secondary" size="lg" href="/speaking" className="shadow-xl">
              View Speaking Engagements
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  </div>;
};
export default Home;