import { Article, Author } from '@/lib/content'

interface ArticleSchemaProps {
  article: Article
  author?: Author
}

export default function ArticleSchema({ article, author }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: author ? {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      affiliation: {
        '@type': 'Organization',
        name: 'Swiss Bitcoin Institute',
      },
    } : {
      '@type': 'Organization',
      name: 'Swiss Bitcoin Institute',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Swiss Bitcoin Institute',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bitcoininstitute.ch/SBI-Logo-Landscape.png',
      },
    },
    keywords: article.tags.join(', '),
    articleSection: 'Bitcoin Intelligence',
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bitcoininstitute.ch/research/${article.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

