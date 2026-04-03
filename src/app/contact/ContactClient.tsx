"use client";

import { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CTAButton from '@/components/ui/cta-button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    subject: '',
    message: '',
    engagementType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          organization: '',
          email: '',
          subject: '',
          message: '',
          engagementType: ''
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again or email us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      icon: "",
      primaryCta: { text: "Explore options", link: "/education" },
      secondaryCta: { text: "Book discovery Call", link: "/inquiry?service=courses&discovery=true" }
    },
    {
      title: "Research",
      description: "Actionable insights on Bitcoin's strategic implications",
      icon: "",
      primaryCta: { text: "View offering", link: "/research" },
      secondaryCta: { text: "Next Free Webinar", link: "/webinar" }
    },
    {
      title: "Speaking",
      description: "Keynotes that get the message across and encourage reflection",
      icon: "",
      primaryCta: { text: "View talks", link: "/speaking" },
      secondaryCta: { text: "Book discovery Call", link: "/inquiry?service=speaking&discovery=true" }
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-10 text-gray-900">Get in Touch</h1>
            <p className="swiss-prose-lg mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
              Ready to advance your Bitcoin understanding? Whether you need strategic insights,
              educational workshops, or research collaboration, our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="swiss-section-sm sm:swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              /* Success State */
              <div className="text-center py-16">
                <div className="mb-8 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-swiss-blue/10 flex items-center justify-center animate-in zoom-in-50 duration-500">
                    <CheckCircle2 className="w-20 h-20 text-swiss-blue" strokeWidth={1.5} />
                  </div>
                </div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Message Sent!</h2>
                <p className="swiss-prose text-gray-600 max-w-md mx-auto mb-8">
                  Thank you for reaching out. We'll get back to you within 1-2 business days.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="text-swiss-blue border-swiss-blue hover:bg-swiss-blue/5"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              /* Form */
              <>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    disabled={isSubmitting}
                    className="w-full h-12 text-lg font-semibold btn-hover-scale"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose SBI Section */}
      <section className="swiss-section bg-gray-50">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12 text-gray-900">Why Choose the Swiss Bitcoin Institute?</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-bitcoin-orange flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Independent Research</h3>
                    <p className="text-gray-600">Rigorous, evidence-based analysis and view on Bitcoin. No industry funding, no conflicts of interest.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-bitcoin-orange flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Swiss Context</h3>
                    <p className="text-gray-600">Deep understanding of Swiss environment, financial cultures, and institutional landscape.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-bitcoin-orange flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Practical Focus</h3>
                    <p className="text-gray-600">Actionable intelligence and education for decision-makers - as customized as you like.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-bitcoin-orange flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Expertise</h3>
                    <p className="text-gray-600">60+ years of combined Bitcoin experience across different domains and industries.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;