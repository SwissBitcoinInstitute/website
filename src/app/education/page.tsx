import type { Metadata } from 'next'
import CTAButton from '@/components/ui/cta-button'

export const metadata: Metadata = {
  title: 'Executive Education in Bitcoin | Swiss Bitcoin Institute',
  description: 'For executives, wealth managers, and financial advisors. Strategic and technical courses from Switzerland\'s independent Bitcoin think tank.',
  openGraph: {
    title: 'Executive Education in Bitcoin | Swiss Bitcoin Institute',
    description: 'Strategic and technical Bitcoin education for Swiss professionals.',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive Education in Bitcoin | Swiss Bitcoin Institute',
    description: 'Strategic and technical Bitcoin education for Swiss professionals.',
    images: ['/opengraph-image.png'],
  },
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-right-top md:bg-top bg-no-repeat"
          style={{
            backgroundImage: 'url(/SBI-education-hero.jpg)',
          }}
        />
        {/* White overlay for strong fade effect - 80% opacity (image at ~20% visibility) */}
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="swiss-grid relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <span className="pill-hero mb-6 bg-white/90 backdrop-blur-sm">
                <span className="mr-2">🎓</span>
                <span className="pill-hero-text">Professional Education</span>
              </span>
            </div>
            <h1>Executive Education in Bitcoin</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Lead your organization into a shift as fundamental as the internet or the printing press: The Bitcoin Epoch.
            </p>
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Bitcoin Webinar Card */}
              <div className="group bg-white rounded-2xl border border-gray-200 p-8 hover:border-swiss-blue/50 hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="flex-1">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-bitcoin-orange/10 mb-4">
                    <span className="text-bitcoin-orange text-sm font-medium">Free</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Bitcoin Webinar</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    One strategic insight – clear enough to help you decide whether Bitcoin matters for your job, In 21 minutes.
                  </p>
                </div>
                <div className="mt-auto">
                  <CTAButton 
                    variant="primary" 
                    size="lg" 
                    href="/webinar"
                    className="w-full shadow-lg group-hover:shadow-xl transition-shadow"
                  >
                    Find out more
                  </CTAButton>
                </div>
              </div>

              {/* Bitcoin for Executives Card */}
              <div className="group bg-white rounded-2xl border border-gray-200 p-8 hover:border-swiss-blue/50 hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Bitcoin Executive Masterclass</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    For leaders who need to make strategic decisions about Bitcoin. Professional guided overview of Bitcoin\'s strategic impact focusing on macro across geopolitics, business, policy, and civil society.
                  </p>
                </div>
                <div className="mt-auto">
                  <CTAButton 
                    variant="primary" 
                    size="lg" 
                    href="/education/bitcoin-for-executives"
                    className="w-full shadow-lg group-hover:shadow-xl transition-shadow"
                  >
                    Find out more
                  </CTAButton>
                </div>
              </div>

              {/* Financial Sovereignty Card */}
              <div className="group bg-white rounded-2xl border border-gray-200 p-8 hover:border-swiss-blue/50 hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Financial Sovereignty</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Learn to securely control your own Bitcoin through hands-on training with hardware wallets, seed phrase management, and secure backup strategies.
                  </p>
                </div>
                <div className="mt-auto">
                  <CTAButton 
                    variant="primary" 
                    size="lg" 
                    href="/education/financial-sovereignty"
                    className="w-full shadow-lg group-hover:shadow-xl transition-shadow"
                  >
                    Find out more
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Modules */}
      <section className="swiss-section bg-gray-50">
        <div className="swiss-grid">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="swiss-blue-gradient-accent mx-auto"></div>
              </div>
              <h2>Dedicated Modules</h2>
              <p className="swiss-prose max-w-3xl mx-auto text-gray-600">
                We will be developing dedicated modules across SBI's Domain Framework to complement the Masterclass with more focused implications for verticals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Markets & Geopolitics', icon: '🌍' },
                { name: 'Finance & Economics', icon: '💼' },
                { name: 'Technology & Innovation', icon: '⚡' },
                { name: 'Energy & Climate', icon: '🌱' },
                { name: 'Access & Agency', icon: '🔓' },
                { name: 'Strategy & Policy', icon: '📋' }
              ].map((domain, index) => (
                <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-swiss-blue/50 hover:shadow-lg transition-all duration-300 text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br from-swiss-blue/10 to-swiss-blue/5 group-hover:from-swiss-blue/20 group-hover:to-swiss-blue/10 transition-all duration-300 mx-auto">
                    <span className="text-3xl">{domain.icon}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-lg group-hover:swiss-blue-gradient-text transition-colors duration-300">
                    {domain.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="swiss-section bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 cta-section-bg"></div>
        <div className="swiss-grid relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="mb-8 text-white">Interested in Strategic Bitcoin Education?</h2>
            <p className="swiss-prose mb-12 text-gray-300 max-w-3xl mx-auto">
              Express your interest and we'll keep you informed as we develop our comprehensive program 
              covering strategic fundamentals and our six research domains.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <CTAButton 
                variant="primary" 
                size="lg" 
                href="/contact"
                className="shadow-2xl"
              >
                Schedule Consultation
              </CTAButton>
              <CTAButton 
                variant="secondary" 
                size="lg" 
                href="/research"
                className="border-white text-gray-900 bg-white hover:bg-gray-100"
              >
                View Research
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

