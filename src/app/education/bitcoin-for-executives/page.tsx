import type { Metadata } from 'next'
import CTAButton from '@/components/ui/cta-button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Users, Clock, MapPin } from 'lucide-react'
import CourseSignupForm from '@/components/forms/CourseSignupForm'
import { bitcoinForExecutivesCourses, formatCourseDate } from '@/lib/courses'
import CourseFlyerActions from '@/components/courses/CourseFlyerActions'
import TopicsColumn from '@/components/courses/TopicsColumn'

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
    { icon: <Clock className="w-5 h-5" />, label: 'Duration', value: '1 course, 4 afternoons' },
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
    'Critical thinking on Bitcoin\'s role in a changing world order, from AI to geopolitics to net-zero. No hype.',
    'Implications for Switzerland and your organisation',
    'Expert-led peer discussions to nurture actionable insights',
    <em key="qa">Exclusive Q&A post course</em>,
    <em key="session">Individual 1:1 session with the trainer</em>,
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
            <h1 className="mb-6 sm:mb-8 text-gray-900">Bitcoin for Executives</h1>
            <p className="swiss-prose-lg mb-8 sm:mb-10 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              A compact course for leaders who need to make responsible decisions about Bitcoin. We provide a professional guided overview of Bitcoin's strategic implications focusing on macro thinking across business, policy, society, and geopolitics.
            </p>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="swiss-section-sm sm:swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 sm:mb-16">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-gray-200 pt-8 sm:pt-12">
              {courseDetails.map((detail, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="text-swiss-blue">{detail.icon}</div>
                  </div>
                  <div className="text-sm text-gray-500 mb-2 font-medium">{detail.label}</div>
                  <div className="font-semibold text-gray-900">{detail.value}</div>
                </div>
              ))}
              <TopicsColumn />
            </div>
          </div>
        </div>
      </section>

      {/* Course Registration */}
      <section className="swiss-section-sm sm:swiss-section bg-gray-50">
        <div className="swiss-grid">
          <div className="max-w-5xl mx-auto">
            {/* Price */}
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-block px-6 sm:px-8 py-4 sm:py-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">CHF 5'999.-</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course Dates */}
              <div className="space-y-4 self-start">
                {bitcoinForExecutivesCourses.map((course, courseIndex) => (
                  <Card key={course.id} className="p-6 border-2 border-gray-200 bg-white">
                    <div className="text-sm mb-4 font-medium uppercase tracking-wide swiss-blue-gradient-text">
                      {courseIndex === 0 ? 'Next course:' : 'Upcoming course:'}
                    </div>
                    <div className="mb-3 text-sm font-bold text-gray-900">
                      {course.timeDescription}
                    </div>
                    <div className="space-y-2">
                      {course.dates.map((date, index) => (
                        <div key={index} className="text-base text-gray-900">{date}</div>
                      ))}
                    </div>
                  </Card>
                ))}
                {/* Event Flyer Download */}
                <CourseFlyerActions
                  flyerPath="/sbi-event-flyers/SBI-BTC-for-Exec-Course_12-2-26.png"
                />
              </div>

              {/* Signup Form */}
              <div className="lg:col-span-2">
                <Card className="p-8 border-2 border-gray-200 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Book your seat</h3>
                  <CourseSignupForm 
                    courseName="Bitcoin for Executives"
                    courseSlug="bitcoin-executives"
                    courseOptions={bitcoinForExecutivesCourses.map(course => ({
                      id: course.id,
                      label: formatCourseDate(course)
                    }))}
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

