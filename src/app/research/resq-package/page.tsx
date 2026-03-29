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
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Research Quarterly | Swiss Bitcoin Institute',
    description: 'Original, forward-looking fundamental research on Bitcoin giving a 360° view.',
    images: ['/opengraph-image.png'],
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
            <h1 className="mb-6 text-gray-900">Bitcoin Research Quarterly</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">

            </p>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="swiss-section bg-gray-50">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            {/* Price */}
            <div className="text-center mb-8">
              <div className="inline-block p-6 border-2 border-gray-200 rounded-lg bg-gray-50">
                <div className="text-3xl font-bold text-gray-900 mb-1">Price on inquiry</div>
              </div>
            </div>

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
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="swiss-section bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 cta-section-bg"></div>
        <div className="swiss-grid relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="mb-8 text-white">Need something more specific?</h2>
            <p className="swiss-prose mb-12 text-gray-300 max-w-3xl mx-auto">
              We also offer deeply tailored, custom Bitcoin intelligence and strategic analysis for your specific industry or market edge needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <CTAButton
                variant="secondary"
                size="lg"
                href="/contact"
                className="border-white text-gray-900 bg-white hover:bg-gray-100"
              >
                Discuss Deep-Dive Strategy
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
