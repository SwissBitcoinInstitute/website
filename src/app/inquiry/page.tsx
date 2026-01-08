import type { Metadata } from 'next';
import { Suspense } from 'react';
import LeadIntakeForm from '@/components/forms/LeadIntakeForm';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Get Started | Swiss Bitcoin Institute',
  description: 'Request information about SBI courses, research services, or speaking engagements. Connect with Switzerland\'s leading Bitcoin think tank.',
  openGraph: {
    title: 'Get Started | Swiss Bitcoin Institute',
    description: 'Request information about Bitcoin education, research, and speaking services.',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Started | Swiss Bitcoin Institute',
    description: 'Request information about Bitcoin education, research, and speaking services.',
    images: ['/opengraph-image.png'],
  },
};

export default function InquiryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 text-gray-900">Get Started with SBI</h1>
            <p className="swiss-prose-lg mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
              Whether you need strategic Bitcoin intelligence, executive education, or a speaker for your event,
              we're here to help. Tell us what you're looking for.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <Suspense fallback={<div>Loading form...</div>}>
            <LeadIntakeForm />
          </Suspense>
        </div>
      </section>

      {/* Why Choose SBI Section */}
      <section className="swiss-section bg-gray-50">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12 text-gray-900">Why Choose the Swiss Bitcoin Institute?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-bitcoin-orange flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Independent Research</h3>
                    <p className="text-gray-600">Rigorous, evidence-based analysis and view on Bitcoin. No industry funding, no conflicts of interest.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-bitcoin-orange flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Swiss Context</h3>
                    <p className="text-gray-600">Deep understanding of Swiss environment, financial cultures, and institutional landscape.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-bitcoin-orange flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Practical Focus</h3>
                    <p className="text-gray-600">Actionable intelligence and education for decision-makers - as customized as you like.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-bitcoin-orange flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Expertise</h3>
                    <p className="text-gray-600">60+ years of combined Bitcoin experience across different domains and industries.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

