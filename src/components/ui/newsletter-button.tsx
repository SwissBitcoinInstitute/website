"use client";

import { Mail } from 'lucide-react';
import { Button } from './button';

interface NewsletterButtonProps {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export default function NewsletterButton({ 
  variant = 'default',
  size = 'default',
  className = '',
  children = 'Subscribe to Intelligence Brief'
}: NewsletterButtonProps) {
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Function to try opening MailerLite popup
    const tryOpenPopup = () => {
      if (typeof window !== 'undefined' && (window as any).ml) {
        try {
          (window as any).ml('show', 'K1pHki', true);
          return true;
        } catch (error) {
          console.error('MailerLite popup error:', error);
          return false;
        }
      }
      return false;
    };
    
    // Try immediately
    if (tryOpenPopup()) {
      return;
    }
    
    // If MailerLite isn't ready, wait and retry up to 3 times
    let attempts = 0;
    const maxAttempts = 3;
    const retryInterval = setInterval(() => {
      attempts++;
      if (tryOpenPopup() || attempts >= maxAttempts) {
        clearInterval(retryInterval);
        
        // If still not working after retries, scroll to newsletter section
        if (attempts >= maxAttempts && !tryOpenPopup()) {
          const newsletterSection = document.getElementById('newsletter');
          if (newsletterSection) {
            newsletterSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }, 300);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
    >
      <Mail className="w-4 h-4 mr-2" />
      {children}
    </Button>
  );
}

