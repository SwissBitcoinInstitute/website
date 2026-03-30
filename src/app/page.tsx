import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Swiss Bitcoin Institute | Strategic Bitcoin Intelligence',
  description: 'Strategic Bitcoin Intelligence for business leaders and executives. Independent research, executive education, and strategic guidance from Switzerland\'s leading Bitcoin think tank.',
  openGraph: {
    title: 'Swiss Bitcoin Institute | Strategic Bitcoin Intelligence',
    description: 'Strategic Bitcoin Intelligence for business leaders and executives. Independent research, executive education, and strategic guidance from Switzerland\'s leading Bitcoin think tank.',
    images: ['/sbi-logos/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swiss Bitcoin Institute | Strategic Bitcoin Intelligence',
    description: 'Strategic Bitcoin Intelligence for business leaders and executives.',
    images: ['/sbi-logos/opengraph-image.png'],
  },
}

export default function Page() {
  return <HomeClient />
}
