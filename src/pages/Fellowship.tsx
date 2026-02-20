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
            <h1 className="mb-10 text-gray-900">Join Switzerland's leading network of Bitcoin experts shaping the future of money.</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              The SBI Fellowship brings together independent researchers and practitioners across six critical domains: Access & Agency, Energy & Climate, Finance & Economics, Markets & Geopolitics, Strategy & Policy, and Technology & Innovation. Our fellows produce rigorous, evidence-based analysis on Bitcoin's strategic implications for Switzerland—without the hype.
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
              <h2>Join the Fellowship</h2>
              <p className="swiss-prose max-w-3xl mx-auto text-gray-600 mt-4">
                Become part of Switzerland's premier Bitcoin research network
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* What You'll Do */}
              <div className="card-general card-gradient-hover p-8 h-full">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-swiss-blue/10 to-swiss-blue/5 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">What You'll Do</h3>
                </div>
                <p className="swiss-prose-lg text-gray-700 leading-relaxed mb-6">
                  As a fellow, you'll contribute quarterly insights on topics you choose, build your reputation through our platform, and connect with like-minded experts at our annual networking events.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-swiss-blue text-xl mt-1">•</span>
                    <p className="text-gray-700">Quarterly contributions on topics of your choice</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-swiss-blue text-xl mt-1">•</span>
                    <p className="text-gray-700">Build your reputation through our platform</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-swiss-blue text-xl mt-1">•</span>
                    <p className="text-gray-700">Connect at annual networking events</p>
                  </div>
                </div>
              </div>

              {/* Our Values */}
              <div className="card-general card-gradient-hover p-8 h-full">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-swiss-blue/10 to-swiss-blue/5 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Values</h3>
                </div>
                <p className="swiss-prose-lg text-gray-700 leading-relaxed mb-6">
                  We value quality over quantity, critical thinking over consensus, and loud arguments delivered with a soft voice.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-swiss-blue text-xl mt-1">•</span>
                    <p className="text-gray-700">Quality over quantity</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-swiss-blue text-xl mt-1">•</span>
                    <p className="text-gray-700">Critical thinking over consensus</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-swiss-blue text-xl mt-1">•</span>
                    <p className="text-gray-700">Loud arguments, soft voice</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commitment & Reward */}
            <div className="card-general p-10 bg-gradient-to-br from-swiss-blue/5 via-white to-swiss-blue/5 border-2 border-swiss-blue/20 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-swiss-blue/10 rounded-xl mb-4">
                    <span className="text-2xl">📅</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">The Commitment</h3>
                  <p className="swiss-prose-lg text-gray-700">
                    Four contributions per year on topics you choose
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-swiss-blue/10 rounded-xl mb-4">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">The Reward</h3>
                  <p className="swiss-prose-lg text-gray-700">
                    A loudspeaker for your expertise and a community advancing Bitcoin understanding where it matters most – among Swiss decision-makers.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="swiss-prose-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Ready to contribute to this noble endeavour? We're building something that lasts.
              </p>
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
