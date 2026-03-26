import type { Metadata } from 'next'
import Link from 'next/link'
import CTAButton from '@/components/ui/cta-button'

import { Users, Clock, MapPin } from 'lucide-react'

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

const CourseSection = ({
  title,
  description,
  href,
  tag,
  details
}: {
  title: string;
  description: string;
  href?: string;
  tag?: string;
  details?: { icon: React.ReactNode; label: string; value: string }[];
}) => (
  <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-swiss-blue/30 hover:shadow-xl transition-all duration-300 mb-8 last:mb-0">
    <div className="flex flex-col md:flex-row min-h-[320px]">
      {/* Left Column: Course Details */}
      <div className="w-full md:w-1/3 bg-gray-50/50 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100">
        {details ? (
          <div className="space-y-6">
            {details.map((detail, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="text-swiss-blue mt-1">{detail.icon}</div>
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{detail.label}</div>
                  <div className="text-sm font-semibold text-gray-900">{detail.value}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="hidden md:block"></div>
        )}
      </div>

      {/* Right Column: Content */}
      <div className="flex-1 p-8 md:p-10 flex flex-col">
        <div className="flex-1">
          {tag && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-bitcoin-orange/10 mb-6">
              <span className="text-bitcoin-orange text-xs font-semibold uppercase tracking-wider">{tag}</span>
            </div>
          )}
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{title}</h3>
          <p className="swiss-prose-lg text-gray-600 mb-8 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
        {href && (
          <div className="mt-auto pt-6 border-t border-gray-100">
            <Link 
              href={href}
              className="link-research text-sm"
            >
              Find out more →
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function CoursesPage() {
  const masterclassDetails = [
    { icon: <MapPin className="w-5 h-5" />, label: 'Format', value: 'Live physical (Zürich)' },
    { icon: <Clock className="w-5 h-5" />, label: 'Duration', value: '12 hours' },
    { icon: <Users className="w-5 h-5" />, label: 'Level', value: 'Senior executives' },
  ];

  const finSovDetails = [
    { icon: <MapPin className="w-5 h-5" />, label: 'Format', value: 'Live course (in Zürich)' },
    { icon: <Clock className="w-5 h-5" />, label: 'Duration', value: 'One afternoon' },
    { icon: <Users className="w-5 h-5" />, label: 'Level', value: 'Bitcoiner Beginners' },
  ];

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
            <h1 className="mb-6">Executive Education</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Build the competency your organization needs to navigate the Bitcoin age confidently.
            </p>
          </div>
        </div>
      </section>

      {/* Course Sections */}
      <section className="swiss-section bg-white overflow-hidden">
        <div className="swiss-grid">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col">
              <CourseSection
                title="Bespoke Bitcoin Advisory"
                description="A private advisory offering for decisionmakers seeking a deeper, strategic understanding of Bitcoin."
                href="/inquiry?service=advisory"
              />

              <CourseSection
                title="Bitcoin Executive Masterclass"
                description="Short, intense C-level course to gain an overview over the strategic questions raised by Bitcoin."
                href="/education/bitcoin-for-executives"
                details={masterclassDetails}
              />

              <CourseSection
                title="Financial Sovereignty"
                description="Learn to securely control your own Bitcoin through hands-on training with hardware wallets, seed phrase management, and secure backup strategies."
                href="/education/financial-sovereignty"
                details={finSovDetails}
              />
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
              <h2>Dedicated Classes (planned)</h2>
              <p className="swiss-prose max-w-3xl mx-auto text-gray-600">
                Complementing the Bitcoin Executive Masterclass, these classes offer a deep-dive into Bitcoin's specific mechanics in each of the following domains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Markets & Geopolitics', icon: '' },
                { name: 'Finance & Economics', icon: '' },
                { name: 'Technology & Innovation', icon: '' },
                { name: 'Energy & Climate', icon: '' },
                { name: 'Access & Agency', icon: '' },
                { name: 'Strategy & Policy', icon: '' }
              ].map((domain, index) => (
                <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-swiss-blue/50 hover:shadow-lg transition-all duration-300 text-center">
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

