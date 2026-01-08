import { NextResponse } from 'next/server';
import { getAllGlossaryTerms } from '@/lib/content';

export async function GET() {
  try {
    const terms = await getAllGlossaryTerms();
    
    // Return simplified data for client-side use
    const simplifiedTerms = terms.map(term => ({
      term: term.term,
      slug: term.slug,
      shortDefinition: term.shortDefinition,
      category: term.category,
      domains: term.domains || [],
      relatedArticle: term.relatedArticle || undefined,
    }));
    
    return NextResponse.json(simplifiedTerms);
  } catch (error) {
    console.error('Error fetching glossary terms:', error);
    return NextResponse.json({ error: 'Failed to fetch glossary terms' }, { status: 500 });
  }
}
