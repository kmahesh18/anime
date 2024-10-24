// File: /app/api/search/route.ts
import { NextResponse } from 'next/server';
import Zoro from '@consumet/extensions/dist/providers/anime/zoro';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get search parameters from URL
    const searchParams = request.nextUrl.searchParams;
    const genre = searchParams.get('genre');
    const page = parseInt(searchParams.get('page') || '1');

    // Validate query parameter
    if (!genre) {
      return NextResponse.json(
        { error: 'Search genre is required' },
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
    const genreSearchResults = await zoro.genreSearch(genre, page);
    
    return NextResponse.json(genreSearchResults);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}