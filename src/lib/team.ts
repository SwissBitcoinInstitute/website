// Team member data structure
export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  nostr?: string;
  bluesky?: string;
  category: 'core' | 'fellow';
  tags?: string[];
}

export const teamMembers: TeamMember[] = [
  // Core Team
  {
    slug: 'marcus-dapp',
    name: 'Dr. Marcus M. Dapp',
    role: 'Founder',
    bio: 'Marcus brings over a decade of experience in research and teaching—both in academia and within \'Crypto Valley\'—with a focus on Bitcoin, crypto, and monetary systems, exploring their economic, political, social, and ecological dimensions.',
    photo: '/sbi-core-team/Marcus_Dapp-SBI.png',
    email: 'marcus.dapp@bitcoininstitute.ch',
    linkedin: 'https://www.linkedin.com/in/marcusmdapp',
    twitter: 'https://x.com/DCentSociety',
    category: 'core',
  },
  {
    slug: 'luca-ferrarese',
    name: 'Dr. Luca Ferrarese',
    role: 'Research',
    bio: 'My background is in science, but a strong desire to understand Bitcoin led me on an intense, self-directed journey into the history of money, finance and macroeconomics. This exploration into new disciplines inspired me to share my findings through articles, presentations and podcasts. Applying the analytical lens of a molecular biologist gives me a unique perspective on these complex topics and the systemic changes Bitcoin is introducing.',
    photo: '/sbi-core-team/Luca_Ferrarese-SBI.png',
    email: 'luca.ferrarese@bitcoininstitute.ch',
    linkedin: 'https://www.linkedin.com/in/lucaferrarese/',
    category: 'core',
  },
  {
    slug: 'stefan-briggs',
    name: 'Stefan Briggs',
    role: 'Program',
    bio: 'Stefan brings product management experience from a fintech startup in Zurich together with a passion for Bitcoin\'s cultural and historical roots. He explores how value and trust were preserved through decentralized, memory-based systems long before fiat, framing Bitcoin as the modern continuation of these traditions.',
    photo: '/sbi-core-team/Stefan-Briggs-SBI.png',
    email: 'stefan.briggs@bitcoininstitute.ch',
    linkedin: 'https://www.linkedin.com/in/stefanbriggs/',
    category: 'core',
  },
  {
    slug: 'daniel-babbev',
    name: 'Daniel Babbev',
    role: 'Platform',
    bio: 'Daniel brings a decade of experience in building full-stack crypto systems. His background is rooted in hands-on experience at regulated companies like Bitcoin Suisse and Brevan Howard and as an entrepreneur at various bitcoin startups.',
    photo: '/sbi-core-team/Daniel-Babbev-SBI.png',
    email: 'daniel.babbev@bitcoininstitute.ch',
    linkedin: 'https://www.linkedin.com/in/danielbabbev/',
    category: 'core',
  },
  {
    slug: 'henry-barrows',
    name: 'Henry Barrows',
    role: 'Marketing',
    bio: 'Henry Barrows is a self-employed marketer with an MSc in Blockchain and Digital Currency. He helps organizations communicate complex crypto concepts with clarity—bridging strategy, brand, and education. Henry\'s work spans digital marketing, positioning, and go‑to‑market for Bitcoin-first products and services, informed by hands-on experience and a research-driven approach.',
    photo: '/sbi-core-team/Henry-Barrows-SBI.png',
    email: 'henry.barrows@bitcoininstitute.ch',
    linkedin: 'https://www.linkedin.com/in/henrybarrows/',
    category: 'core',
  },
  
  // Research Fellows
  {
    slug: 'christian-decker',
    name: 'Dr. Christian Decker',
    role: 'Research Fellow',
    bio: 'Christian stumbled across an interesting whitepaper in 2009, and hasn\'t had a boring minute since.',
    photo: '/team/christian-decker.png',
    twitter: 'https://x.com/Snyke',
    github: 'https://github.com/cdecker',
    category: 'fellow',
    tags: ['Protocol', 'Research'],
  },
  {
    slug: 'harald-rauter',
    name: 'Dr. Harald Rauter',
    role: 'Research Fellow',
    bio: 'Harald focuses on the intersection of Bitcoin mining, grid stability, and energy markets, frequently sharing his insights across media platforms. As a keynote speaker, he brings a multidisciplinary perspective shaped by his background in finance, policy, and energy. His work bridges Bitcoin-native innovation with institutional frameworks and infrastructure realities.',
    photo: '/team/harald-rauter.png',
    linkedin: 'https://www.linkedin.com/in/haraldrauter/',
    twitter: 'https://x.com/HaraldRauter',
    category: 'fellow',
    tags: ['Energy', 'Policy', 'Markets'],
  },
  {
    slug: 'yves-bennaim',
    name: 'Yves Bennaïm',
    role: 'Research Fellow',
    bio: 'Yves is the founder of 2B4CH, a nonprofit think tank focused on analyzing the socioeconomic impact of Bitcoin. He chairs the Swiss delegation to the ISO committee on blockchain standardization and leads the federal popular initiative to enshrine Bitcoin in the Swiss Constitution.',
    photo: '/team/yves-bennaim.png',
    linkedin: 'https://linkedin.com/in/yvesbennaim',
    twitter: 'https://twitter.com/zlok',
    category: 'fellow',
    tags: ['Standards', 'Policy'],
  },
  {
    slug: 'yves-andre-graf',
    name: 'Yves-André Graf',
    role: 'Research Fellow',
    bio: 'Yves combines over ten years of experience in both traditional banking and the crypto space. As a committed Bitcoin maximalist for more than six years, he has developed a deep expertise in Bitcoin Treasury Strategy—now the central pillar of his strategic work.',
    photo: '/team/yves-andre-graf.png',
    linkedin: '#',
    category: 'fellow',
    tags: ['Treasury', 'Banking'],
  },
  {
    slug: 'markus-perdrizat',
    name: 'Markus Perdrizat',
    role: 'Research Fellow',
    bio: 'Markus has been building Bitcoin financial markets infrastructure since 2016. Now as independent product and security advisor; previously he was CPO Bitcoin Suisse, CEO Swiss Crypto Vault and Head PwC Blockchain Competence Center.',
    photo: '/team/markus-perdrizat.png',
    linkedin: 'http://linkedin.com/in/perdrizat',
    category: 'fellow',
    tags: ['Infra', 'Security'],
  },
  {
    slug: 'olaf-wagner',
    name: 'Dr. Olaf Wagner',
    role: 'Research Fellow',
    bio: 'Olaf explores how an open, neutral, and censorship-resistant alternative to the banking system can advance societal progress and sustainability. With a background in natural sciences, sustainability, and international development, he brings a multidisciplinary perspective as a speaker and writer, translating Bitcoin\'s unique properties into tools for social impact.',
    photo: '/team/Olaf_Wagner_2025.jpeg',
    linkedin: 'https://www.linkedin.com/in/olaf-wagner-b78335a2/',
    twitter: 'https://x.com/weezel21?s=21&t=YaVfajjMg__2Zuz6Tivjug',
    nostr: 'https://damus.io/npub16uqhv2xpgmn2w9gmg00dvs28x9pd79wzcdnqcmfjjtpym35qymmq3cv8yd',
    bluesky: 'https://bsky.app/profile/weezel.bsky.social',
    category: 'fellow',
    tags: ['Sustainability', 'Social Impact', 'Development'],
  },
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find(member => member.slug === slug);
}

export function getAllTeamMembers(): TeamMember[] {
  return teamMembers;
}

export function getCoreTeam(): TeamMember[] {
  return teamMembers.filter(member => member.category === 'core');
}

export function getResearchFellows(): TeamMember[] {
  return teamMembers.filter(member => member.category === 'fellow');
}

