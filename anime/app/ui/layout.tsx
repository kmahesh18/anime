import { IAnimeResult } from '@consumet/extensions';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function Layout() {
    const [topList, setTopList] = useState<IAnimeResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const topCast = async () => {
        try {
          const response = await fetch('/api/topCast');
          if (!response.ok) {
            throw new Error('Failed to fetch most popular anime');
          }
          const data = await response.json();
          console.log(data)
          setTopList(data.results);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          console.error('Error fetching most popular anime:', err);
        } finally {
          setLoading(false);
        }
      };
      useEffect(()=>{
        topCast();
      },[])
      if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
      }
    
      if (error) {
        return <div className="p-4 text-center text-red-500">Error: {error}</div>;
      }
  return (
    <div>
        <h2 className='font-bold text-2xl p-3 text-white'>Top Cast</h2>
        <div className='border-l-2'>
        <div className="m-3 grid grid-cols-1 gap-10">
          {topList.map((item) => (
            <div
              key={item.id}
              className="flex group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
                <h1></h1>
              <div className="">
                <img
                  src={item.image || "/api/placeholder/300/450"}
                  alt={item.title || item.romaji || item.english || item.userPreferred || item.native}
                  className="w-20 h-20 transform transition-transform duration-300"
                />
              </div>
              
              <div className="flex-1 bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2">
                    {item.title || item.romaji || item.english || item.userPreferred || item.native}
                  </h3>
              </div>
            </div>
          ))}
        </div>
        </div>
    </div>
  )
}

export default Layout
