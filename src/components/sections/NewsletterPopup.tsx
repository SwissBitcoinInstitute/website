"use client";

import { useState, useEffect } from 'react';
import { X, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNewsletterSubscription, isAlreadySubscribed } from '@/hooks/use-newsletter';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { email, setEmail, isSubmitting, isSubscribed, subscribe } = useNewsletterSubscription();

  useEffect(() => {
    // Don't show popup if user has already subscribed
    if (isAlreadySubscribed()) return;

    // Check if user has seen the popup before
    const popupShown = localStorage.getItem('newsletter-popup-shown');
    
    if (!popupShown) {
      // Show popup after 30 seconds on first visit
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('newsletter-popup-shown', 'true');
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, []);

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
            {isSubscribed ? (
              /* Success State */
              <div className="text-center py-4">
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-swiss-blue/10 flex items-center justify-center animate-in zoom-in-50 duration-500">
                    <CheckCircle2 className="w-14 h-14 text-swiss-blue" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  You're Subscribed!
                </h3>
                <p className="text-gray-600 mb-6">
                  Welcome aboard. You'll receive our latest Bitcoin intelligence reports directly to your inbox.
                </p>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="text-swiss-blue border-swiss-blue hover:bg-swiss-blue/5"
                >
                  Close
                </Button>
              </div>
            ) : (
              /* Form State */
              <>
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
                <form onSubmit={subscribe} className="space-y-4">
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
              </>
            )}
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
