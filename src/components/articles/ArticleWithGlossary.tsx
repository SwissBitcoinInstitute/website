'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import GlossaryLink from './GlossaryLink';
import { slugify } from './TableOfContents';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface GlossaryTerm {
  term: string;
  slug: string;
  shortDefinition: string;
}

interface ArticleWithGlossaryProps {
  content: string;
  articleId?: string;
}

// Article-specific glossary term exclusions (terms that shouldn't be linked in specific articles)
const ARTICLE_GLOSSARY_EXCLUSIONS: Record<string, string[]> = {
  'SBI-008': ['mining', 'difficulty'], // In SBI-008, "mining" and "difficulty" refer to gold mining, not Bitcoin
};

export default function ArticleWithGlossary({ content, articleId }: ArticleWithGlossaryProps) {
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([]);
  const [processedContent, setProcessedContent] = useState(content);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    // Load glossary terms directly from the glossary page route
    async function loadGlossary() {
      try {
        // Fetch all glossary terms by reading from content
        const response = await fetch('/api/glossary');
        if (!response.ok) {
          console.error('Failed to fetch glossary');
          return;
        }
        const terms: GlossaryTerm[] = await response.json();
        setGlossaryTerms(terms);
        
        // Get excluded term slugs for this article
        const excludedSlugs = articleId ? ARTICLE_GLOSSARY_EXCLUSIONS[articleId] || [] : [];
        const excludedSlugSet = new Set(excludedSlugs);
        
        // Process content to add glossary links
        let newContent = content;
        const highlightedSlugs = new Set<string>();
        
        // Sort by length descending to match longer phrases first
        const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);
        
        for (const term of sortedTerms) {
          // Skip if already highlighted or if excluded for this article
          if (highlightedSlugs.has(term.slug) || excludedSlugSet.has(term.slug)) continue;
          
          // Match whole words only, case insensitive
          const regex = new RegExp(`\\b(${term.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'i');
          
          if (regex.test(newContent)) {
            // Replace first occurrence only
            newContent = newContent.replace(regex, (match) => {
              highlightedSlugs.add(term.slug);
              return `[${match}](/glossary/${term.slug} "${term.shortDefinition}")`;
            });
          }
        }
        
        setProcessedContent(newContent);
      } catch (error) {
        console.error('Error loading glossary:', error);
      }
    }
    
    loadGlossary();
  }, [content]);

  return (
    <>
      <div className="prose prose-lg max-w-none" style={{ lineHeight: '1.75' }}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
          h1: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return <h1 id={id} className="text-3xl font-bold mt-8 mb-4 scroll-mt-24">{children}</h1>;
          },
          h2: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return <h2 id={id} className="text-2xl font-semibold mt-6 mb-3 scroll-mt-24">{children}</h2>;
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return <h3 id={id} className="text-xl font-semibold mt-5 mb-2 scroll-mt-24">{children}</h3>;
          },
          h4: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return <h4 id={id} className="text-lg font-semibold mt-4 mb-2 scroll-mt-24">{children}</h4>;
          },
          h5: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return <h5 id={id} className="text-base font-medium mt-3 mb-2 scroll-mt-24">{children}</h5>;
          },
          p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <div className="my-8 border-l-4 border-[#f7931a] bg-gray-50 rounded-r-lg pl-6 pr-6 py-6 shadow-sm [&_h3]:!mt-0 [&_h3]:!mb-4 [&_h3]:!text-gray-900 [&_h3]:!border-l-4 [&_h3]:!border-[#f7931a] [&_h3]:!pl-3 [&_h3]:!-ml-6 [&_p]:!text-gray-700 [&_p]:!not-italic [&_ul]:!text-gray-700 [&_ul]:!not-italic [&_ol]:!text-gray-700 [&_ol]:!not-italic [&_li]:!text-gray-700 [&_li]:!not-italic">
              <div className="space-y-4">
              {children}
              </div>
            </div>
          ),
          code: ({ children }) => (
            <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          img: ({ src, alt }) => {
            // Check if this is a figure image (in /sbi-intelligence-brief-figures/ directory)
            const isFigure = src?.includes('/sbi-intelligence-brief-figures/');
            
            if (isFigure && src) {
              return (
                <img
                  src={src}
                  alt={alt || ''}
                  className="cursor-pointer hover:opacity-90 transition-opacity my-6 rounded-lg"
                  onClick={() => setLightboxImage({ src, alt: alt || '' })}
                />
              );
            }
            
            // Regular images (non-figures) render normally
            return <img src={src} alt={alt || ''} className="my-6 rounded-lg" />;
          },
          a: ({ href, children, title }) => {
            // Style glossary links specially with custom tooltip
            if (href?.startsWith('/glossary/')) {
              return (
                <GlossaryLink href={href} title={title}>
                  {children}
                </GlossaryLink>
              );
            }
            // Regular links - use SBI colors: #5a8ba5 normal, #f7931a hover
            return (
              <a 
                href={href} 
                className="underline transition-colors" 
                style={{ color: '#5a8ba5' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f7931a'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#5a8ba5'}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full border-collapse bg-white">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-100">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-100 last:border-r-0 align-top">
              <div className="whitespace-normal break-words">
                {children}
              </div>
            </td>
          ),
        }}
      >
          {processedContent}
        </ReactMarkdown>
      </div>
      
      {/* Lightbox Dialog for Figure Images */}
      <Dialog open={!!lightboxImage} onOpenChange={(open) => !open && setLightboxImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none">
          {lightboxImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

