import type { Metadata } from 'next'
import Domains from '@/pages/Domains'

export const metadata: Metadata = {
  title: 'Research Domains | Swiss Bitcoin Institute',
  description: 'Six interconnected research domains that capture Bitcoin\'s full strategic significance for Switzerland\'s leadership in the global monetary system: Markets & Geopolitics, Finance & Economics, Technology & Innovation, Energy & Climate, Access & Agency, and Strategy & Policy.',
  openGraph: {
    title: 'Research Domains | Swiss Bitcoin Institute',
    description: 'Explore six interconnected research domains covering Bitcoin\'s strategic significance for Switzerland and the global monetary system.',
    images: ['/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research Domains | Swiss Bitcoin Institute',
    description: 'Six research domains covering Bitcoin\'s strategic significance for Switzerland.',
    images: ['/opengraph-image.png'],
  },
}

export default function DomainsPage() {
  return <Domains />
}

