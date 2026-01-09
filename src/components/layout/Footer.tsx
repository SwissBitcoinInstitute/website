"use client";

import Link from 'next/link';
import { Mail, Linkedin } from 'lucide-react';

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const footerNavigation = {
    company: [{
      name: 'About',
      href: '/about'
    }, {
      name: 'Team',
      href: '/team'
    }, {
      name: 'Contact',
      href: '/contact'
    }],
    services: [{
      name: 'Research',
      href: '/research'
    }, {
      name: 'Education',
      href: '/education'
    }, {
      name: 'Speaking',
      href: '/speaking'
    }],
    resources: [{
      name: 'Glossary',
      href: '/glossary'
    }, {
      name: 'Get Started',
      href: '/inquiry'
    }],
    legal: [{
      name: 'Privacy Policy',
      href: '/privacy'
    }, {
      name: 'Terms & Conditions',
      href: '/terms'
    }]
  };
  return (
    <footer className="bg-white border-t border-gray-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="swiss-grid py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <img 
                  src="/SBI-Logo.png" 
                  alt="Swiss Bitcoin Institute" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-gray-900 font-bold text-lg tracking-tight">
                  Swiss <span className="text-bitcoin-orange">Bitcoin</span> Institute
                </span>
            </div>
            </Link>
            
            {/* Tagline */}
            <p className="text-gray-600 text-base max-w-md">
              Switzerland's independent Bitcoin think tank. Evidence-based research and executive education for decision-makers.
            </p>
            
            {/* Contact */}
            <div className="space-y-4">
              <div>
                <h3 className="swiss-blue-gradient-text font-medium text-sm uppercase tracking-wider">Contact</h3>
                <div className="mt-3 space-y-2">
                  <a href="mailto:hello@bitcoininstitute.ch" className="text-gray-600 hover:text-[#00abfb] transition-colors flex items-center space-x-2 group">
                    <Mail className="h-4 w-4 group-hover:text-[#00abfb] transition-colors" />
                    <span className="group-hover:text-[#00abfb] transition-colors">hello@bitcoininstitute.ch</span>
                  </a>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/company/swiss-bitcoin-institute/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#00abfb] transition-colors" 
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://x.com/SwissBTCInst" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 transition-colors" 
                  aria-label="X (formerly Twitter)"
                >
                  <XIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 xl:mt-0 xl:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Company */}
              <div>
                <h3 className="swiss-blue-gradient-text font-medium text-sm uppercase tracking-wider">INSTITUTE</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.company.map(item => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-gray-600 hover:swiss-blue-gradient-text transition-colors text-sm">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Services */}
              <div>
                <h3 className="swiss-blue-gradient-text font-medium text-sm uppercase tracking-wider">
                  Services
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.services.map(item => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-gray-600 hover:swiss-blue-gradient-text transition-colors text-sm">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Resources */}
              <div>
                <h3 className="swiss-blue-gradient-text font-medium text-sm uppercase tracking-wider">
                  Resources
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.resources.map(item => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-gray-600 hover:swiss-blue-gradient-text transition-colors text-sm">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
              
              {/* Legal */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-6">
                  {footerNavigation.legal.map(item => (
                  <Link key={item.name} href={item.href} className="text-gray-500 hover:swiss-blue-gradient-text transition-colors text-sm">
                        {item.name}
                      </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            © 2026 Swiss Bitcoin Institute. All Rights Reserved.
          </p>
                </div>
      </div>
    </footer>
  );
};

export default Footer;