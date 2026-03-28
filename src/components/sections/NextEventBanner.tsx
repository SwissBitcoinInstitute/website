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
    // Check if alert is active based on dates
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
    
    // Show after a short delay for a smoother effect
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || !activeAlert) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[70] w-[calc(100%-3rem)] sm:w-full sm:max-w-[380px] transition-all duration-500 ease-out",
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95 pointer-events-none"
      )}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden group">
        {/* Subtle top accent line using Bitcoin Orange */}
        <div className="h-1 w-full bg-bitcoin-orange" />
        
        <div className="p-5 sm:p-6">
          <div className="flex gap-4">
            {/* Icon - using Bitcoin Orange */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-bitcoin-orange" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-semibold text-gray-900 m-0 leading-tight">
                  Upcoming Event
                </h4>
                <button
                  onClick={handleDismiss}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                {activeAlert.alertText}
              </p>

              <Link
                href={activeAlert.buttonLink}
                onClick={handleDismiss}
                className={cn(
                  "inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold",
                  "bg-bitcoin-orange text-white rounded-xl shadow-lg shadow-orange-200/50",
                  "hover:bg-bitcoin-orange-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
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
