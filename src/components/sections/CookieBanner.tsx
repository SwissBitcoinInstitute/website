"use client";

import { useState, useEffect } from 'react';
import { X, Cookie, Settings, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CookieConsent = {
  essential: boolean;
  analytics: boolean;
};

const COOKIE_CONSENT_KEY = 'sbi-cookie-consent';
const COOKIE_CONSENT_VERSION = '1.1';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true, // Always true, can't be disabled
    analytics: true, // Default to true
  });

  useEffect(() => {
    // Check if user has already given consent
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      // No consent yet - analytics defaults to true
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Load existing consent
      try {
        const consentRecord = JSON.parse(savedConsent);
        
        // Migrate old consent records (v1.0 with marketing) to new format (v1.1 without marketing)
        if (consentRecord.version === '1.0' && consentRecord.consent.marketing !== undefined) {
          // Remove marketing from old consent and update version
          const { marketing, ...migratedConsent } = consentRecord.consent;
          const newConsentRecord = {
            version: COOKIE_CONSENT_VERSION,
            timestamp: consentRecord.timestamp,
            consent: migratedConsent,
          };
          localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsentRecord));
          setConsent(migratedConsent);
        } else if (consentRecord.consent) {
          // Load existing consent
          setConsent(consentRecord.consent);
        }
      } catch (error) {
        // If parsing fails, show banner again with defaults
        console.error('Error parsing consent record:', error);
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent: CookieConsent = {
      essential: true,
      analytics: true,
    };
    saveConsent(fullConsent);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalConsent: CookieConsent = {
      essential: true,
      analytics: false, // User explicitly rejects analytics
    };
    saveConsent(minimalConsent);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    saveConsent(consent);
    setIsVisible(false);
  };

  const saveConsent = (consentData: CookieConsent) => {
    const consentRecord = {
      version: COOKIE_CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      consent: consentData,
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentRecord));
    
    // Apply consent preferences
    applyConsentPreferences(consentData);
  };

  const applyConsentPreferences = (consentData: CookieConsent) => {
    // Essential cookies are always enabled
    // Analytics cookies - UmamiAnalytics component will handle script loading/unloading
    // based on consent status via the useCookieConsent hook
  };

  const togglePreference = (key: keyof CookieConsent) => {
    if (key === 'essential') return; // Essential can't be toggled
    setConsent((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
    >
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm border-t border-gray-200"></div>
      
      {/* Content */}
      <div className="relative swiss-grid py-6">
        <div className="max-w-6xl mx-auto">
          {!showPreferences ? (
            /* Main Banner View */
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-swiss-blue/10 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-swiss-blue" />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  We Value Your Privacy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  We use cookies to enhance your browsing experience and analyze site traffic. 
                  By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or learn more in our{' '}
                  <Link 
                    href="/privacy" 
                    className="link-research font-medium"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="text-sm text-gray-600 hover:text-swiss-blue transition-colors underline underline-offset-2"
                  >
                    Customize Preferences
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="swiss-blue-gradient text-white shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            /* Preferences View */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-swiss-blue/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-swiss-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Cookie Preferences
                  </h3>
                </div>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close preferences"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cookie Categories */}
              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                        <span className="text-xs px-2 py-0.5 bg-swiss-blue/10 text-swiss-blue rounded-full">
                          Always Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-6 rounded-full bg-swiss-blue flex items-center justify-end px-1">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 rounded-lg border border-gray-200 bg-white">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                      <p className="text-sm text-gray-600">
                        These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => togglePreference('analytics')}
                        className={cn(
                          "relative w-12 h-6 rounded-full transition-colors duration-200",
                          consent.analytics ? "bg-swiss-blue" : "bg-gray-300"
                        )}
                        aria-label="Toggle analytics cookies"
                      >
                        <span
                          className={cn(
                            "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
                            consent.analytics ? "translate-x-6" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Save Button */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                <Button
                  onClick={() => setShowPreferences(false)}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="swiss-blue-gradient text-white shadow-lg hover:shadow-xl"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

