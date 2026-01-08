import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Swiss Bitcoin Institute',
  description: 'Privacy Policy for the Swiss Bitcoin Institute. Learn how we collect, use, and protect your personal information in compliance with GDPR.',
  openGraph: {
    title: 'Privacy Policy | Swiss Bitcoin Institute',
    description: 'Privacy Policy for the Swiss Bitcoin Institute.',
    images: ['/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Swiss Bitcoin Institute',
    description: 'Privacy Policy for the Swiss Bitcoin Institute.',
    images: ['/opengraph-image.png'],
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 text-gray-900">Privacy Policy</h1>
            <p className="swiss-prose-lg mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
              We respect your privacy and are committed to protecting your personal data in compliance with the General Data Protection Regulation (GDPR).
            </p>
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <div className="swiss-prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>
                The Swiss Bitcoin Institute ("we", "our", or "us") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services, in accordance with the Swiss Federal Data Protection Act (FADP) and the EU General Data Protection Regulation (GDPR).
              </p>

              <h2>2. Data Controller</h2>
              <p>
                The data controller responsible for your personal data is:
              </p>
              <p>
                <strong>Swiss Bitcoin Institute</strong><br />
                Email: <a href="mailto:hello@bitcoininstitute.ch" className="link-research">hello@bitcoininstitute.ch</a>
              </p>

              <h2>3. Information We Collect</h2>
              <p>We may collect and process the following types of personal data:</p>
              
              <h3>3.1 Information You Provide to Us</h3>
              <ul>
                <li>Name and contact information (email address, phone number)</li>
                <li>Company or organization name</li>
                <li>Information provided when contacting us or requesting services</li>
                <li>Information provided when subscribing to our newsletter or intelligence briefs</li>
              </ul>

              <h3>3.2 Automatically Collected Information</h3>
              <ul>
                <li>Technical data (IP address, browser type, device information)</li>
                <li>Usage data (pages visited, time spent on pages, referring website)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2>4. How We Use Your Information</h2>
              <p>We use your personal data for the following purposes:</p>
              <ul>
                <li>To provide and maintain our services</li>
                <li>To respond to your inquiries and requests</li>
                <li>To send you newsletters, research updates, and other communications (with your consent)</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>

              <h2>5. Legal Basis for Processing</h2>
              <p>We process your personal data based on the following legal grounds:</p>
              <ul>
                <li><strong>Consent:</strong> When you have given clear consent for us to process your personal data for specific purposes (e.g., newsletter subscriptions)</li>
                <li><strong>Legitimate interests:</strong> To improve our services, analyze website usage, and ensure website security</li>
                <li><strong>Contract performance:</strong> To fulfill our obligations when you request our services</li>
                <li><strong>Legal obligations:</strong> To comply with applicable laws and regulations</li>
              </ul>

              <h2>6. Data Sharing and Disclosure</h2>
              <p>We do not sell your personal data. We may share your information with:</p>
              <ul>
                <li>Service providers who assist us in operating our website and conducting our business (e.g., email service providers, hosting providers)</li>
                <li>Legal authorities when required by law or to protect our rights</li>
              </ul>
              <p>All third-party service providers are required to maintain the confidentiality of your information and use it only for the purposes for which we disclose it to them.</p>

              <h2>7. Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal data, we will securely delete or anonymize it.
              </p>

              <h2>8. Your Rights</h2>
              <p>Under GDPR and Swiss data protection laws, you have the following rights:</p>
              <ul>
                <li><strong>Right of access:</strong> Request copies of your personal data</li>
                <li><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to erasure:</strong> Request deletion of your personal data under certain circumstances</li>
                <li><strong>Right to restrict processing:</strong> Request restriction of processing of your personal data</li>
                <li><strong>Right to data portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Right to object:</strong> Object to processing of your personal data for certain purposes</li>
                <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time where we rely on consent to process your data</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at <a href="mailto:hello@bitcoininstitute.ch" className="link-research">hello@bitcoininstitute.ch</a>.
              </p>

              <h2>9. Cookies</h2>
              <p>
                Our website uses cookies and similar tracking technologies to collect and store information about your preferences and how you use our website. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. However, if you disable or refuse cookies, some parts of our website may become inaccessible or not function properly.
              </p>

              <h2>10. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2>11. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries outside of Switzerland and the European Economic Area (EEA). We ensure that appropriate safeguards are in place to protect your personal data in accordance with this Privacy Policy and applicable data protection laws.
              </p>

              <h2>12. Children's Privacy</h2>
              <p>
                Our website is not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child under 16, please contact us immediately.
              </p>

              <h2>13. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2>14. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <p>
                <strong>Swiss Bitcoin Institute</strong><br />
                Email: <a href="mailto:hello@bitcoininstitute.ch" className="link-research">hello@bitcoininstitute.ch</a>
              </p>

              <h2>15. Supervisory Authority</h2>
              <p>
                If you are located in the EEA and believe we have not addressed your concerns adequately, you have the right to lodge a complaint with your local data protection supervisory authority. In Switzerland, the supervisory authority is the Federal Data Protection and Information Commissioner (FDPIC).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

