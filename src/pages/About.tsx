import CTAButton from '@/components/ui/cta-button';
import Link from 'next/link';

const About = () => {
  const principles = [
    {
      icon: "",
      title: "Sovereignty",
      description: "Switzerland's constitutional commitment to independence and federalism (Art. 2, 3 BV) reflects a deep respect for sovereignty down to cantonal levels. Bitcoin's decentralized architecture ensures no single entity controls the network, preserving monetary sovereignty for its users."
    },
    {
      icon: "",
      title: "Political Neutrality", 
      description: "Switzerland's long-standing neutrality, rooted in its foreign policy tradition (Art. 54, 173 BV), positions it as an valued, impartial actor on the global stage. Bitcoin operates on a neutral, apolitical protocol – accessible to anyone regardless of jurisdiction, ideology, or affiliation."
    },
    {
      icon: "",
      title: "Consensus Governance",
      description: "Switzerland's direct democracy (Art. 136-142 BV) and consensus-driven political culture ensure decisions reflect the will of the people and cantons. Bitcoin's consensus mechanism requires broad network agreement for any protocol changes, ensuring no single party can impose decisions unilaterally."
    },
    {
      icon: "",
      title: "Power Decentralization",
      description: "Switzerland's structure (Art. 3, 43a BV) pushes much authority to the cantonal, and communal levels, preventing concentration of power. Bitcoin distributes power across thousands of independent nodes worldwide, preventing centralized control or single points of failure."
    },
    {
      icon: "",
      title: "Political Liberty & Economic Freedom",
      description: "Switzerland's constitution enshrines liberty including economic freedom (Art. 2, 10-27 BV) as fundamental rights. Bitcoin empowers individuals with financial autonomy and self-custody, free from intermediaries or centralized gatekeepers."
    }
  ];

  const services = [{
    title: "Education",
    description: "From 1:1 bespoke sessions to more formal courses",
    icon: "",
    primaryCta: { text: "Explore options", link: "/education" },
    secondaryCta: { text: "Request Course Information", link: "/inquiry?service=courses#service-selection" }
  }, {
    title: "Research",
    description: "Actionable insights on Bitcoin's strategic implications",
    icon: "",
    primaryCta: { text: "View offering", link: "/research" },
    secondaryCta: { text: "Book Discovery Call", link: "/inquiry?service=research&discovery=true" }
  }, {
    title: "Speaking",
    description: "Keynotes that get the message across and encourage reflection",
    icon: "",
    primaryCta: { text: "View talks", link: "/speaking" },
    secondaryCta: { text: "Submit Speaking Request", link: "/inquiry?service=speaking#service-selection" }
  }];

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
            <div className="space-y-6 max-w-5xl mx-auto">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="card-general card-gradient-hover group flex flex-col md:flex-row items-start gap-6 p-6 text-left"
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{principle.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* What We Do */}
      <section className="swiss-section bg-white relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 swiss-blue-gradient-subtle opacity-50"></div>

        <div className="swiss-grid relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="swiss-blue-gradient-accent mx-auto"></div>
            </div>
            <h2>What We Do</h2>
            <p className="swiss-prose-lg max-w-3xl mx-auto text-gray-600">
              Three core offerings designed for Switzerland's decision-makers navigating the Bitcoin transition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.primaryCta.link}
                className="group block h-full"
              >
                <div className="card-general card-gradient-hover h-full flex flex-col">
                  <div className="relative z-10 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6 text-base flex-grow">
                      {service.description}
                    </p>

                    {/* Link format matching glossary */}
                    <div className="link-research text-sm mt-auto">
                      {service.primaryCta.text} →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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