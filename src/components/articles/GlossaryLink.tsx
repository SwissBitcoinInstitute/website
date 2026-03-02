'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface GlossaryLinkProps {
  href: string;
  children: React.ReactNode;
  title?: string;
  target?: string;
}

export default function GlossaryLink({ href, children, title, target }: GlossaryLinkProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Extract term name from the link text
  const termText = typeof children === 'string' ? children : String(children);

  return (
    <span className="relative inline-block">
      <Link
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className="text-primary font-semibold border-b border-primary/40 border-dotted hover:border-primary hover:bg-primary/5 transition-all duration-200"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        {children}
      </Link>

      {showTooltip && title && (
        <div className="glossary-tooltip absolute w-80 mt-2 left-1/2 -translate-x-1/2 pointer-events-none" style={{ zIndex: 9999 }}>
          {/* Tooltip arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-200 transform rotate-45" style={{ boxShadow: '-2px -2px 4px rgba(0,0,0,0.05)' }}></div>

          {/* Tooltip content */}
          <div className="relative bg-white rounded-xl border border-gray-200 p-4" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)' }}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="text-base text-gray-900" style={{ fontWeight: 800 }}>
                {termText}
              </h4>
              <span className="flex-shrink-0 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full" style={{ fontWeight: 600 }}>
                Glossary
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-3" style={{ fontWeight: 400 }}>
              {title}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-primary" style={{ fontWeight: 600 }}>
              <ExternalLink className="w-3 h-3" />
              <span>Click to view full definition</span>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}

