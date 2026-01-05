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
        {/* Hidden static forms for Netlify form detection at build time */}
        <div style={{ display: 'none' }} suppressHydrationWarning>
          <form name="webinar-registration" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="webinar-registration" />
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="tel" name="phone" />
            <input type="text" name="timeSlot" />
            <input type="text" name="bot-field" />
          </form>
          <form name="course-signup-bitcoin-executives" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="course-signup-bitcoin-executives" />
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="tel" name="phone" />
            <input type="text" name="organization" />
            <textarea name="message"></textarea>
            <input type="text" name="bot-field" />
          </form>
          <form name="course-signup-financial-sovereignty" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="course-signup-financial-sovereignty" />
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="tel" name="phone" />
            <input type="text" name="organization" />
            <textarea name="message"></textarea>
            <input type="text" name="bot-field" />
          </form>
          <form name="lead-intake" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="lead-intake" />
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="tel" name="phone" />
            <input type="text" name="organization" />
            <input type="text" name="title" />
            <input type="text" name="serviceType" />
            <textarea name="message"></textarea>
            <input type="text" name="bot-field" />
          </form>
          <form name="newsletter-popup" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="newsletter-popup" />
            <input type="email" name="email" />
            <input type="text" name="bot-field" />
          </form>
        </div>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <NewsletterPopup />
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  )
}
