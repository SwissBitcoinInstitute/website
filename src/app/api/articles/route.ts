import { NextResponse } from 'next/server';
import { getAllArticlesMeta } from '@/lib/content';

export async function GET() {
  try {
    // Return metadata only (no content) for listing pages
    const articles = await getAllArticlesMeta();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
