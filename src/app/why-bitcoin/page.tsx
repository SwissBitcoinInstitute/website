import type { Metadata } from 'next'
import WhyBitcoinClient from './WhyBitcoinClient'

export const metadata: Metadata = {
  title: 'Why Bitcoin | Swiss Bitcoin Institute',
  description: 'Understanding Bitcoin\'s unique properties: no issuer, proof-of-work security, absolute scarcity, network effects, decentralization, and institutional backing.',
  openGraph: {
    title: 'Why Bitcoin | Swiss Bitcoin Institute',
    description: 'Discover the fundamental properties that make Bitcoin unique: no central issuer, energy-backed security, absolute scarcity, and unmatched network effects.',
    images: ['/sbi-logos/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Bitcoin | Swiss Bitcoin Institute',
    description: 'Understanding Bitcoin\'s unique properties and why it matters.',
    images: ['/sbi-logos/opengraph-image.png'],
  },
}

export default function WhyBitcoinPage() {
  return <WhyBitcoinClient />
}
