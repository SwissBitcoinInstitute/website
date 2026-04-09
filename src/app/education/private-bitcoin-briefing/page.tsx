import type { Metadata } from 'next'
import CTAButton from '@/components/ui/cta-button'
import { Card } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import CourseSignupForm from '@/components/forms/CourseSignupForm'
import { privateBitcoinBriefingCourses, formatCourseDate } from '@/lib/courses'
import { pbbDetails } from '@/lib/offeringDetails'

export const metadata: Metadata = {
  title: 'Private Bitcoin Briefing | Swiss Bitcoin Institute',
  description: 'A dedicated, 1:1 briefing for decisionmakers and high-net-worth individuals seeking a tailored, strategic understanding of Bitcoin.',
  openGraph: {
    title: 'Private Bitcoin Briefing | Swiss Bitcoin Institute',
    description: 'Personalized 1:1 Bitcoin briefing for executives and individuals. Tailored to your specific needs and questions.',
    images: ['/sbi-logos/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Bitcoin Briefing | Swiss Bitcoin Institute',
    description: 'Personalized 1:1 Bitcoin briefing for executives and individuals. Tailored to your specific needs and questions.',
    images: ['/sbi-logos/opengraph-image.png'],
  },
}

export default function PrivateBitcoinBriefingPage() {

  const whoItsFor = [
    'Boards & Leadership Teams',
    'C-Level Executives & Directors',
    'Strategy & Policy Teams',
    'Financial Institutions & Regulators',
    'Industry Groups & Associations',
    'Government Bodies & International Organisations',
    'Any organisation needing a confidential, internal Bitcoin briefing',
  ]

  const whatYoullGet = [
    'Fully customised agenda aligned to your needs',
    'Choice of format: workshop, seminar, or executive briefing',
    'Flexible scheduling and private venue of your choice',
    'Bitcoin\'s implications for your context across SBI 360° Domain Framework',
    'Key trends relevant to your organisation (eg. AI, geopolitics, net-zero)',
    'Expert facilitation by Dr. Marcus Dapp',
    'Follow-up support as needed',
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-right-top md:bg-top bg-no-repeat"
          style={{
            backgroundImage: 'url(/offerings-images/Private-Bitcoin-Briefing-Bundesratszimmer.jpg)',
          }}
        />
        {/* White overlay for strong fade effect - 80% opacity (image at ~20% visibility) */}
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="swiss-grid relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="mb-6 text-gray-900">Private Bitcoin Briefing</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              For boards and leadership teams with specific capacity-building needs. Tailored content and format meet your team where you are – and help chart the path to where you want to go with Bitcoin.
            </p>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {/* Who it's for */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Who it's for</h2>
                <p className="text-gray-700 mb-4">This session is designed for:</p>
                <ul className="space-y-3">
                  {whoItsFor.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-swiss-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What you'll get */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">What you'll get</h2>
                <ul className="space-y-3">
                  {whatYoullGet.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-swiss-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-200 pt-12">
              {pbbDetails.map((detail, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="text-swiss-blue">{detail.icon}</div>
                  </div>
                  <div className="text-sm text-gray-500 mb-2 font-medium">{detail.label}</div>
                  <div className="font-semibold text-gray-900">{detail.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Registration */}
      <section className="swiss-section bg-gray-50">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            {/* Signup Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-2 border-gray-200 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Book your briefing</h3>
                <CourseSignupForm
                  courseName="Private Bitcoin Briefing"
                  courseSlug="private-bitcoin-briefing"
                  showTopicsOfInterest={true}
                  submitButtonText="Book a Discovery Call"
                />
              </Card>
              {/* Price */}
              <div className="mt-4 text-sm text-gray-500">Price on inquiry</div>
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
                href="/inquiry?service=courses"
                className="shadow-2xl"
              >
                Request a Course
              </CTAButton>
              <CTAButton
                variant="secondary"
                size="lg"
                href="/education"
                className="border-white text-gray-900 bg-white hover:bg-gray-100"
              >
                View Education Offering
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
