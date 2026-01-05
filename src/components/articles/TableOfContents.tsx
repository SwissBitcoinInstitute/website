'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

// Generate slug from heading text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-');     // Replace multiple hyphens with single
}

// Extract headings from markdown
function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split('\n');
  
  for (const line of lines) {
    // Match h2 (## ), h3 (### ), and h4 (#### ) headings
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);
    const h4Match = line.match(/^####\s+(.+)$/);
    
    if (h2Match) {
      const text = h2Match[1].trim();
      headings.push({
        id: slugify(text),
        text: text,
        level: 2,
      });
    } else if (h3Match) {
      const text = h3Match[1].trim();
      headings.push({
        id: slugify(text),
        text: text,
        level: 3,
      });
    } else if (h4Match) {
      const text = h4Match[1].trim();
      headings.push({
        id: slugify(text),
        text: text,
        level: 4,
      });
    }
  }
  
  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const extracted = extractHeadings(content);
    setHeadings(extracted);

    // Intersection Observer to track which heading is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );

    // Observe all heading elements
    const timeoutId = setTimeout(() => {
      extracted.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 500); // Wait for content to render

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <nav className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex gap-3 mb-4">
        <div className="flex items-center h-[1.5rem]">
        <List className="w-5 h-5 text-gray-700" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 leading-[1.5rem]">Table of Contents</h2>
      </div>
      
      <ol className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={heading.id}
            className={`${
              heading.level === 3 ? 'ml-4' : ''
            } ${
              heading.level === 4 ? 'ml-8' : ''
            }`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`
                block text-sm transition-colors duration-200 py-1
                ${activeId === heading.id 
                  ? 'text-[#f7931a] font-semibold' 
                  : 'text-gray-600 hover:text-[#5a8ba5]'
                }
                ${heading.level === 2 ? 'font-medium' : heading.level === 3 ? 'font-normal' : 'font-normal text-xs'}
              `}
            >
              <span className="text-gray-400 font-normal mr-2">
                {String(index + 1).padStart(2, '0')}.
              </span>
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Export the slugify function for use in other components
export { slugify };

