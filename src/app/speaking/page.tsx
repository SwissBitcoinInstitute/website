import type { Metadata } from 'next';
import SpeakingClient from './SpeakingClient';

export const metadata: Metadata = {
  title: 'Strategic Speaking | Swiss Bitcoin Institute',
  description: 'Expert keynotes and strategic briefings for businesses, governments, and organizations navigating Bitcoin adoption. Research-based presentations from ETH Zürich, Swiss Bitcoin Conference, and Bitcoin Alps.',
  openGraph: {
    title: 'Strategic Speaking—Swiss Bitcoin Institute',
    description: 'Expert keynotes and strategic briefings for businesses, governments, and organizations navigating Bitcoin adoption. Featuring talks from ETH Zürich, Swiss Bitcoin Conference, and Bitcoin Alps.',
    images: ['/sbi-logos/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strategic Speaking—Swiss Bitcoin Institute',
    description: 'Expert keynotes and strategic briefings for businesses, governments, and organizations navigating Bitcoin adoption.',
    images: ['/sbi-logos/opengraph-image.png'],
  },
  alternates: {
    canonical: 'https://bitcoininstitute.ch/speaking',
  },
};

export default function StrategicSpeakingPage() {
  return <SpeakingClient />;
}

