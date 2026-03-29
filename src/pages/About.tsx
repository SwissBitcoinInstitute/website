import CTAButton from '@/components/ui/cta-button';

const About = () => {
  const principles = [
    {
      icon: "/switzerland-and-bitcoin-icons/sovereignty.png",
      title: "Sovereignty",
      description: "Switzerland's constitutional commitment to independence and federalism (Art. 2, 3 BV) reflects a deep respect for sovereignty down to cantonal levels. Bitcoin's decentralized architecture ensures no single entity controls the network, preserving monetary sovereignty for its users.",
      bgColor: "bg-bitcoin-orange/10"
    },
    {
      icon: "/switzerland-and-bitcoin-icons/political-neutrality.png",
      title: "Political Neutrality",
      description: "Switzerland's long-standing neutrality, rooted in its foreign policy tradition (Art. 54, 173 BV), positions it as an valued, impartial actor on the global stage. Bitcoin operates on a neutral, apolitical protocol – accessible to anyone regardless of jurisdiction, ideology, or affiliation.",
      bgColor: "bg-swiss-blue/10"
    },
    {
      icon: "/switzerland-and-bitcoin-icons/consensus-governance.png",
      title: "Consensus Governance",
      description: "Switzerland's direct democracy (Art. 136-142 BV) and consensus-driven political culture ensure decisions reflect the will of the people and cantons. Bitcoin's consensus mechanism requires broad network agreement for any protocol changes, ensuring no single party can impose decisions unilaterally.",
      bgColor: "bg-bitcoin-orange/10"
    },
    {
      icon: "/switzerland-and-bitcoin-icons/power-decentralisation.png",
      title: "Power Decentralization",
      description: "Switzerland's structure (Art. 3, 43a BV) pushes much authority to the cantonal, and communal levels, preventing concentration of power. Bitcoin distributes power across thousands of independent nodes worldwide, preventing centralized control or single points of failure.",
      bgColor: "bg-swiss-blue/10"
    },
    {
      icon: "/switzerland-and-bitcoin-icons/political-liberty-and-economic-freedom.png",
      title: "Political Liberty & Economic Freedom",
      description: "Switzerland's constitution enshrines liberty including economic freedom (Art. 2, 10-27 BV) as fundamental rights. Bitcoin empowers individuals with financial autonomy and self-custody, free from intermediaries or centralized gatekeepers.",
      bgColor: "bg-bitcoin-orange/10"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="mb-10 text-gray-900">Bitcoin's Natural Alignment with Switzerland</h1>
            <p className="swiss-prose-lg mb-16 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Bitcoin's and Swiss values align naturally, creating unique opportunities for Switzerland's future.
            </p>
            <div className="max-w-4xl mx-auto space-y-16 text-left">
              {principles.map((principle, index) => (
                <article
                  key={index}
                  className={`relative ${principle.bgColor} rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200/50`}
                >
                  <div className="mb-6 flex flex-col md:flex-row items-start gap-8">
                    {principle.icon && (
                      <div className="shrink-0">
                        <img src={principle.icon} alt={`${principle.title} Icon`} className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-sm" />
                      </div>
                    )}
                    <div className="pt-2 flex-1">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-sans">
                        {principle.title}
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed text-lg mb-0">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Collaboration CTA */}
      <section className="swiss-section bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 cta-section-bg"></div>
        <div className="swiss-grid relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-medium text-white mb-6">
              Shape the future of money
            </h2>

            <p className="text-lg text-gray-300 mb-8">
              We collaborate with policymakers, researchers, and educators to advance Switzerland's monetary strategy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <CTAButton variant="primary" size="lg" href="/contact" showArrow>
                Contact Us
              </CTAButton>
              <CTAButton variant="secondary" size="lg" href="/inquiry?service=research&discovery=true">
                Book discovery call
              </CTAButton>
            </div>

            <p className="text-gray-400">
              <a href="mailto:hello@bitcoininstitute.ch" className="hover:text-white transition-colors">
                hello@bitcoininstitute.ch
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;