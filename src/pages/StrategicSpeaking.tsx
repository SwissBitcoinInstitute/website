import Link from 'next/link';
import CTAButton from '@/components/ui/cta-button';

export default function StrategicSpeaking() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-right-top md:bg-top bg-no-repeat"
          style={{
            backgroundImage: 'url(/SBI-speaking-hero.jpg)',
          }}
        />
        {/* White overlay for strong fade effect - 80% opacity (image at ~20% visibility) */}
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="swiss-grid relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <span className="pill-hero mb-6 bg-white/90 backdrop-blur-sm">
                <span className="mr-2">🎤</span>
                <span className="pill-hero-text">Strategic Speaking</span>
              </span>
            </div>
            <h1>Bitcoin Keynotes & Presentations</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Our team shares insights on Bitcoin's strategic implications for businesses, organizations, and policy audiences. 
              Presentations grounded in research, delivered with clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Presentations */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="swiss-blue-gradient-accent mx-auto"></div>
              </div>
              <h2>Featured Presentations</h2>
              <p className="swiss-prose max-w-3xl mx-auto text-gray-600">
                Recent talks exploring Bitcoin's strategic dimensions across different contexts.
              </p>
            </div>

            {/* Talk 1: Policy/Government */}
            <div className="card-general card-gradient-hover mb-8 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video bg-black">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  >
                    <source 
                      src="https://oc-aem-dist-downloads.ethz.ch/mh_default_org/oaipmh-cq5/c7882de7-7c1f-453f-b7c8-f4787aa81a3b/7e4a5352-b2a1-4d09-9849-4bed6faed33e/MarcusDapp_ColloquiumFS25.mp4" 
                      type="video/mp4" 
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-8 flex flex-col">
                  <div className="mb-4">
                    <span className="pill-tag-blue mb-4 inline-block">
                      Policy & Research
                    </span>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                      Bitcoin as Strategic Policy Issue
                    </h3>
                    <p className="swiss-prose text-gray-700 leading-relaxed mb-6">
                      Dr. Marcus Dapp presents Bitcoin as a strategic science and technology policy issue at ETH Zürich's Institute for Science, Technology, and Policy. 
                      An exploration of how Bitcoin intersects with public policy, monetary systems, and technological governance.
                    </p>
                  </div>
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                      </svg>
                      <span>ETH Zürich, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                      <span>English presentation, English slides</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <a
                      href="https://istp.ethz.ch/events/colloquia/2025/fs/colloquium-recording--dr-marcus-dapp.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-research inline-flex items-center gap-2"
                    >
                      View full recording
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" x2="21" y1="14" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Talk 2: Business */}
            <div className="card-general card-gradient-hover mb-8 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/YBaL_iNleTA"
                    title="Bitcoin Strategy Playbook for Businesses"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-8 flex flex-col">
                  <div className="mb-4">
                    <span className="pill-tag-blue mb-4 inline-block">
                      Business Strategy
                    </span>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                      Bitcoin Strategy Playbook for Businesses
                    </h3>
                    <p className="swiss-prose text-gray-700 leading-relaxed mb-6">
                      A practical framework for corporate Bitcoin adoption—covering treasury management, payment integration, and strategic positioning considerations. 
                      Presented at the Swiss Bitcoin Conference, exploring how businesses can navigate Bitcoin integration thoughtfully and responsibly.
                    </p>
                  </div>
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                      </svg>
                      <span>Swiss Bitcoin Conference, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                      <span>German presentation, English slides (SBI branded)</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <a
                      href="https://www.youtube.com/watch?v=YBaL_iNleTA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-research inline-flex items-center gap-2"
                    >
                      Watch on YouTube
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" x2="21" y1="14" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Talk 3: Non-Profits */}
            <div className="card-general card-gradient-hover overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/hi0r08pUrh4"
                    title="Bitcoin Strategy Playbook for Non-Profits"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-8 flex flex-col">
                  <div className="mb-4">
                    <span className="pill-tag-blue mb-4 inline-block">
                      Non-Profits & NGOs
                    </span>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                      Bitcoin Strategy Playbook for Non-Profits
                    </h3>
                    <p className="swiss-prose text-gray-700 leading-relaxed mb-6">
                      How charitable organizations and NGOs might consider Bitcoin for fundraising, treasury diversification, and cross-border operations. 
                      Presented at Bitcoin Alps, discussing practical considerations and potential benefits for mission-driven organizations.
                    </p>
                  </div>
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                      </svg>
                      <span>Bitcoin Alps, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                      <span>German presentation, German slides</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <a
                      href="https://www.youtube.com/watch?v=hi0r08pUrh4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-research inline-flex items-center gap-2"
                    >
                      Watch on YouTube
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" x2="21" y1="14" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
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
              Interested in a Speaking Engagement?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              If you're organizing an event and would like to explore having one of our team members speak, 
              we'd be happy to discuss how we might contribute.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <CTAButton variant="primary" size="lg" href="/contact" showArrow>
                Get in Touch
              </CTAButton>
              <CTAButton variant="secondary" size="lg" href="/research" className="bg-white text-gray-900 hover:bg-gray-100">
                View Our Research
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
