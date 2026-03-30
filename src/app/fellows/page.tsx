import type { Metadata } from 'next';
import FellowshipClient from './FellowshipClient';

export const metadata: Metadata = {
  title: 'Fellowship | Swiss Bitcoin Institute',
  description: 'Join Switzerland\'s leading network of Bitcoin experts shaping the future of money. The SBI Fellowship brings together independent researchers and practitioners across six critical domains.',
  openGraph: {
    title: 'Fellowship | Swiss Bitcoin Institute',
    description: 'Join Switzerland\'s leading network of Bitcoin experts shaping the future of money.',
    images: ['/sbi-logos/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fellowship | Swiss Bitcoin Institute',
    description: 'Join Switzerland\'s leading network of Bitcoin experts shaping the future of money.',
    images: ['/sbi-logos/opengraph-image.png'],
  },
};

export default function FellowsPage() {
  return <FellowshipClient />;
}
