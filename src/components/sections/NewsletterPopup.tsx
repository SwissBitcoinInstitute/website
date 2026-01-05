"use client";

import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has seen the popup before
    const popupShown = localStorage.getItem('newsletter-popup-shown');
    
    if (!popupShown) {
      // Show popup after 30 seconds on first visit
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem('newsletter-popup-shown', 'true');
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, []);

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
      // Submit to MailerLite using JSONP endpoint
      const callbackName = `mlCallback_${Date.now()}`;
      
      (window as any)[callbackName] = (response: any) => {
        setIsSubmitting(false);
        
        if (response && response.result === 'success') {
          toast({
            title: "Successfully subscribed!",
            description: "You'll receive our latest Bitcoin intelligence reports.",
          });
          setEmail('');
          setIsOpen(false);
        } else {
          toast({
            title: "Subscription failed",
            description: response?.error || "Please try again later or contact us directly.",
            variant: "destructive",
          });
        }
        
        // Cleanup
        delete (window as any)[callbackName];
        const script = document.querySelector(`script[data-ml-subscribe]`);
        if (script) {
          document.body.removeChild(script);
        }
      };

      // Create JSONP script tag
      const script = document.createElement('script');
      script.src = `https://assets.mailerlite.com/jsonp/subscribe/get?callback=${callbackName}&email=${encodeURIComponent(email)}&form_id=K1pHki`;
      script.setAttribute('data-ml-subscribe', 'true');
      document.body.appendChild(script);

      // Timeout fallback
      setTimeout(() => {
        if ((window as any)[callbackName]) {
          setIsSubmitting(false);
          delete (window as any)[callbackName];
          const scriptEl = document.querySelector(`script[data-ml-subscribe]`);
          if (scriptEl) {
            document.body.removeChild(scriptEl);
          }
          toast({
            title: "Request timeout",
            description: "Please check your connection and try again.",
            variant: "destructive",
          });
        }
      }, 10000);
      } catch (error) {
      console.error('Newsletter subscription error:', error);
      setIsSubmitting(false);
      toast({
        title: "Subscription failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bitcoin-orange/10 mb-4">
                <Mail className="w-8 h-8 text-bitcoin-orange" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Stay Informed on Bitcoin
              </h3>
              <p className="text-gray-600">
                Get strategic insights, research updates, and exclusive analysis from Switzerland's leading Bitcoin think tank.
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4" data-netlify="true" name="newsletter-popup">
              <input type="hidden" name="form-name" value="newsletter-popup" />
              <Input
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold swiss-blue-gradient text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribe to Intelligence Brief
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              No spam. Unsubscribe anytime. Privacy-first approach.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Manual trigger function for button clicks
export function openNewsletterPopup() {
  if (typeof window !== 'undefined' && (window as any).ml) {
    (window as any).ml('show', 'K1pHki', true);
  }
}

