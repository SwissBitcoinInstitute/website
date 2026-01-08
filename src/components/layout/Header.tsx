"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SiteSearch } from '@/components/search/SiteSearch';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  // Close dropdown when clicking outside
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
    { name: 'Education', href: '/education' },
    { name: 'Research', href: '/research' },
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
    <header className="sticky top-0 z-50 bg-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 border-b border-gray-200/60 shadow-sm">
      <nav className="swiss-grid" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <img 
                  src="/SBI-Logo.png" 
                  alt="Swiss Bitcoin Institute" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-gray-900 font-bold text-xl tracking-tight">
                  Swiss <span className="text-bitcoin-orange">Bitcoin</span> Institute
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  'dropdown' in item ? (
                    <div key={item.name} className="relative dropdown-container">
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === item.name ? null : item.name)}
                        className={`flex items-center text-sm font-semibold transition-colors hover:text-primary-brand ${
                          isActive(item.href) || item.dropdown?.some(sub => isActive(sub.href)) ? 'text-primary-brand' : 'text-gray-600'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      {dropdownOpen === item.name && item.dropdown && (
                        <div className="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm hover:bg-gray-50 ${
                                isActive(subItem.href) ? 'text-primary-brand' : 'text-gray-600'
                              }`}
                              onClick={() => setDropdownOpen(null)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-sm font-semibold transition-colors hover:text-primary-brand ${
                        isActive(item.href) ? 'text-primary-brand' : 'text-gray-600'
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
            <Button variant="outline" size="sm" asChild>
              <Link href="/inquiry">Get Started</Link>
            </Button>
            <Button variant="default" size="sm" asChild className="swiss-blue-gradient swiss-blue-gradient-hover text-white">
              <Link href="/contact">Contact</Link>
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
                        <div className={`block px-3 py-2 text-base font-semibold ${
                          isActive(item.href) || item.dropdown?.some(sub => isActive(sub.href)) ? 'text-primary-brand' : 'text-gray-600'
                        }`}>
                          {item.name}
                        </div>
                        <div className="pl-6 space-y-1">
                          {item.dropdown?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-3 py-2 text-sm transition-colors hover:text-primary-brand ${
                                isActive(subItem.href) ? 'text-primary-brand' : 'text-gray-600'
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
                        className={`block px-3 py-2 text-base font-semibold transition-colors hover:text-primary-brand ${
                          isActive(item.href) ? 'text-primary-brand' : 'text-gray-600'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  ))}
              <div className="px-3 py-2 space-y-2">
                <div className="flex justify-center pb-2">
                  <SiteSearch />
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/inquiry">Get Started</Link>
                </Button>
                <Button variant="default" size="sm" className="w-full swiss-blue-gradient swiss-blue-gradient-hover text-white" asChild>
                  <Link href="/contact">Contact</Link>
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