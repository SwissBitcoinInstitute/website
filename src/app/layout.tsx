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
import CookieBanner from '@/components/sections/CookieBanner'

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
  openGraph: {
    title: 'SBI - Strategic Bitcoin Intelligence',
    description: 'Strategic Bitcoin Intelligence for business leaders and executives',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SBI - Strategic Bitcoin Intelligence',
    description: 'Strategic Bitcoin Intelligence for business leaders and executives',
    images: ['/opengraph-image.png'],
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
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <NewsletterPopup />
          <CookieBanner />
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  )
}
