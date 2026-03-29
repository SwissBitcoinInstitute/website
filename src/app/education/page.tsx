import type { Metadata } from 'next'
import Link from 'next/link'
import CTAButton from '@/components/ui/cta-button'
import { masterclassDetails, finSovDetails, pbbDetails } from '@/lib/courseDetails'

export const metadata: Metadata = {
  title: 'Executive Education in Bitcoin | Swiss Bitcoin Institute',
  description: 'For executives in business, government, and civil society from Switzerland\'s independent Bitcoin think tank.',
  openGraph: {
    title: 'Executive Education in Bitcoin | Swiss Bitcoin Institute',
    description: 'For executives in business, government, and civil society',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive Education in Bitcoin | Swiss Bitcoin Institute',
    description: 'For executives in business, government, and civil society',
    images: ['/opengraph-image.png'],
  },
}

const CourseSection = ({
  title,
  description,
  href,
  tag,
  details,
  image,
  imageCredit,
  imageCreditUrl,
  imageCreditDark,
  reverse,
}: {
  title: string;
  description: string;
  href?: string;
  tag?: string;
  details?: { icon: React.ReactNode; label: string; value: string }[];
  image?: string;
  imageCredit?: string;
  imageCreditUrl?: string;
  imageCreditDark?: boolean;
  reverse?: boolean;
}) => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8 last:mb-0">
    <div className={`flex flex-col min-h-[320px] ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      {/* Left Column: Image */}
      <div
        className="w-full md:w-2/5 relative overflow-hidden border-b md:border-b-0 md:border-r border-gray-100 min-h-[220px]"
        style={image
          ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)' }
        }
      >
        {imageCredit && imageCreditUrl && (
          <a
            href={imageCreditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute bottom-0 left-0 right-0 px-3 py-1.5 text-[10px] transition-colors duration-200 truncate ${imageCreditDark ? 'text-black/40 hover:text-black/70' : 'text-white/60 hover:text-white/90'}`}
          >
            © {imageCredit}
          </a>
        )}
      </div>

      {/* Right Column: Content */}
      <div className="flex-1 p-8 md:p-10 flex flex-col">
        {/* Top: tag + title + description */}
        <div className="flex-1">
          {tag && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-bitcoin-orange/10 mb-5">
              <span className="text-bitcoin-orange text-xs font-semibold uppercase tracking-wider">{tag}</span>
            </div>
          )}
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
          <p className="swiss-prose-lg text-gray-600 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bottom: details icons (left) + link (right) */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          {/* Details */}
          {details && details.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {details.map((detail, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="text-swiss-blue">{detail.icon}</div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider leading-none mb-0.5">{detail.label}</div>
                    <div className="text-sm font-semibold text-gray-900">{detail.value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Link */}
          {href && (
            <div className="sm:ml-auto shrink-0">
              <Link
                href={href}
                className="link-research text-sm"
              >
                Find out more →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function CoursesPage() {

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-right-top md:bg-top bg-no-repeat"
          style={{
            backgroundImage: 'url(/SBI-education-hero.jpg)',
          }}
        />
        {/* White overlay for strong fade effect - 80% opacity (image at ~20% visibility) */}
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="swiss-grid relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="mb-6">Executive Education</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Build the competency your organization needs to navigate the Bitcoin age confidently.
            </p>
          </div>
        </div>
      </section>

      {/* Course Sections */}
      <section className="swiss-section bg-white overflow-hidden">
        <div className="swiss-grid">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col">
              <CourseSection
                title="Bitcoin Executive Masterclass"
                description="For senior leaders across business, finance, government, and civil society who need strategic Bitcoin clarity. Gain a 360° impact overview, industry-specific implications, and macro insights linking Bitcoin to AI, geopolitics, and net-zero – through expert-led peer discussion in an exclusive small group setting."
                href="/education/bitcoin-for-executives"
                details={masterclassDetails}
                image="/offerings-images/Executive-Masterclass-Reading-Room-ETHZ.jpg"
                imageCredit="Reading Room, Main Library ETH Zurich, 1955."
                imageCreditUrl="http://doi.org/10.3932/ethz-a-000012906"
              />

              <CourseSection
                title="Financial Sovereignty"
                description="For executives, investors, and individuals ready to learn the technicalities of handling and custodying Bitcoin. Master hands-on Bitcoin skills – from transactions, wallets and key management to privacy and security – in a discreet, small-group setting that allows for delicate questions about the strategic implications of Bitcoin's technical design."
                href="/education/financial-sovereignty"
                details={finSovDetails}
                image="/offerings-images/Financial-Sovereighnty-Banknotendruckerei-OF.jpg"
                imageCredit="Bankenotendruckerei, Orell Füssli AG, 1973."
                imageCreditUrl="https://ba.e-pics.ethz.ch/#detail-asset=727651b2-1b9a-4a86-9d2c-3d308848f352"
                imageCreditDark
                reverse
              />

              <CourseSection
                title="Private Bitcoin Briefing"
                description="Tailored Bitcoin strategy, delivered on your terms. All the strategic depth of the Bitcoin Executive Masterclass – customised to your organisation's industry, agenda, and schedule. Ideal for leadership teams, boards, and institutions that require a private, bespoke session with full flexibility on topics, format, and timing."
                href="/education/private-bitcoin-briefing"
                details={pbbDetails}
                image="/offerings-images/Private-Bitcoin-Briefing-Bundesratszimmer.jpg"
                imageCredit="Bundesratszimmer, 1989."
                imageCreditUrl="https://ba.e-pics.ethz.ch/#detail-asset=97b7fe65-17bf-46d5-b047-9c86c7837675"
              />
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
                href="/contact"
                className="shadow-2xl"
              >
                Schedule Consultation
              </CTAButton>
              <CTAButton
                variant="secondary"
                size="lg"
                href="/research"
                className="border-white text-gray-900 bg-white hover:bg-gray-100"
              >
                View Research
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

