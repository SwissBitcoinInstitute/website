"use client";

import CTAButton from '@/components/ui/cta-button';
import NewsletterSection from '@/components/sections/NewsletterSection';
import NewsletterButton from '@/components/ui/newsletter-button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const Home = () => {
  const handleNewsletterScroll = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const element = document.getElementById('newsletter');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const principles = [{
    icon: "🏛️",
    title: "Sovereignty",
    description: "Self-custody and monetary independence"
  }, {
    icon: "🤝",
    title: "Neutrality",
    description: "Non-partisan, evidence-based research"
  }, {
    icon: "⚖️",
    title: "Consensus",
    description: "Transparent, collaborative decision-making"
  }, {
    icon: "🌐",
    title: "Decentralization",
    description: "Distributed systems and resilience"
  }, {
    icon: "🕊️",
    title: "Liberty",
    description: "Economic freedom and individual rights"
  }];
  const services = [{
    title: "Education",
    description: "From 1:1 bespoke sessions to more formal courses",
    icon: "🎓",
    primaryCta: { text: "Explore options", link: "/education" },
    secondaryCta: { text: "Request Course Information", link: "/inquiry?service=courses" }
  }, {
    title: "Research",
    description: "Actionable insights on Bitcoin's strategic implications",
    icon: "🧠",
    primaryCta: { text: "View offering", link: "/research" },
    secondaryCta: { text: "Book Discovery Call", link: "/inquiry?service=research&discovery=true" }
  }, {
    title: "Speaking",
    description: "Keynotes that get the message across and encourage reflection",
    icon: "🎤",
    primaryCta: { text: "View talks", link: "/speaking" },
    secondaryCta: { text: "Submit Speaking Request", link: "/inquiry?service=speaking" }
  }];
  const researchHighlights = [{
    title: "Switzerland's Digital Currency Strategy",
    description: "Beyond stablecoins to Bitcoin adoption—analyzing Switzerland's strategic choice in the digital currency landscape.",
    readTime: "18 min read",
    link: "/research/SBI-003"
  }, {
    title: "Inflation by Design, Deflation by Technology",
    description: "Preparing for a hybrid monetary order where fiat inflation meets Bitcoin's deflationary technology.",
    readTime: "22 min read",
    link: "/research/SBI-004"
  }, {
    title: "A Quantum of Solace",
    description: "To defend against quantum technology attacks, Bitcoin requires consensus on quantum-resistant cryptography.",
    readTime: "20 min read",
    link: "/research/SBI-005"
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
            <div className="mb-8">
              <span className="pill-hero mb-6 bg-white/90 backdrop-blur-sm">
                <span className="mr-2">🇨🇭</span>
                <span className="pill-hero-text">Switzerland's Independent Bitcoin Think Tank</span>
              </span>
            </div>
            <h1 className="text-gray-900">Empowering leaders for the Bitcoin age</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700">
              Executive education and independent research to navigate the transition to sound digital money.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <CTAButton variant="primary" size="lg" href="/inquiry?service=research&discovery=true" className="shadow-2xl">
                Book Discovery Call
              </CTAButton>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleNewsletterScroll}
                className="font-medium transition-all duration-300 group btn-hover-scale bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300 hover:bg-bitcoin-orange/5 hover:border-bitcoin-orange"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe to Intelligence Brief
              </Button>
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
            <h2>What We Do</h2>
            <p className="swiss-prose-lg max-w-3xl mx-auto text-gray-600">
              Three core offerings designed for Switzerland's decision-makers navigating the Bitcoin transition.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="card-general card-gradient-hover group"
              >
                <div className="relative z-10">
                  {/* Icon with gradient background */}
                  <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl swiss-blue-gradient-subtle shadow-sm">
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-base">
                    {service.description}
                  </p>
                  
                  {/* CTAs */}
                  <div className="space-y-3">
                  <CTAButton 
                    variant="primary" 
                    size="lg" 
                      href={service.primaryCta.link} 
                      className="w-full"
                    >
                      {service.primaryCta.text}
                    </CTAButton>
                    <CTAButton 
                      variant="secondary" 
                      size="lg" 
                      href={service.secondaryCta.link} 
                    className="w-full"
                  >
                      {service.secondaryCta.text}
                  </CTAButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More to Come Card */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="card-general p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">More to come in 2026!</h3>
                <p className="text-gray-600 mb-6 text-base">
                  We plan to expand our offering with much more. Stay tuned!
                </p>
                <CTAButton 
                  variant="secondary" 
                  size="lg" 
                  href="/webinar"
                  className="mx-auto"
                >
                  Tell me more
                </CTAButton>
              </div>
            </div>
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
            <h2>Research Highlights</h2>
            <p className="swiss-prose max-w-3xl mx-auto text-gray-600">
              Discover our latest Intelligence Briefs. We are covering a wide range of Bitcoin-related domains.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchHighlights.map((highlight, index) => {
              // Extract article ID from link (e.g., /research/SBI-003 -> SBI-003)
              const articleId = highlight.link.replace('/research/', '');
              const headerImage = articleId.toLowerCase().match(/^sbi-\d{3}$/) 
                ? `/sbi-research-headers/${articleId.toLowerCase()}.webp` 
                : null;
              
              return (
                <Link key={index} href={highlight.link} className="group block">
                  <div className="card-research card-gradient-hover h-full overflow-hidden">
                    {headerImage && (
                      <div className="relative h-32 w-full overflow-hidden">
                        <Image
                          src={headerImage}
                          alt={highlight.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="tagBlue">Research</Badge>
                        <span className="text-gray-500 text-sm">{highlight.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{highlight.description}</p>
                      <div className="link-research text-sm">
                        Read Analysis →
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
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
              <CTAButton variant="secondary" size="lg" href="/speaking" className="border-white text-gray-900 bg-white hover:bg-gray-100 shadow-xl">
                View Speaking Engagements
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;