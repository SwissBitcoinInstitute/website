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

  useEffect(() => {
    // Find active alert based on dates
    const now = new Date();
    const currentAlert = alertConfig.alerts.find(alert => {
      if (!alert.isActive) return false;
      const startDate = new Date(alert.startDate);
      const endDate = new Date(alert.endDate);
      return now >= startDate && now <= endDate;
    });

    if (!currentAlert) {
      setIsVisible(false);
      return;
    }


    setActiveAlert(currentAlert);
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Add/remove CSS variable to account for banner height
    if (isVisible && typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--banner-height', '56px');
      if (window.matchMedia('(min-width: 640px)').matches) {
        document.documentElement.style.setProperty('--banner-height', '64px');
      }
    } else if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--banner-height', '0px');
    }
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || !activeAlert) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      {/* Backdrop - white background */}
      <div className="bg-white border-b border-orange-100">
        {/* Content */}
        <div className="swiss-grid py-3 sm:py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              {/* Text Content */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  {activeAlert.alertText}
                </p>
              </div>

              {/* CTA Button with subtle pulse animation */}
              <Link
                href={activeAlert.buttonLink}
                className={cn(
                  "relative flex-shrink-0 px-4 py-2 text-sm font-medium",
                  "bg-bitcoin-orange text-white rounded-md",
                  "hover:bg-bitcoin-orange-hover transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-bitcoin-orange focus:ring-offset-2",
                  "animate-pulse-subtle"
                )}
              >
                {activeAlert.buttonText}
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
