import Image from 'next/image';
import Link from 'next/link';
import CTAButton from '@/components/ui/cta-button';
import { Badge } from '@/components/ui/badge';
import { getResearchFellows } from '@/lib/team';

const Fellowship = () => {
  const fellows = getResearchFellows();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="mb-10 text-gray-900">Swiss Network of Bitcoin Experts</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              The SBI Fellowship brings together independent researchers and practitioners across six critical domains: Access & Agency, Energy & Climate, Finance & Economics, Markets & Geopolitics, Strategy & Policy, and Technology & Innovation. Our fellows produce rigorous, evidence-based analysis on Bitcoin's strategic implications – for Switzerland and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Fellows Grid */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fellows.map((fellow) => (
                <Link 
                  key={fellow.slug} 
                  href={`/fellows/${fellow.slug}`}
                  className="group block"
                >
                  <div className="card-general card-gradient-hover h-full">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 rounded-2xl mx-auto mb-4 overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <Image 
                          src={fellow.photo} 
                          alt={`Photo of ${fellow.name}, Research Fellow at Swiss Bitcoin Institute`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-xl">{fellow.name}</h3>
                      <p className="text-gray-700 leading-relaxed">{fellow.bio}</p>
                    </div>
                    {fellow.tags && (
                      <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 justify-center">
                        {fellow.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="tagBlue">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join the Fellowship */}
      <section className="swiss-section bg-gradient-to-b from-gray-50 to-white">
        <div className="swiss-grid">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="swiss-blue-gradient-accent mx-auto"></div>
              </div>
              <h2>Interested to join the SBI Fellowship?</h2>
              <p className="swiss-prose max-w-3xl mx-auto text-gray-600 mt-4">
                If you are interested in becoming part of the SBI Fellowship Network, get in touch with us. In a personal conversation, we exchange common interests and motivations, and explore ways of working together. We're building something that lasts.
              </p>
            </div>
            
            {/* CTA */}
            <div className="text-center">
              <CTAButton
                variant="primary"
                size="lg"
                href="/contact"
                className="shadow-2xl"
              >
                Get in touch
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fellowship;
