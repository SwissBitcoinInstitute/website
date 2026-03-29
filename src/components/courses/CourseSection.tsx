import React from 'react';
import Link from 'next/link';

export interface CourseSectionProps {
  title: string;
  description: string;
  href?: string;
  tag?: string;
  details?: { icon: React.ReactNode; label: string; value: string }[];
  image?: string;
  imageCredit?: string;
  imageCreditUrl?: string;
  imageCreditDark?: boolean;
  reverse?: boolean;
}

const CourseSection = ({
  title,
  description,
  href,
  tag,
  details,
  image,
  imageCredit,
  imageCreditUrl,
  imageCreditDark,
  reverse,
}: CourseSectionProps) => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8 last:mb-0">
    <div className={`flex flex-col min-h-[320px] ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      {/* Left Column: Image */}
      <div
        className="w-full md:w-2/5 relative overflow-hidden border-b md:border-b-0 md:border-r border-gray-100 min-h-[220px]"
        style={image
          ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)' }
        }
      >
        {imageCredit && imageCreditUrl && (
          <a
            href={imageCreditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute bottom-0 left-0 right-0 px-3 py-1.5 text-[10px] transition-colors duration-200 truncate ${imageCreditDark ? 'text-black/40 hover:text-black/70' : 'text-white/60 hover:text-white/90'}`}
          >
            © {imageCredit}
          </a>
        )}
      </div>

      {/* Right Column: Content */}
      <div className="flex-1 p-8 md:p-10 flex flex-col">
        {/* Top: tag + title + description */}
        <div className="flex-1">
          {tag && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-bitcoin-orange/10 mb-5">
              <span className="text-bitcoin-orange text-xs font-semibold uppercase tracking-wider">{tag}</span>
            </div>
          )}
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
          <p className="swiss-prose-lg text-gray-600 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bottom: details icons (left) + link (right) */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          {/* Details */}
          {details && details.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {details.map((detail, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="text-swiss-blue">{detail.icon}</div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider leading-none mb-0.5">{detail.label}</div>
                    <div className="text-sm font-semibold text-gray-900">{detail.value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Link */}
          {href && (
            <div className="sm:ml-auto shrink-0">
              <Link
                href={href}
                className="link-research text-sm"
              >
                Find out more →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default CourseSection;
