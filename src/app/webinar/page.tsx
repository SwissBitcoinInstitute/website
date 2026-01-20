import { Card } from '@/components/ui/card';

export default function WebinarPage() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-right-top md:bg-top bg-no-repeat"
          style={{
            backgroundImage: 'url(/sbi-21-bitcoin-webinar.png)',
          }}
        />
        {/* White overlay for strong fade effect - 80% opacity (image at ~20% visibility) */}
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="swiss-grid relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 text-gray-900">Bitcoin in 21 Minutes</h1>
            <p className="swiss-prose-lg mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
              One strategic insight – clear enough to help you decide whether Bitcoin matters for your job. 
              In 21 minutes, an expert explains one non-technical Bitcoin topic with strategic relevance 
              for business and society – grounded, accessible, and anti-hype.
            </p>
          </div>
        </div>
      </section>

      {/* Webinar Details */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-8">
                <div className="font-semibold text-gray-900 mb-2">Format</div>
                <div className="text-gray-600 swiss-prose">Live webinar + Q&A (if applicable)</div>
              </div>
              <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-8">
                <div className="font-semibold text-gray-900 mb-2">Duration</div>
                <div className="text-gray-600 swiss-prose">21 minutes</div>
              </div>
              <div className="text-center md:text-left">
                <div className="font-semibold text-gray-900 mb-2">Level</div>
                <div className="text-gray-600 swiss-prose">Beginner (no prior knowledge)</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Who it's for</h2>
                <ul className="space-y-3 text-gray-600 swiss-prose">
                  <li>• Finance & Banking</li>
                  <li>• Energy & Utilities</li>
                  <li>• Government & Administration</li>
                  <li>• International Organisations</li>
                  <li>• Civil Society / NGOs</li>
                  <li>• Anyone who needs to form a professional view on Bitcoin</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">What you'll get</h2>
                <ul className="space-y-3 text-gray-600 swiss-prose">
                  <li>• One strategic Bitcoin topic explained in-depth (not "Bitcoin 101", not trading)</li>
                  <li>• Clear relevance to one current event</li>
                  <li>• A simple mental model of the broader Bitcoin landscape</li>
                  <li>• Better questions to ask internally – before spending time or money</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Register for the next (free) Webinar
              </h3>
              
              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-900 mb-4">
                  Topic: Why Bitcoin is not Crypto
                </p>
                <h4 className="text-xl font-semibold text-gray-900 mb-6">
                  21. January 2026
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <a
                    href="https://ethz.zoom.us/webinar/register/WN_RSEANOWGTHmLf0OWbsTFgw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-swiss-blue hover:bg-swiss-blue/5 transition-all text-left block group"
                  >
                    <div className="text-2xl font-semibold text-gray-900 group-hover:swiss-blue-gradient-text transition-colors">
                      12:45h
                    </div>
                    <div className="text-sm text-gray-600 mt-1 mb-3">Afternoon session</div>
                    <div className="link-research text-sm inline-flex items-center gap-2">
                      Register for afternoon session
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" x2="21" y1="14" y2="3"></line>
                      </svg>
                    </div>
                  </a>

                  <a
                    href="https://ethz.zoom.us/webinar/register/WN_TgLXtbsmTaaQhzzXenp5ow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-swiss-blue hover:bg-swiss-blue/5 transition-all text-left block group"
                  >
                    <div className="text-2xl font-semibold text-gray-900 group-hover:swiss-blue-gradient-text transition-colors">
                      18:30h
                    </div>
                    <div className="text-sm text-gray-600 mt-1 mb-3">Evening session</div>
                    <div className="link-research text-sm inline-flex items-center gap-2">
                      Register for evening session
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" x2="21" y1="14" y2="3"></line>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
