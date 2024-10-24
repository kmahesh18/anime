// File: /app/api/top-airing/route.ts
import { NextResponse } from 'next/server';
import Zoro from '@consumet/extensions/dist/providers/anime/zoro'; // Adjust the import path based on where you place the Zoro class

export async function GET() {
  try {
    const zoro = new Zoro();
    const Movies = await zoro.fetchSpecial();
    return NextResponse.json(Movies);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch anime movies' },
      { status: 500 }
    );
  }
}

