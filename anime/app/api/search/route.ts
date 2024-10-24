// File: /app/api/search/route.ts
import { NextResponse } from 'next/server';
import Zoro from '@consumet/extensions/dist/providers/anime/zoro';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get search parameters from URL
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const page = parseInt(searchParams.get('page') || '1');

    // Validate query parameter
    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Validate page parameter
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: 'Invalid page number' },
        { status: 400 }
      );
    }

    const zoro = new Zoro();
    const searchResults = await zoro.search(query, page);
    
    return NextResponse.json(searchResults);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}