// File: /app/api/top-airing/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Zoro from '@consumet/extensions/dist/providers/anime/zoro'; // Adjust the import path based on where you place the Zoro class

export async function GET(request:NextRequest) {
  try {
    const zoro = new Zoro();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');

    // Validate page parameter
    if (isNaN(page) || page < 1) {
        return NextResponse.json(
            { error: 'Invalid page number' },
            { status: 400 }
        );
        }
        const topUpcoming = await zoro.fetchTopUpcoming(page);
    return NextResponse.json(topUpcoming);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch anime movies' },
      { status: 500 }
    );
  }
}

