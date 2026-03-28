import type { Metadata } from 'next'
import CTAButton from '@/components/ui/cta-button'

export const metadata: Metadata = {
  title: 'Executive Education in Bitcoin | Swiss Bitcoin Institute',
  description: 'For executives in business, government, and civil society from Switzerland\'s independent Bitcoin think tank.',
  openGraph: {
    title: 'Executive Education in Bitcoin | Swiss Bitcoin Institute',
    description: 'For executives in business, government, and civil society',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive Education in Bitcoin | Swiss Bitcoin Institute',
    description: 'For executives in business, government, and civil society',
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
            <h1>Bitcoin Education for Executives</h1>
            <p className="swiss-prose-lg max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Bitcoin is unlike anything before it – every analogy eventually breaks down. We translate deep research and experience into compact formats that cut through the noise and focus on what matters strategically.
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
                    <span className="text-bitcoin-orange text-sm font-medium">Coming soon</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">SBI Podcast</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Our goal is to make the impact that Bitcoin can have on society tangible.
                  </p>
                </div>
                <div className="mt-auto">
                  {/*                   <CTAButton 
                    variant="primary" 
                    size="lg" 
                    href="/webinar"
                    className="w-full"
                  >
                    Find out more
                  </CTAButton> */}
                </div>
              </div>

              {/* Bitcoin Executive Masterclass Card */}
              <div className="group bg-white rounded-2xl border border-gray-200 p-8 hover:border-swiss-blue/50 hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Bitcoin Executive Masterclass</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Short, intense C-level course to gain an overview over the strategic questions raised by Bitcoin.
                  </p>
                </div>
                <div className="mt-auto">
                  <CTAButton
                    variant="primary"
                    size="lg"
                    href="/education/bitcoin-for-executives"
                    className="w-full"
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
                    className="w-full"
                  >
                    Find out more
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="swiss-section bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 cta-section-bg"></div>
        <div className="swiss-grid relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="mb-8 text-white">Unsure what you need?</h2>
            <p className="swiss-prose mb-12 text-gray-300 max-w-3xl mx-auto">
              Get in touch and raise your questions or specific requirements your organisation has.
              We constanstly develop our programs further to best suit your needs.
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

