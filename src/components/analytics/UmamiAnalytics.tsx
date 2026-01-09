"use client";

import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/use-cookie-consent';

const UMAMI_WEBSITE_ID = 'e805c489-f435-4c36-9c21-8778e42c9ec1';
const UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js';

export default function UmamiAnalytics() {
  const { hasAnalyticsConsent, hasConsented } = useCookieConsent();

  useEffect(() => {
    // Default to true if user hasn't given consent yet (opt-out approach)
    // Once consent is given, respect the user's explicit choice
    // hasAnalyticsConsent will be false if consent exists and analytics is false
    // hasAnalyticsConsent will be false if no consent exists yet (because consent is null)
    // So we check: if consent exists, use hasAnalyticsConsent; otherwise default to true
    const shouldLoadAnalytics = hasConsented ? hasAnalyticsConsent : true;

    if (shouldLoadAnalytics && typeof window !== 'undefined') {
      // Check if script already exists
      const existingScript = document.querySelector(
        `script[data-website-id="${UMAMI_WEBSITE_ID}"]`
      );

      if (!existingScript) {
        const script = document.createElement('script');
        script.defer = true;
        script.src = UMAMI_SCRIPT_URL;
        script.setAttribute('data-website-id', UMAMI_WEBSITE_ID);
        script.async = true;

        document.head.appendChild(script);
      }
    } else {
      // Remove script if consent is revoked
      const existingScript = document.querySelector(
        `script[data-website-id="${UMAMI_WEBSITE_ID}"]`
      );

      if (existingScript) {
        existingScript.remove();
      }

      // Clear any Umami cookies/localStorage if they exist
      if (typeof window !== 'undefined') {
        // Umami typically stores data in localStorage/IndexedDB
        // We'll clear the specific keys if possible
        try {
          Object.keys(localStorage).forEach((key) => {
            if (key.includes('umami') || key.includes('_umami')) {
              localStorage.removeItem(key);
            }
          });
        } catch (e) {
          // Ignore errors
        }
      }
    }
  }, [hasAnalyticsConsent, hasConsented]);

  return null; // This component doesn't render anything
}

