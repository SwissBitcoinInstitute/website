import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import CTAButton from '@/components/ui/cta-button'
import CourseSection from '@/components/courses/CourseSection'
import { quarterlyDetails, briefsDetails } from '@/lib/offeringDetails'

export const metadata: Metadata = {
  title: 'Research | Swiss Bitcoin Institute',
  description: 'Strategic Bitcoin Intelligence Briefs and research reports for decision-makers. Evidence-based analysis on Bitcoin\'s implications for business, policy, and society.',
  openGraph: {
    title: 'Research | Swiss Bitcoin Institute',
    description: 'Strategic Bitcoin Intelligence Briefs and research reports for decision-makers. Evidence-based analysis on Bitcoin\'s implications for business, policy, and society.',
    images: ['/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research | Swiss Bitcoin Institute',
    description: 'Strategic Bitcoin Intelligence Briefs and research reports for decision-makers.',
    images: ['/opengraph-image.png'],
  },
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-right-top md:bg-top bg-no-repeat"
          style={{
            backgroundImage: 'url(/SBI-research-hero.jpg)',
          }}
        />
        {/* White overlay for strong fade effect - 80% opacity (image at ~20% visibility) */}
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="swiss-grid relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1>Research</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Tracking Bitcoin's strategic developments demands constant attention. We do it for you – curating and packaging news, narratives, and technical developments into compact, actionable insights tailored for businesses, agencies, NGOs, and their stakeholders.
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

          <div className="max-w-xl mx-auto">
            <Link href="/domains" className="block group">
              <img
                src="/research-domains.png"
                alt="Six Research Domains"
                className="w-full h-auto transition-all duration-300 group-hover:scale-105"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Research Offerings */}
      <section className="swiss-section bg-white border-t border-gray-100">
        <div className="swiss-grid">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col">
              <CourseSection
                title="Bitcoin Intelligence Briefs"
                description="For decision-makers who want substance over headlines, the SBI Fellows are writing dedicated Intelligence Briefs. Each Brief researches a specific Bitcoin issue in depth. Thus, each SBI domain receives expert analysis once a quarter. Currently available for free."
                href="/research/intelligence-briefs"
                details={briefsDetails}
                image="/offerings-images/Intelligence-Briefs-Chemister-lab-ETHZ.jpg"
                imageCredit="Chemistry Lab, ETH Zürich, 1954."
                imageCreditUrl="http://doi.org/10.3932/ethz-a-000012924"
              />

              <CourseSection
                title="Bitcoin Research Quarterly"
                description="For organisations and their clients who value concise, cross-domain fundamental Bitcoin research beyond the price chart. Original research, exclusive Fellow commentary, and news highlights are carefully curated using SBI's domain framework and distilled into a clear, forward-looking and actionable format."
                href="/research/resq-package"
                details={quarterlyDetails}
                image="/offerings-images/Research-Magazin-ETH-Library.jpg"
                imageCredit="Magazin, ETH Library, 1975."
                imageCreditUrl="http://doi.org/10.3932/ethz-a-000015361"
                reverse
              />
            </div>
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
              <CTAButton variant="secondary" size="lg" href="/contact">
                Discuss Your Needs
              </CTAButton>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
