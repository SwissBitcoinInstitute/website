import CTAButton from '@/components/ui/cta-button';

const WhyBitcoin = () => {
  const properties = [
    {
      icon: "🚫",
      title: "No Issuer",
      subtitle: "No CEO/founders/company/VC to influence",
      description: "Bitcoin has no company behind it, no CEO making decisions, and no venture capitalists pulling strings. Its creator, Satoshi Nakamoto, disappeared in 2011, leaving Bitcoin truly leaderless and community-driven. This is fundamentally different from other cryptocurrencies, which are essentially tech startups with founders who can change direction or tokenomics of the project."
    },
    {
      icon: "🔒",
      title: "Security Model",
      subtitle: "Link to physical world via energy expense",
      description: "Bitcoin's security is powered by real-world energy through a process called \"proof-of-work\" mining. To attack or alter Bitcoin, you would need to spend a huge amount of electricity, making it economically and logistically unfeasible. This physical anchor – unlike other cryptocurrencies that rely on digital voting or staking – creates an unforgeable link between the digital and physical worlds, ensuring that Bitcoin's ledger is as real and immutable as the laws of physics."
    },
    {
      icon: "💰",
      title: "Supply Cap",
      subtitle: "Absolute Scarcity, 21 million",
      description: "Bitcoin has a hard limit of 21 million coins that can ever exist, written directly into its code. Unlike traditional currencies that governments can print endlessly, or other cryptocurrencies that can change their supply rules, Bitcoin's scarcity is mathematically guaranteed. This makes it the first truly scarce digital asset in human history."
    },
    {
      icon: "🌐",
      title: "Largest Network Effects",
      subtitle: "Seven reinforcing network effects create unmatched dominance",
      description: "Bitcoin benefits from seven interconnected network effects (Trace Meyers) that reinforce each other: (1) Speculation attracts capital and attention, (2) Merchants adopt it to avoid fees and chargebacks, (3) Consumers use it for savings and unrestricted commerce, (4) Security strengthens as miners are incentivized by higher prices, (5) Developers build on its predictable, open codebase, (6) Financialization integrates it into traditional finance, and (7) it progresses toward becoming a world reserve currency. No other cryptocurrency comes close to matching Bitcoin across all seven dimensions simultaneously, creating an insurmountable competitive advantage that grows stronger with each new participant."
    },
    {
      icon: "🛡️",
      title: "Impossible to Manipulate",
      subtitle: "Economic incentives prevent easy code changes",
      description: "Bitcoin's design creates a system of checks and balances where changing the rules requires overwhelming consensus from users, miners, and node operators. You can't just update Bitcoin like a software app – you need to convince tens of thousands of independent participants to adopt your changes, and they have strong economic incentives to reject anything that weakens the network. This makes Bitcoin resistant to the kind of arbitrary changes and \"upgrades\" that plague other cryptocurrencies, where small groups of insiders can alter fundamental rules."
    },
    {
      icon: "⚡",
      title: "Technical Stability",
      subtitle: "Never hacked, 99.99% uptime",
      description: "Bitcoin's network has run continuously for 16 years without ever being hacked or experiencing a successful attack on its core protocol. It maintains 99.99% uptime, making it more reliable than most banking systems or tech platforms. While exchanges and individual wallets have been compromised, the Bitcoin network itself remains impenetrable—a track record no other cryptocurrency can match."
    },
    {
      icon: "🌍",
      title: "Maximal Decentralization",
      subtitle: "23,000 unstoppable public nodes, total 50,000-100,000",
      description: "Bitcoin runs on tens of thousands of nodes spread across the globe, with no single point of control or failure. Anyone can run a node from their home, making the network virtually impossible to shut down or censor. This massive decentralization is unmatched by any other cryptocurrency, most of which rely on a handful of servers or validators."
    },
    {
      icon: "🎯",
      title: "Purpose",
      subtitle: "Global digital money to save and spend",
      description: "Bitcoin was designed with one clear purpose: to be peer-to-peer electronic cash that works anywhere in the world without banks or intermediaries. Unlike other cryptocurrencies that promise to revolutionize supply chains, create metaverses, or solve dozens of problems, Bitcoin focuses solely on being the best form of money humanity has ever had. This singular focus makes it excellent at what it does – storing value and enabling transactions – rather than being mediocre at many things. Its adoption curve is proof of this success."
    }
  ];

  const consequences = [
    {
      icon: "🤝",
      title: "Trust",
      description: "As a consequence of all these properties that Bitcoin has been exhibiting without a flaw for over 16 years, an increasing number of people, organisations, and even nation states start trusting the system for their use: a neutral platform for exchanging value over the internet. Something we are lacking for the 21st century."
    },
    {
      icon: "⚖️",
      title: "Unique Regulatory Clarity",
      description: "Bitcoin enjoys unmatched regulatory clarity worldwide: the CFTC classifies it as a commodity like gold, the SEC confirms it's not a security, Europe's MiCA regulation recognizes it has no issuer risk, and FASB allows companies to mark it at market value on balance sheets. This clear legal status – achieved because Bitcoin truly has no company or issuer behind it – means businesses and individuals can use it without regulatory uncertainty. Other cryptocurrencies face legal challenges precisely because they don't share Bitcoin's unique characteristics."
    },
    {
      icon: "🏛️",
      title: "Institutional Backing",
      description: "Bitcoin has achieved unprecedented institutional adoption with the fastest-growing ETFs holding 1.3 million BTC, major banks offering custody services, and countries making it legal tender (El Salvador), doing strategic mining (Bhutan) or building Bitcoin reserves (USA, China). This institutional trust is reflected in Bitcoin's $1.8 trillion market value (end of 2025), providing unmatched liquidity that allows its use anywhere in the world, at any time. No other cryptocurrency has earned this level of legitimacy from traditional finance and governments, confirming Bitcoin's unique status as a digital commodity akin to gold rather than a speculative token."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <span className="pill-hero mb-6">
                <span className="mr-2">₿</span>
                <span className="pill-hero-text">Fundamental Properties</span>
              </span>
            </div>
            <h1 className="mb-10 text-gray-900">Why Bitcoin</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Several fundamental properties render Bitcoin unique in the crypto and fiat world alike. Over the years, they have resulted in three real-world outcomes for Bitcoin that make it stand out from all other forms of money, digital or not. If you have not, you really should start studying Bitcoin. If not for yourself, then for your children, because there is a real chance that Bitcoin will outlive you.
            </p>
          </div>
        </div>
      </section>

      {/* Core Properties */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="swiss-blue-gradient-accent mx-auto"></div>
            </div>
            <h2>Fundamental Properties</h2>
            <p className="swiss-prose max-w-3xl mx-auto text-gray-600 mt-4">
              Eight core properties that distinguish Bitcoin from all other digital assets and traditional currencies.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {properties.map((property, index) => (
                <div 
                  key={index} 
                  className="card-general card-gradient-hover group p-8 h-full"
                >
                  <div className="flex items-start gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-swiss-blue/10 to-swiss-blue/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                        <span className="text-3xl">{property.icon}</span>
                      </div>
                      <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-swiss-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{property.title}</h3>
                      <p className="text-sm font-medium text-swiss-blue mb-4">{property.subtitle}</p>
                      <p className="text-gray-600 text-base leading-relaxed">{property.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consequences Section */}
      <section className="swiss-section bg-gray-50">
        <div className="swiss-grid">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="swiss-blue-gradient-accent mx-auto"></div>
            </div>
            <h2>Consequences</h2>
            <p className="swiss-prose max-w-3xl mx-auto text-gray-600 mt-4">
              These fundamental properties lead to real-world outcomes that distinguish Bitcoin from all other digital assets.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {consequences.map((consequence, index) => (
                <div 
                  key={index} 
                  className="card-general card-gradient-hover group p-8 h-full border-2 border-swiss-blue/20 bg-white"
                >
                  <div className="text-center mb-6">
                    <div className="relative inline-block mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-swiss-blue/20 to-swiss-blue/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                        <span className="text-4xl">{consequence.icon}</span>
                      </div>
                      <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-swiss-blue/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl mx-auto"></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Consequence: {consequence.title}</h3>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed text-center">{consequence.description}</p>
                </div>
              ))}
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
              Ready to Learn More?
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our research, education programs, and strategic intelligence to deepen your understanding of Bitcoin.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <CTAButton variant="primary" size="lg" href="/research" showArrow>
                Explore Research
              </CTAButton>
              <CTAButton variant="secondary" size="lg" href="/inquiry?service=research" className="bg-white text-gray-900 hover:bg-gray-100">
                Book discovery call
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyBitcoin;
