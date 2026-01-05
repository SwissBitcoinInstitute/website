"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CTAButton from '@/components/ui/cta-button';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    subject: '',
    message: '',
    engagementType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you soon.",
    });
    setFormData({
      name: '',
      organization: '',
      email: '',
      subject: '',
      message: '',
      engagementType: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const engagementTypes = [
    {
      title: "Education",
      description: "From 1:1 bespoke sessions to more formal courses",
      icon: "🎓",
      primaryCta: { text: "Explore options", link: "/education" },
      secondaryCta: { text: "Book discovery Call", link: "/inquiry?service=courses" }
    },
    {
      title: "Research",
      description: "Actionable insights on Bitcoin's strategic implications",
      icon: "🧠",
      primaryCta: { text: "View offering", link: "/research" },
      secondaryCta: { text: "Next Free Webinar", link: "/webinar" }
    },
    {
      title: "Speaking",
      description: "Keynotes that get the message across and encourage reflection",
      icon: "🎤",
      primaryCta: { text: "View talks", link: "/speaking" },
      secondaryCta: { text: "Book discovery Call", link: "/inquiry?service=speaking" }
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="pill-hero mb-6">
                <span className="mr-2">💬</span>
                <span className="pill-hero-text">Let's Connect</span>
              </span>
            </div>
            <h1 className="mb-10 text-gray-900">Get in Touch</h1>
            <p className="swiss-prose-lg mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
              Ready to advance your Bitcoin understanding? Whether you need strategic insights,
              educational workshops, or research collaboration, our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="swiss-blue-gradient-accent mx-auto"></div>
            </div>
              <h2>Send Us a Message</h2>
              <p className="swiss-prose max-w-2xl mx-auto text-gray-600 mt-4">
                Tell us about your Bitcoin education and strategy needs.
            </p>
          </div>
            
            <form onSubmit={handleSubmit} className="space-y-6" data-netlify="true" name="contact">
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Organization
                  </label>
                  <Input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="Company or institution"
                    className="h-12"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@company.com"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What can we help you with?"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us more about your needs, timeline, and any specific requirements..."
                  rows={6}
                  className="resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold swiss-blue-gradient btn-hover-scale text-white"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose Swiss Bitcoin Institute */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Why Choose Swiss Bitcoin Institute</h2>
            <p className="swiss-prose-lg text-gray-600 mb-12">
              Switzerland's independent Bitcoin think tank combines academic rigor with practical expertise.
              Our neutral perspective, technical depth, and commitment to evidence-based analysis make us
              the trusted partner for organizations navigating the Bitcoin transformation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-swiss-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🇨🇭</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Swiss Excellence</h3>
                <p className="text-gray-600 text-sm">
                  Precision, neutrality, and institutional quality that Switzerland is known for, applied to Bitcoin.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-swiss-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Independent Research</h3>
                <p className="text-gray-600 text-sm">
                  Evidence-based analysis free from commercial interests or institutional biases.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-swiss-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Practical Focus</h3>
                <p className="text-gray-600 text-sm">
                  Strategic insights that translate complex Bitcoin concepts into actionable business decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Engage */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="swiss-blue-gradient-accent mx-auto"></div>
            </div>
            <h2>Ways to Engage</h2>
            <p className="swiss-prose max-w-3xl mx-auto text-gray-600 mt-4">
              Explore our different service offerings and find the right fit for your needs.
                </p>
              </div>
              
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {engagementTypes.map((type, index) => (
              <div 
                key={index} 
                className="card-general card-gradient-hover group"
              >
                <div className="relative z-10">
                  {/* Icon with gradient background */}
                  <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl swiss-blue-gradient-subtle shadow-sm mx-auto">
                    <span className="text-3xl">{type.icon}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
                    {type.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-base text-center">
                    {type.description}
                  </p>
                  
                  {/* CTAs */}
                  <div className="space-y-3">
                    <CTAButton 
                      variant="primary" 
                      size="lg" 
                      href={type.primaryCta.link} 
                      className="w-full"
                    >
                      {type.primaryCta.text}
                    </CTAButton>
                    <CTAButton 
                      variant="secondary" 
                      size="lg" 
                      href={type.secondaryCta.link} 
                      className="w-full"
                    >
                      {type.secondaryCta.text}
                    </CTAButton>
                  </div>
                </div>
                </div>
            ))}
                </div>

          {/* More to Come Card */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="card-general p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">More to come in 2026!</h3>
                <p className="text-gray-600 mb-6 text-base">
                  We plan to expand our offering with much more. Stay tuned!
                </p>
                <CTAButton 
                  variant="secondary" 
                  size="lg" 
                  href="/webinar"
                  className="mx-auto"
                >
                  Tell me more
                </CTAButton>
              </div>
                      </div>
              </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-gradient-to-br from-swiss-blue/5 to-swiss-blue/10 rounded-2xl border border-swiss-blue/20">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Something Custom?</h3>
                <p className="text-gray-600 mb-4">
                  We also create tailored programs for specific organizational needs, from board presentations to multi-day immersions.
                </p>
                <p className="text-sm text-gray-500">
                  Reach out to discuss your unique requirements.
                </p>
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
              Ready to Get Started?
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the growing number of leaders who trust the Swiss Bitcoin Institute for their Bitcoin education and strategy needs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <CTAButton variant="primary" size="lg" href="/inquiry?service=research" showArrow>
                Book discovery call
              </CTAButton>
              <CTAButton variant="secondary" size="lg" href="/speaker" className="bg-white text-gray-900 hover:bg-gray-100">
                Request Speaker
              </CTAButton>
            </div>
            
            <p className="text-gray-400">
              Questions? Email us at{' '}
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

export default Contact;