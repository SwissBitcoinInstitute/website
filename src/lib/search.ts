import { getAllArticles, getAllGlossaryTerms, type Article } from './content';

export type SearchCategory = 'Page' | 'Article' | 'Glossary';

export interface SearchItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  category: SearchCategory;
  tags?: string[];
}

const STATIC_PAGES: SearchItem[] = [
  { id: 'home', title: 'Home', description: 'Swiss Bitcoin Institute homepage', url: '/', category: 'Page' },
  { id: 'about', title: 'About Us', description: 'Our mission, principles, and role', url: '/about', category: 'Page' },
  { id: 'team', title: 'Team', description: 'Core team and research fellows', url: '/team', category: 'Page' },
  { id: 'research', title: 'Research', description: 'Bitcoin research and analysis', url: '/research', category: 'Page' },
  { id: 'education', title: 'Education', description: 'Executive education programs, Bitcoin courses, webinar, financial sovereignty training', url: '/education', category: 'Page' },
  { id: 'webinar', title: 'Bitcoin Webinar', description: 'Free 21-minute Bitcoin webinar. One strategic insight to help you decide whether Bitcoin matters for your job. Live webinar with Q&A.', url: '/webinar', category: 'Page', tags: ['webinar', 'bitcoin webinar', 'free', 'education', 'course'] },
  { id: 'bitcoin-for-executives', title: 'Bitcoin for Executives', description: 'Strategic Bitcoin course for executives and decision-makers. 4 afternoons covering Bitcoin\'s strategic implications for business, policy, and society. Live course in Zürich.', url: '/education/bitcoin-for-executives', category: 'Page', tags: ['course', 'executives', 'education', 'bitcoin course', 'zurich'] },
  { id: 'financial-sovereignty', title: 'Financial Sovereignty', description: 'Half-day hands-on Bitcoin course for holders. Learn to securely control your Bitcoin through hardware wallets, seed phrase management, and secure backup strategies. Live course in Zürich.', url: '/education/financial-sovereignty', category: 'Page', tags: ['course', 'financial sovereignty', 'hardware wallet', 'education', 'zurich'] },
  { id: 'speaking', title: 'Strategic Speaking', description: 'Keynotes and presentations', url: '/speaking', category: 'Page' },
  { id: 'contact', title: 'Contact', description: 'Get in touch with us', url: '/contact', category: 'Page' },
  { id: 'inquiry', title: 'Get Started', description: 'Start your journey with SBI. Request a course, webinar, or consultation.', url: '/inquiry', category: 'Page', tags: ['inquiry', 'contact', 'course request', 'webinar'] },
  { id: 'why-bitcoin', title: 'Why Bitcoin', description: 'Understanding Bitcoin\'s unique properties and fundamental advantages', url: '/why-bitcoin', category: 'Page' },
  { id: 'fellows', title: 'Fellowship', description: 'Join Switzerland\'s leading network of Bitcoin experts', url: '/fellows', category: 'Page' },
  { id: 'glossary', title: 'Glossary', description: 'Bitcoin glossary and terminology definitions', url: '/glossary', category: 'Page' },
  { id: 'domains', title: 'Research Domains', description: 'Six research domains: Markets & Geopolitics, Finance & Economics, Technology & Innovation, Energy & Climate, Access & Agency, Strategy & Policy', url: '/domains', category: 'Page' },
];

export async function getSearchIndex(): Promise<SearchItem[]> {
  try {
    const [articles, glossaryTerms] = await Promise.all([
      getAllArticles(),
      getAllGlossaryTerms()
    ]);

    const articleItems: SearchItem[] = articles.map((article: Article) => ({
      id: `article-${article.id}`,
      title: article.title,
      description: article.excerpt,
      url: `/research/${article.slug}`,
      category: 'Article',
      tags: article.tags
    }));

    const glossaryItems: SearchItem[] = glossaryTerms.map((term) => ({
      id: `glossary-${term.slug}`,
      title: term.term,
      description: term.shortDefinition,
      url: `/glossary/${term.slug}`,
      category: 'Glossary',
      tags: [term.category]
    }));

    return [...STATIC_PAGES, ...articleItems, ...glossaryItems];
  } catch (error) {
    console.error('Error building search index:', error);
    return STATIC_PAGES;
  }
}

