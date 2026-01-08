import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Swiss Bitcoin Institute',
  description: 'Terms of Service for the Swiss Bitcoin Institute website. Please read these terms carefully before using our services.',
  openGraph: {
    title: 'Terms of Service | Swiss Bitcoin Institute',
    description: 'Terms of Service for the Swiss Bitcoin Institute.',
    images: ['/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Swiss Bitcoin Institute',
    description: 'Terms of Service for the Swiss Bitcoin Institute.',
    images: ['/opengraph-image.png'],
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 text-gray-900">Terms of Service</h1>
            <p className="swiss-prose-lg mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
              Please read these terms carefully before using our website and services.
            </p>
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <div className="swiss-prose prose-lg max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Swiss Bitcoin Institute website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>

              <h2>2. Use of Website</h2>
              <p>
                The Swiss Bitcoin Institute provides educational content, research materials, and information about Bitcoin and related topics. You may use our website for personal, non-commercial purposes in accordance with these terms.
              </p>

              <h2>3. Intellectual Property</h2>
              <p>
                All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of the Swiss Bitcoin Institute or its content suppliers and is protected by Swiss and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content without prior written permission.
              </p>

              <h2>4. Disclaimer of Warranties</h2>
              <p>
                The information on this website is provided "as is" without warranties of any kind, either express or implied. The Swiss Bitcoin Institute does not warrant that the website will be uninterrupted, secure, or error-free. We do not provide financial, legal, or investment advice.
              </p>

              <h2>5. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, the Swiss Bitcoin Institute shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the website.
              </p>

              <h2>6. External Links</h2>
              <p>
                Our website may contain links to external websites that are not provided or maintained by the Swiss Bitcoin Institute. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
              </p>

              <h2>7. Privacy</h2>
              <p>
                Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your information.
              </p>

              <h2>8. Modifications to Terms</h2>
              <p>
                The Swiss Bitcoin Institute reserves the right to modify these terms at any time. We will notify users of any changes by updating the "Last updated" date at the top of this page. Your continued use of the website after any changes constitutes acceptance of the new terms.
              </p>

              <h2>9. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of Switzerland, without regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Switzerland.
              </p>

              <h2>10. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p>
                <strong>Swiss Bitcoin Institute</strong><br />
                Email: <a href="mailto:hello@bitcoininstitute.ch" className="link-research">hello@bitcoininstitute.ch</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

