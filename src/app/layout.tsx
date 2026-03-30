import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Providers } from './providers'
import OrganizationSchema from '@/components/schema/OrganizationSchema'
import NewsletterPopup from '@/components/sections/NewsletterPopup'
import NextEventPopup from '@/components/sections/NextEventPopup'
import CookieBanner from '@/components/sections/CookieBanner'
import UmamiAnalytics from '@/components/analytics/UmamiAnalytics'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bitcoininstitute.ch'),
  title: 'SBI - Strategic Bitcoin Intelligence',
  description: 'Strategic Bitcoin Intelligence for business leaders and executives',
  icons: {
    icon: '/sbi-logos/favicon.ico?v=3',
    shortcut: '/sbi-logos/Logo-opengraph-square.png?v=3',
    apple: '/sbi-logos/Logo-opengraph-square.png?v=3',
  },
  openGraph: {
    title: 'SBI - Strategic Bitcoin Intelligence',
    description: 'Strategic Bitcoin Intelligence for business leaders and executives',
    images: [
      {
        url: '/sbi-logos/opengraph-image.png?v=3',
        width: 1200,
        height: 630,
        alt: 'SBI - Strategic Bitcoin Intelligence',
      },
      {
        url: '/sbi-logos/Logo-opengraph-square.png?v=3',
        width: 1200,
        height: 1200,
        alt: 'SBI Logo Square',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'SBI - Strategic Bitcoin Intelligence',
    description: 'Strategic Bitcoin Intelligence for business leaders and executives',
    images: ['/sbi-logos/Logo-opengraph-square.png?v=3'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* MailerLite Universal Script */}
        <Script
          id="mailerlite-universal"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
              .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
              n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
              (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
              ml('account', '1685688');
            `
          }}
        />
      </head>
      <body className={`${openSans.variable} font-sans`}>
        <OrganizationSchema />
        <Providers>
          <NextEventPopup />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <NewsletterPopup />
          <CookieBanner />
          <UmamiAnalytics />
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  )
}
