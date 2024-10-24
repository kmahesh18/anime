import { NextResponse } from 'next/server';
import Zoro from '@consumet/extensions/dist/providers/anime/zoro';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Anime ID is required' },
        { status: 400 }
      );
    }

    const zoro = new Zoro();
    const animeInfo = await zoro.fetchAnimeInfo(id);
    return NextResponse.json(animeInfo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch anime details' },
      { status: 500 }
    );
  }
}