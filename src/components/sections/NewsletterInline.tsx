"use client";

import { useEffect, useRef } from 'react';

interface NewsletterInlineProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function NewsletterInline({ 
  title = "Subscribe to Intelligence Brief",
  description = "Get strategic Bitcoin insights delivered to your inbox.",
  className = ""
}: NewsletterInlineProps) {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure MailerLite script is loaded and initialize the embedded form
    if (typeof window !== 'undefined' && (window as any).ml) {
      try {
        // Force re-render of MailerLite embedded forms
        const forms = document.querySelectorAll('.ml-embedded');
        forms.forEach((form) => {
          if (form.getAttribute('data-form') === 'K1pHki') {
            // MailerLite will auto-initialize embedded forms
            console.log('MailerLite embedded form detected');
          }
        });
      } catch (error) {
        console.error('MailerLite initialization error:', error);
      }
    }
  }, []);

  return (
    <div className={`bg-gradient-to-br from-bitcoin-orange/5 to-swiss-red/5 rounded-2xl p-8 border border-bitcoin-orange/20 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* MailerLite Embedded Form */}
      <div ref={formRef}>
        <div className="ml-embedded" data-form="K1pHki"></div>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        Privacy-first. No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}

