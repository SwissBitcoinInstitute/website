import type { Metadata } from 'next'
import CTAButton from '@/components/ui/cta-button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Users, Clock, MapPin } from 'lucide-react'
import CourseSignupForm from '@/components/forms/CourseSignupForm'
import CourseFlyerActions from '@/components/courses/CourseFlyerActions'

export const metadata: Metadata = {
  title: 'Financial Sovereignty - Starter | Swiss Bitcoin Institute',
  description: 'Learn to securely control your own Bitcoin in half a day through hands-on training with hardware wallets, seed phrase management, and secure backup strategies.',
  openGraph: {
    title: 'Financial Sovereignty - Starter | Swiss Bitcoin Institute',
    description: 'Half-day hands-on Bitcoin course for holders. Master hardware wallets, seed phrases, and secure backup strategies.',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Financial Sovereignty - Starter | Swiss Bitcoin Institute',
    description: 'Half-day hands-on Bitcoin course for holders. Master hardware wallets, seed phrases, and secure backup strategies.',
    images: ['/opengraph-image.png'],
  },
}

export default function FinancialSovereigntyPage() {
  const courseDetails = [
    { icon: <MapPin className="w-5 h-5" />, label: 'Format', value: 'Live course (in Zürich)' },
    { icon: <Clock className="w-5 h-5" />, label: 'Duration', value: '0.5 day' },
    { icon: <Users className="w-5 h-5" />, label: 'Level', value: 'Bitcoin holders' },
  ]

  const whoItsFor = [
    'Bitcoin holders who want to make a step towards financial sovereignty and be independent of exchanges, crypto brokers, banks',
    'Private and professional Bitcoin holders',
    'Control their coins in a self-sovereign manner',
  ]

  const whatYoullGet = [
    'Comparison of Bitcoin wallets types and devices',
    'Lightning & other Layer-2 networks',
    'Hands-on experience with different wallets',
    'Risk analysis: custodians vs self-custody',
    'Seed phrases & backup management',
    'Privacy & Security',
    'Outlook into advanced topics',
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <span className="pill-hero mb-6">
                <span className="mr-2">🔐</span>
                <span className="pill-hero-text">Hands-On Course</span>
              </span>
            </div>
            <h1 className="mb-6 text-gray-900">Financial Sovereignty - Starter</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Learn to securely control your own Bitcoin in half a day through hands-on training with hardware wallets, seed phrase management, and secure backup strategies – gain true financial independence from banks and exchanges.
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
              {courseDetails.map((detail, index) => (
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
            {/* Price */}
            <div className="text-center mb-8">
              <div className="inline-block p-6 border-2 border-gray-200 rounded-lg bg-gray-50">
                <div className="text-3xl font-bold text-gray-900 mb-1">CHF 349.-</div>
                <div className="text-sm text-gray-600">(incl. 50.- in sats)</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Next Course Dates */}
              <div className="space-y-4 self-start">
                <Card className="p-6 border-2 border-gray-200 bg-white">
                  <div className="text-sm mb-4 font-medium uppercase tracking-wide swiss-blue-gradient-text">Next course:</div>
                  <div className="mb-3 text-sm font-bold text-gray-900">
                    0.5 day (13:30-17:30)
                  </div>
                  <div className="space-y-2">
                    <div className="text-base text-gray-900">12th March 2026</div>
                  </div>
                </Card>
                {/* Event Flyer Download */}
                <CourseFlyerActions
                  flyerPath="/sbi-event-flyers/SBI-FinSov-Flyer_26.png"
                />
              </div>

              {/* Signup Form */}
              <div className="lg:col-span-2">
                <Card className="p-8 border-2 border-gray-200 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Book your seat</h3>
                  <CourseSignupForm 
                    courseName="Financial Sovereignty - Starter"
                    courseSlug="financial-sovereignty"
                    courseDate="0.5 day (13:30-17:30): 12th March 2026"
                  />
                </Card>
              </div>
            </div>

            {/* Questions CTA */}
            <div className="text-center mt-8">
              <CTAButton 
                variant="secondary" 
                size="lg" 
                href="/contact"
                className="border-gray-300 text-gray-900 bg-white hover:bg-gray-50"
              >
                Questions? Get in touch!
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="swiss-section bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 cta-section-bg"></div>
        <div className="swiss-grid relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="mb-8 text-white">Ready to Take Control of Your Bitcoin?</h2>
            <p className="swiss-prose mb-12 text-gray-300 max-w-3xl mx-auto">
              Join Bitcoin holders in Switzerland learning to securely manage their own assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <CTAButton 
                variant="secondary" 
                size="lg" 
                href="/education"
                className="border-white text-gray-900 bg-white hover:bg-gray-100"
              >
                View Other Courses
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
