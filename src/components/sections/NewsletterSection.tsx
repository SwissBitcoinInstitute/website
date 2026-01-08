"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Successfully subscribed!",
          description: "You'll receive our latest Bitcoin intelligence reports.",
        });
        setEmail('');
      } else {
        toast({
          title: "Subscription failed",
          description: data.error || "Please try again later or contact us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="swiss-section bg-white">
      <div className="swiss-grid">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-swiss-blue/20 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-swiss-blue/20 to-swiss-blue/10 rounded-full flex items-center justify-center">
                <span className="text-4xl">📧</span>
              </div>
              
              <h2 className="text-3xl font-semibold mb-6 text-gray-900">
                Stay Ahead with Bitcoin Intelligence
              </h2>
              
              <p className="swiss-prose-lg mb-8 text-gray-600 max-w-2xl mx-auto">
                Strategic Bitcoin insights directly to your mailbox. Twice a month. Unsubscribe anytime.
              </p>
              
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="your.email@company.com" 
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    required
                    className="h-12 flex-1"
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="submit" 
                    className="h-12 px-8 swiss-blue-gradient swiss-blue-gradient-hover text-white whitespace-nowrap w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe to Intelligence Brief'}
                  </Button>
                </div>
              </form>
              
              <p className="text-sm text-gray-500 mt-4">
                Join our growing community of Bitcoin intelligence subscribers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
