export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Swiss Bitcoin Institute',
    alternateName: 'SBI',
    url: 'https://bitcoininstitute.ch',
    logo: 'https://bitcoininstitute.ch/sbi-logos/SBI-Logo.png',
    description: 'Independent Bitcoin research and analysis for Switzerland, combining academic rigor with practical expertise to guide the nation\'s monetary evolution.',
    foundingDate: '2025',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CH',
      },
    },
    sameAs: [
      'https://twitter.com/swissbitcoin',
      'https://linkedin.com/company/swiss-bitcoin-institute',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@bitcoininstitute.ch',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Switzerland',
    },
    knowsAbout: [
      'Bitcoin',
      'Cryptocurrency',
      'Blockchain Technology',
      'Monetary Policy',
      'Digital Currency',
      'Financial Technology',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

