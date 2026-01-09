"use client";

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const NEWSLETTER_SUBSCRIBED_KEY = 'newsletter-subscribed';

export function useNewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const subscribe = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
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
        setIsSubscribed(true);
        setEmail('');
        localStorage.setItem(NEWSLETTER_SUBSCRIBED_KEY, 'true');
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

  return {
    email,
    setEmail,
    isSubmitting,
    isSubscribed,
    subscribe,
  };
}

export function isAlreadySubscribed(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(NEWSLETTER_SUBSCRIBED_KEY) === 'true';
}
