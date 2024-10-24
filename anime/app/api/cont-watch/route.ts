import { NextResponse } from 'next/server';
import Zoro from '@consumet/extensions/dist/providers/anime/zoro';

export async function GET(
  request: Request,
  { params }: { params: { connectSid: string } }
) {
  try {
    const connectSid = params.connectSid;
    
    if (!connectSid) {
      return NextResponse.json(
        { error: 'Anime ID is required' },
        { status: 400 }
      );
    }

    const zoro = new Zoro();
    const continueWatching = await zoro.fetchContinueWatching(connectSid);
    return NextResponse.json(continueWatching);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch anime details' },
      { status: 500 }
    );
  }
}