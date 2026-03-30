import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bitcoin in 21 Minutes | Swiss Bitcoin Institute',
  description: 'One strategic insight – clear enough to help you decide whether Bitcoin matters for your job. Free 21-minute webinars on Bitcoin topics with strategic relevance for business and society.',
  openGraph: {
    title: 'Bitcoin in 21 Minutes | Swiss Bitcoin Institute',
    description: 'Free 21-minute webinars on Bitcoin topics with strategic relevance for business and society.',
    images: ['/sbi-logos/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin in 21 Minutes | Swiss Bitcoin Institute',
    description: 'Free 21-minute webinars on Bitcoin topics with strategic relevance for business and society.',
    images: ['/sbi-logos/opengraph-image.png'],
  },
}

export default function WebinarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

