import { ArrowRight, Mail, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CTAButton from '@/components/ui/cta-button';
import { getCoreTeam } from '@/lib/team';

const Team = () => {
  const coreTeam = getCoreTeam();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <span className="pill-hero mb-6">
                <span className="mr-2">👥</span>
                <span className="pill-hero-text">World-Class Expertise</span>
              </span>
            </div>
            <h1 className="mb-10 text-gray-900">Meet the Team</h1>
            <p className="swiss-prose-lg mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              The Institute blends academic rigor with practical expertise to empower leaders 
              through open monetary education and research.
            </p>
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="swiss-blue-gradient-accent mx-auto"></div>
            </div>
            <h2>Core Team</h2>
            <p className="swiss-prose max-w-3xl mx-auto text-gray-600">
              United by knowledge, experience, and Bitcoin—our core team brings together academic rigor, practical expertise, and a shared commitment to empowering society through open monetary education and research.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {coreTeam.map((member, index) => (
              <Link 
                key={member.slug} 
                href={`/team/${member.slug}`}
                className="group text-center block"
              >
                <div className="relative mb-8">
                  <div className="w-32 h-32 rounded-3xl mx-auto mb-6 group-hover:scale-105 transition-all duration-300 shadow-xl overflow-hidden">
                    <Image 
                      src={member.photo} 
                      alt={`Photo of ${member.name}, ${member.role} at Swiss Bitcoin Institute`}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      priority={index < 3}
                    />
                  </div>
                  <div className="absolute inset-0 w-32 h-32 mx-auto rounded-3xl swiss-blue-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl"></div>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{member.name}</h3>
                <p className="swiss-blue-gradient-text font-semibold mb-6 text-lg">{member.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="card-general card-gradient-hover p-8 h-full">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-swiss-blue/10 to-swiss-blue/5 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">👁️</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Vision</h3>
                </div>
                <p className="swiss-prose-lg text-gray-700 leading-relaxed">
                  A prosperous world where sound money enables freedom, peace, and sustainability.
                </p>
              </div>

              {/* Mission */}
              <div className="card-general card-gradient-hover p-8 h-full">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-swiss-blue/10 to-swiss-blue/5 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Mission</h3>
                </div>
                <p className="swiss-prose-lg text-gray-700 leading-relaxed">
                  We equip Swiss decision-makers in business, government, and civil society with rigorous research and executive education to navigate Bitcoin's strategic implications – for their organizations and for Switzerland.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="swiss-section bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 cta-section-bg"></div>
        <div className="swiss-grid relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-medium text-white mb-6">
              Work with our team
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Leverage our collective expertise for your organization's Bitcoin strategy and education needs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <CTAButton variant="primary" size="lg" href="/inquiry" showArrow>
                Book a Briefing
              </CTAButton>
              <CTAButton variant="secondary" size="lg" href="/speaking" className="bg-white text-gray-900 hover:bg-gray-100">
                Engage a Speaker
              </CTAButton>
              <CTAButton variant="secondary" size="lg" href="/contact" className="bg-white text-gray-900 hover:bg-gray-100">
                Partner on Research
              </CTAButton>
            </div>
            
            <p className="text-gray-400">
              Ready to collaborate?{' '}
              <a href="mailto:hello@bitcoininstitute.ch" className="text-white hover:text-gray-300 transition-colors">
                hello@bitcoininstitute.ch
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
