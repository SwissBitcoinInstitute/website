import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import React from 'react';

// Using Omit to avoid clashing with Link's native href type
export interface CustomLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  as?: 'a' | 'div' | 'span';
}

export default function CustomLink({ size = 'md', className = '', children, href, as = 'a', ...props }: CustomLinkProps) {
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-md';
  const iconSize = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  const commonClasses = `link-research inline-flex items-center ${textSize} font-semibold group/link ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight className={`${iconSize} ml-2 group-hover/link:translate-x-1 transition-transform shrink-0`} />
    </>
  );

  if (as === 'div') {
    return <div className={commonClasses} {...props as any}>{content}</div>;
  }

  if (as === 'span') {
    return <span className={commonClasses} {...props as any}>{content}</span>;
  }

  return (
    <Link href={href || '#'} className={commonClasses} {...props as any}>
      {content}
    </Link>
  );
}
