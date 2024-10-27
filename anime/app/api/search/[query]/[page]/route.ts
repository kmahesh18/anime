// File: /app/api/top-airing/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Gogoanime from '@consumet/extensions/dist/providers/anime/gogoanime';

export async function GET(request:NextRequest,{params}:{params:{query:string,page:number}}) {
  try {
    const gogoanime=new Gogoanime();

    // const searchParams = request.nextUrl.searchParams;
    // const epid = searchParams.get('epid');
    const searchparam=params.query;
    const page=params.page||1;

    const search = await gogoanime.search(searchparam,page);
    return NextResponse.json(search);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch ep source' },
      { status: 500 }
    );
  }
}

