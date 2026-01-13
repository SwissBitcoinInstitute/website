"use client";

import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const EVENT_BANNER_KEY = 'sbi-next-event-banner-dismissed';

export default function NextEventBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner
    const isDismissed = localStorage.getItem(EVENT_BANNER_KEY);
    if (!isDismissed) {
      // Show banner immediately
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(EVENT_BANNER_KEY, 'true');
  };

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "sticky top-0 z-[60] transition-all duration-500 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      {/* Backdrop - subtle orange */}
      <div className="bg-gradient-to-r from-orange-50/98 via-orange-50/95 to-orange-50/98 backdrop-blur-sm border-b border-orange-100">
        {/* Content */}
        <div className="swiss-grid py-3 sm:py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              {/* Text Content */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  Next: Bitcoin in 21 Minutes Webinar
                </p>
              </div>

              {/* CTA Button with subtle pulse animation */}
              <Link
                href="/webinar"
                className={cn(
                  "relative flex-shrink-0 px-4 py-2 text-sm font-medium",
                  "bg-bitcoin-orange text-white rounded-md",
                  "hover:bg-bitcoin-orange-hover transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-bitcoin-orange focus:ring-offset-2",
                  "animate-pulse-subtle"
                )}
              >
                Save My Spot
              </Link>

              {/* Dismiss Button */}
              <button
                onClick={handleDismiss}
                className={cn(
                  "flex-shrink-0 p-1.5 rounded-md",
                  "text-gray-400 hover:text-gray-600 hover:bg-orange-50",
                  "transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
                )}
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

