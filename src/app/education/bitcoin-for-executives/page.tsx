import type { Metadata } from 'next'
import CTAButton from '@/components/ui/cta-button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Users, Clock, MapPin } from 'lucide-react'
import CourseSignupForm from '@/components/forms/CourseSignupForm'

export const metadata: Metadata = {
  title: 'Bitcoin for Executives - Strategic Course | Swiss Bitcoin Institute',
  description: 'A compact course for leaders who need to make responsible decisions about Bitcoin. Professional guided overview of Bitcoin\'s strategic implications focusing on macro thinking across business, policy, society, and geopolitics.',
  openGraph: {
    title: 'Bitcoin for Executives | Swiss Bitcoin Institute',
    description: 'Strategic Bitcoin course for executives and decision-makers. Understand Bitcoin\'s implications for business, policy, and society.',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin for Executives | Swiss Bitcoin Institute',
    description: 'Strategic Bitcoin course for executives and decision-makers. Understand Bitcoin\'s implications for business, policy, and society.',
    images: ['/opengraph-image.png'],
  },
}

export default function BitcoinForExecutivesPage() {
  const courseDetails = [
    { icon: <MapPin className="w-5 h-5" />, label: 'Format', value: 'Live course (Zürich)' },
    { icon: <Clock className="w-5 h-5" />, label: 'Duration', value: '4 afternoons' },
    { icon: <Users className="w-5 h-5" />, label: 'Level', value: 'Executives with little Bitcoin knowledge' },
  ]

  const whoItsFor = [
    'CEOs & Executives',
    'Board Members',
    'Strategic Leaders',
    'Innovation Leads',
    'Finance & Banking, Energy & Utilities, Industry',
    'International Organisations, Civil Society / NGOs',
    'Government & Administration',
    'Anyone who must decide if / how / when to engage with Bitcoin',
  ]

  const whatYoullGet = [
    '360° macro view of Bitcoin using our 6-domain framework',
    'Critical thinking on Bitcoin\'s role in a changing world order, from AI to geopolitics to net-zero.',
    'Implications for Switzerland and your organisation',
    'Expert-led peer discussions to nurture actionable insights',
    'Rationale for why Bitcoin is not \'crypto\' nor \'blockchain\'',
    'Non-hype style. Only as technical as needed.',
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
                <span className="mr-2">💼</span>
                <span className="pill-hero-text">Strategic Course</span>
              </span>
            </div>
            <h1 className="mb-10 text-gray-900">Bitcoin for Executives</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed italic">
              A compact course for leaders who need to make responsible decisions about Bitcoin. We provide a professional guided overview of Bitcoin's strategic implications focusing on macro thinking across business, policy, society, and geopolitics.
            </p>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 border-b border-gray-200 pb-12">
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
                <div className="text-3xl font-bold text-gray-900">CHF 1'399.-</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Next Course Dates */}
              <Card className="p-6 border-2 border-gray-200 bg-white self-start">
                <div className="text-sm text-gray-500 mb-2 font-medium">Next course:</div>
                <div className="font-semibold text-gray-900 mb-1 text-lg">12/19/26 Feb, 5 Mar</div>
                <div className="text-gray-600">14-17h</div>
              </Card>

              {/* Signup Form */}
              <div className="lg:col-span-2">
                <Card className="p-8 border-2 border-gray-200 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Book your seat</h3>
                  <CourseSignupForm 
                    courseName="Bitcoin for Executives"
                    courseSlug="bitcoin-executives"
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
            <h2 className="mb-8 text-white">Ready to Make Informed Bitcoin Decisions?</h2>
            <p className="swiss-prose mb-12 text-gray-300 max-w-3xl mx-auto">
              Join Switzerland's leading executives in understanding Bitcoin's strategic implications.
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

