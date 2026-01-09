"use client";

import { useState, useEffect } from 'react';

export type CookieConsent = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = 'sbi-cookie-consent';

interface ConsentRecord {
  version: string;
  timestamp: string;
  consent: CookieConsent;
}

/**
 * Hook to check and manage cookie consent status
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      try {
        const consentRecord: ConsentRecord = JSON.parse(savedConsent);
        setConsent(consentRecord.consent);
        setHasConsented(true);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
      }
    }
  }, []);

  return {
    consent,
    hasConsented,
    hasAnalyticsConsent: consent?.analytics ?? false,
    hasMarketingConsent: consent?.marketing ?? false,
  };
}

/**
 * Check if user has given cookie consent
 */
export function hasCookieConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
}

/**
 * Get current cookie consent preferences
 */
export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  
  const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!savedConsent) return null;

  try {
    const consentRecord: ConsentRecord = JSON.parse(savedConsent);
    return consentRecord.consent;
  } catch (error) {
    console.error('Error parsing cookie consent:', error);
    return null;
  }
}

