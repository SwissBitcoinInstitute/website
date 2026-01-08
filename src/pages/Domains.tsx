"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Domains = () => {
  const domains = [
    {
      title: "Markets & Geopolitics",
      icon: "🌍",
      question: "What happens when nations and companies can settle trade in a neutral asset beyond the control of any single state?",
      content: "Global trade, aid, and financial flows today rely on politicized, inflation-prone fiat currencies and fragmented payment systems. This creates currency wars, sanctions risk, and unequal access to the global economy, especially for poorer or unstable nations. Power concentrates in a few reserve-currency issuers, shaping geoeconomics and geopolitics as much as traditional diplomacy. Bitcoin raises new questions for international trade and aid: What happens when countries and companies can settle value in a neutral, borderless asset that no single state controls? How might a global, censorship-resistant settlement network change competition, sanctions, and capital controls? Could Bitcoin reduce reliance on dominant fiat currencies and rebalance geopolitical power?",
      gradient: "from-blue-50 to-blue-100/50",
      accent: "bg-blue-500",
      articleLink: "/research/SBI-003",
      anchorId: "markets-geopolitics"
    },
    {
      title: "Finance & Economics",
      icon: "💼",
      question: "What happens when fixed-supply, rules-based money challenges inflationary systems and the fusion of money and state power?",
      content: "Today's financial system is built on credit expansion, inflationary money, and tight links between central banks, governments, and commercial banks. This model can erode savings, distort investment, and concentrate power. The rise of central bank digital currencies (CBDCs) increases efficiency but also enables greater surveillance and control over transactions. Bitcoin introduces a different economic logic: a fixed supply asset, rules without rulers, and a clear separation of money and state. What would deflationary or low-inflation economics mean for saving, lending, and investment? How might Bitcoin compete or coexist with CBDCs? Could a monetary standard secured by open networks provide greater trust than promises from central banks and governments?",
      gradient: "from-green-50 to-green-100/50",
      accent: "bg-green-500",
      articleLink: "/research/SBI-004",
      anchorId: "finance-economics"
    },
    {
      title: "Technology & Innovation",
      icon: "⚡",
      question: "What innovations become possible when financial infrastructure is open, programmable, and free from centralized control?",
      content: "Our digital economy largely runs on centralized platforms and intermediaries that control data, access, and payments. This centralization can limit innovation, weaken privacy, and create single points of failure and censorship. Bitcoin emerged as a peer-to-peer (p2p) payment network secured by decentralized mining and robust cryptography. New layers built on top of Bitcoin explore scalability, faster payments, and enhanced privacy while preserving security. How can open, permissionless infrastructure spur new waves of financial and technological innovation? What role will Bitcoin's layered architecture play in enabling secure, global micro-transactions, machine-to-machine payments, or new digital services that do not depend on trusted third parties?",
      gradient: "from-purple-50 to-purple-100/50",
      accent: "bg-purple-500",
      articleLink: "/research/SBI-002",
      anchorId: "technology-innovation"
    },
    {
      title: "Energy & Climate",
      icon: "🌱",
      question: "How does Bitcoin's direct link to energy markets impact grid stability, renewable build-out, and climate mitigation strategies?",
      content: "Modern energy systems are centralized and often inefficient, with stranded resources and weak incentives to integrate renewables. Climate change and carbon constraints increase pressure on grids, regulators, and investors to transform how energy is produced, priced, and consumed. Bitcoin mining links digital finance directly to physical energy. Miners seek the cheapest, most abundant energy, including stranded gas, hydro, wind, and solar. Can flexible, location-agnostic mining support grid stability and renewable build-out by monetizing excess capacity? How should we evaluate Bitcoin's climate impact compared to other financial and digital systems? Could Bitcoin help drive a more transparent, market-driven energy transition and more effective climate change mitigation?",
      gradient: "from-orange-50 to-orange-100/50",
      accent: "bg-orange-500",
      articleLink: "/research/SBI-006",
      anchorId: "energy-climate"
    },
    {
      title: "Access & Agency",
      icon: "🔓",
      question: "How can permissionless, neutral money improve financial inclusion and protect civil liberties?",
      content: "Billions of people face limited or unstable access to financial services, suffer from currency debasement, or live under regimes that restrict the freedom to transact. Traditional banking and payment providers can exclude individuals, censor payments, or expose sensitive data, undermining financial inclusion, privacy, and basic human rights. Bitcoin enables anyone with a smartphone and internet connection to hold and transfer value without permission. What does global access to a neutral, open monetary network mean for personal and economic sovereignty? Can Bitcoin improve financial inclusion for the unbanked and underbanked, especially in fragile states or conflict zones? How might stronger privacy and censorship-resistance protect civil society, journalists, and activists while balancing legitimate concerns about misuse?",
      gradient: "from-teal-50 to-teal-100/50",
      accent: "bg-teal-500",
      articleLink: "/research/beyond-the-hype",
      anchorId: "access-agency"
    },
    {
      title: "Strategy & Policy",
      icon: "📋",
      question: "How should Switzerland balance innovation, sovereignty, and risk when Bitcoin challenges traditional monetary and regulatory paradigms?",
      content: "Governments and institutions face new strategic choices as digital money, CBDCs, and cryptocurrencies evolve. National competitiveness, strategic sovereignty, and regulatory approaches are increasingly shaped by how countries respond to open monetary networks like Bitcoin. Should nations treat Bitcoin as a threat, a complement, or a strategic asset? How might holding or integrating Bitcoin affect macroeconomic resilience, reserves management, and technological leadership? What forms of co-operation and regulation can preserve innovation while managing risks? Bitcoin forces policymakers and corporate leaders to rethink monetary strategy, legal frameworks, and international collaboration in a world where money can move at internet speed, without relying solely on traditional financial centers.",
      gradient: "from-indigo-50 to-indigo-100/50",
      accent: "bg-indigo-500",
      articleLink: "/research/SBI-003",
      anchorId: "strategy-policy"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <span className="pill-hero mb-6">
                <span className="mr-2">🧠</span>
                <span className="pill-hero-text">Research Domains</span>
              </span>
            </div>
            <h1 className="mb-6 text-gray-900">Six Research Domains</h1>
            <p className="swiss-prose-lg mb-8 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Our research spans six interconnected domains that capture Bitcoin's full strategic significance
              for Switzerland's leadership in the global monetary system.
            </p>
            <div className="mt-8">
              <Button variant="ghost" asChild className="text-white hover:text-gray-200">
                <Link href="/research" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Research
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Domains Timeline */}
      <section className="swiss-section py-16">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto space-y-16">
            {domains.map((domain, index) => (
              <article
                key={index}
                id={domain.anchorId}
                className={`relative bg-gradient-to-br ${domain.gradient} rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200/50 scroll-mt-24`}
              >
                {/* Domain Number Indicator */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-white border-4 border-gray-200 flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-gray-700">{index + 1}</span>
                </div>

                {/* Domain Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-xl ${domain.accent} flex items-center justify-center text-3xl shadow-lg`}>
                      {domain.icon}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {domain.title}
                    </h2>
                  </div>
                  <p className="text-xl font-semibold text-gray-700 italic mb-6 pl-20">
                    {domain.question}
                  </p>
                </div>

                {/* Domain Content */}
                <div className="pl-20">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {domain.content}
                    </p>
                  </div>
                </div>

                {/* Article Link */}
                <div className="mt-8 pl-20">
                  <Link
                    href={domain.articleLink}
                    className="link-research inline-flex items-center text-sm font-semibold group"
                  >
                    <span>Read related article</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="swiss-section bg-gray-50 py-16">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6 text-gray-900">
              Explore Our Research
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Dive deeper into these domains through our intelligence reports and strategic analysis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="swiss-blue-gradient text-white">
                <Link href="/research">View Intelligence Reports</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/inquiry?service=research">Request Custom Analysis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Domains;

