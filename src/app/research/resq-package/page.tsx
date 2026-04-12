import type { Metadata } from 'next'
import CTAButton from '@/components/ui/cta-button'
import { Card } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import CourseSignupForm from '@/components/forms/CourseSignupForm'
import { quarterlyDetails } from '@/lib/offeringDetails'

export const metadata: Metadata = {
  title: 'Bitcoin Research Quarterly | Swiss Bitcoin Institute',
  description: 'Original, forward-looking fundamental research on Bitcoin giving a 360° view. Plus selected curated and fellow-commented Bitcoin news.',
  openGraph: {
    title: 'Bitcoin Research Quarterly | Swiss Bitcoin Institute',
    description: 'Original, forward-looking fundamental research on Bitcoin giving a 360° view.',
    images: ['/sbi-logos/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Research Quarterly | Swiss Bitcoin Institute',
    description: 'Original, forward-looking fundamental research on Bitcoin giving a 360° view.',
    images: ['/sbi-logos/opengraph-image.png'],
  },
}

export default function ResQPackagePage() {

  const whoItsFor = [
  ]

  const whatYoullGet = [
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-right-top md:bg-top bg-no-repeat"
          style={{
            backgroundImage: 'url(/offerings-images/Research-Magazin-ETH-Library.jpg)',
          }}
        />
        {/* White overlay for strong fade effect - 80% opacity (image at ~20% visibility) */}
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="swiss-grid relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="mb-6 text-gray-900">Bitcoin Research Quarterly ('ResQ')</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Charts are only half the story. To make decisions you need more flesh to the bone. Our curated, fundamental Bitcoin research delivers what no chart can: arguments, context and background.
            </p>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="swiss-section bg-gray-50">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            {/* Signup Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-2 border-gray-200 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Inquire for subscription</h3>
                <CourseSignupForm
                  courseName="Bitcoin Research Quarterly"
                  courseSlug="research-quarterly"
                  showTopicsOfInterest={true}
                  submitButtonText="Request Research Quarterly"
                />
              </Card>
              {/* Price */}
              <Card className="mt-4 p-4 border-2 border-gray-200 bg-white">
                <span className="text-xl font-semibold text-gray-900">Price on inquiry</span>
              </Card>
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
  )
}
