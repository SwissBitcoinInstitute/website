import Link from 'next/link';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}

const CTAButton = ({ 
  variant = 'primary', 
  size = 'default', 
  href, 
  children, 
  className,
  showArrow = false 
}: CTAButtonProps) => {
  const baseClasses = "font-medium transition-all duration-300 group btn-hover-scale";
  
  const variants = {
    primary: "swiss-blue-gradient text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300",
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
  };

  return (
    <Button
      variant={variant === 'primary' ? 'default' : variant}
      size={size}
      className={cn(baseClasses, variants[variant], className)}
      asChild
    >
      <Link href={href} className="flex items-center space-x-2">
        <span>{children}</span>
        {showArrow && (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </Link>
    </Button>
  );
};

export default CTAButton;