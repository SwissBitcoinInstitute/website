import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bitcoin Glossary | Swiss Bitcoin Institute',
  description: 'Comprehensive glossary of Bitcoin terms, concepts, and technical definitions. Essential vocabulary for understanding Bitcoin and the digital asset ecosystem.',
  openGraph: {
    title: 'Bitcoin Glossary | Swiss Bitcoin Institute',
    description: 'Comprehensive glossary of Bitcoin terms, concepts, and technical definitions.',
    images: ['/sbi-logos/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Glossary | Swiss Bitcoin Institute',
    description: 'Comprehensive glossary of Bitcoin terms, concepts, and technical definitions.',
    images: ['/sbi-logos/opengraph-image.png'],
  },
}

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

