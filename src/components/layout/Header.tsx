"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SiteSearch } from '@/components/search/SiteSearch';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (name: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setDropdownOpen(name);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setDropdownOpen(null), 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const navigation = [
    {
      name: 'Education',
      href: '/education',
      hasLandingPage: true,
      dropdown: [
        { name: 'Private Bitcoin Briefing', href: '/education/private-bitcoin-briefing' },
        { name: 'Bitcoin Executive Masterclass', href: '/education/bitcoin-for-executives' },
        { name: 'Financial Sovereignty', href: '/education/financial-sovereignty' },
      ]
    },
    {
      name: 'Research',
      href: '/research',
      hasLandingPage: true,
      dropdown: [
        { name: 'Bitcoin Intelligence Briefs', href: '/research/intelligence-briefs' },
        { name: 'Bitcoin Research Quarterly', href: '/research/resq-package' },
        { name: 'Research Domains', href: '/domains' },
      ]
    },
    { name: 'Speaking', href: '/speaking' },
    { name: 'Glossary', href: '/glossary' },
    {
      name: 'About',
      href: '/switzerland-bitcoin',
      dropdown: [
        { name: 'Meet the Team', href: '/team' },
        { name: 'Switzerland & Bitcoin', href: '/switzerland-bitcoin' },
        { name: 'Why Bitcoin', href: '/why-bitcoin' },
        { name: 'Fellowship', href: '/fellows' },
      ]
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky z-50 bg-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 border-b border-gray-200/60 shadow-sm" style={{ top: 'var(--banner-height, 0px)' }}>
      <nav className="swiss-grid" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-4 group">
              <img
                src="/sbi-logos/SBI-Logo-Landscape_2.png"
                alt="Swiss Bitcoin Institute"
                className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              'dropdown' in item ? (
                <div
                  key={item.name}
                  className="relative dropdown-container"
                  onMouseEnter={() => openDropdown(item.name)}
                  onMouseLeave={scheduleCloseDropdown}
                >
                  {'hasLandingPage' in item ? (
                    <Link
                      href={item.href}
                      onFocus={() => openDropdown(item.name)}
                      className={`flex items-center text-sm font-semibold transition-colors hover:text-primary-brand ${isActive(item.href) || item.dropdown?.some(sub => isActive(sub.href)) ? 'text-primary-brand' : 'text-gray-600'
                        }`}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen === item.name}
                      onClick={() => setDropdownOpen(dropdownOpen === item.name ? null : item.name)}
                      onFocus={() => openDropdown(item.name)}
                      className={`flex items-center text-sm font-semibold transition-colors hover:text-primary-brand ${isActive(item.href) || item.dropdown?.some(sub => isActive(sub.href)) ? 'text-primary-brand' : 'text-gray-600'
                        }`}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  )}
                  {dropdownOpen === item.name && item.dropdown && (
                    <div className="absolute top-full left-0 pt-2 w-48 z-50">
                      <div className="bg-white rounded-md shadow-lg border border-gray-200 py-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm hover:bg-gray-50 ${isActive(subItem.href) ? 'text-primary-brand' : 'text-gray-600'
                              }`}
                            onClick={() => setDropdownOpen(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors hover:text-primary-brand ${isActive(item.href) ? 'text-primary-brand' : 'text-gray-600'
                    }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Buttons & Search */}
          <div className="hidden md:flex items-center space-x-3">
            <SiteSearch />
            <Button variant="default" size="sm" asChild>
              <Link href="/inquiry?service=research&discovery=true">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-brand focus:ring-offset-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-gray-200">
              {navigation.map((item) => (
                'dropdown' in item ? (
                  <div key={item.name}>
                    {'hasLandingPage' in item ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2 text-base font-semibold transition-colors hover:text-primary-brand ${isActive(item.href) || item.dropdown?.some(sub => isActive(sub.href)) ? 'text-primary-brand' : 'text-gray-600'
                          }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <div className={`block px-3 py-2 text-base font-semibold ${isActive(item.href) || item.dropdown?.some(sub => isActive(sub.href)) ? 'text-primary-brand' : 'text-gray-600'
                        }`}>
                        {item.name}
                      </div>
                    )}
                    <div className="pl-6 space-y-1">
                      {item.dropdown?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-3 py-2 text-sm transition-colors hover:text-primary-brand ${isActive(subItem.href) ? 'text-primary-brand' : 'text-gray-600'
                            }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-semibold transition-colors hover:text-primary-brand ${isActive(item.href) ? 'text-primary-brand' : 'text-gray-600'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="px-3 py-2 space-y-2">
                <div className="flex justify-center pb-2">
                  <SiteSearch onSelect={() => setIsMenuOpen(false)} />
                </div>
                <Button variant="default" size="sm" className="w-full" asChild>
                  <Link href="/inquiry?service=research&discovery=true" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;