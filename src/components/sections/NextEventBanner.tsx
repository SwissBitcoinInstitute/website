"use client";

import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import alertConfig from '@/config/alert-config.json';


interface AlertConfig {
  id: string;
  startDate: string;
  endDate: string;
  alertText: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
}

export default function NextEventBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeAlert, setActiveAlert] = useState<AlertConfig | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 1. Find active alert based on dates
    const now = new Date();
    const currentAlert = alertConfig.alerts.find(alert => {
      if (!alert.isActive) return false;
      const startDate = new Date(alert.startDate);
      const endDate = new Date(alert.endDate);
      return now >= startDate && now <= endDate;
    });

    if (currentAlert) {
      setActiveAlert(currentAlert);
    }

    // 2. Setup scroll listener
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setHasScrolled(true);
      } else if (window.scrollY < 50) {
        // Optional: hide again if scrolled back to top? 
        // Let's keep it visible once triggered for better UX, 
        // but the user might want it to toggle. 
        // Actually, the request said "only appear after some scrolling". 
        // I'll stick to a simple "once you scroll past 300, show it".
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check in case user is already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Show banner only if: we have an alert, we've scrolled, and not dismissed
    setIsVisible(!!activeAlert && hasScrolled && !isDismissed);
  }, [activeAlert, hasScrolled, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (!activeAlert) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[70] w-[calc(100%-3rem)] sm:w-full sm:max-w-[320px] transition-all duration-500 ease-out",
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95 pointer-events-none"
      )}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden group">
        {/* Subtle top accent line */}
        <div className="h-1 w-full bg-bitcoin-orange" />
        
        <div className="p-4 sm:p-5">
          <div className="flex gap-3">
            {/* Icon - Smaller */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-bitcoin-orange" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 m-0 leading-tight">
                  Next Event
                </h4>
                <button
                  onClick={handleDismiss}
                  className="p-1 -mr-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                  aria-label="Close notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <p className="text-sm font-medium text-gray-900 mb-3 leading-snug line-clamp-2">
                {activeAlert.alertText}
              </p>

              <Link
                href={activeAlert.buttonLink}
                className={cn(
                  "inline-flex items-center justify-center w-full px-3 py-1.5 text-xs font-semibold",
                  "bg-bitcoin-orange text-white rounded-lg",
                  "hover:bg-bitcoin-orange-hover transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-bitcoin-orange focus:ring-offset-2"
                )}
              >
                {activeAlert.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
