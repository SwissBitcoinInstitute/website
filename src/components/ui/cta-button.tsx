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
    primary: "bg-btn-primary text-btn-primary-foreground hover:bg-btn-primary-hover shadow-lg hover:shadow-xl border-transparent",
    secondary: "bg-btn-secondary text-btn-secondary-foreground border hover:bg-btn-secondary-hover border-btn-secondary-border hover:border-btn-secondary-hover-border",
    outline: "bg-transparent text-btn-secondary-foreground border hover:bg-btn-secondary-hover border-btn-secondary-border hover:border-btn-secondary-hover-border hover:text-btn-secondary-foreground"
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