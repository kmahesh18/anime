"use client"
import { useState, useEffect } from 'react';
import { IAnimeResult } from '@consumet/extensions';
import Layout from './layout';
export default function Carousel() {
  const [animeList, setAnimeList] = useState<IAnimeResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopAiringAnime = async () => {
      try {
        const response = await fetch('/api/top-airing');
        if (!response.ok) {
          throw new Error('Failed to fetch top-airing anime');
        }
        const data = await response.json();
        console.log(data)
        setAnimeList(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching top-airing anime:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAiringAnime();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex bg-black pl-10 pr-6">
      <div className='p-10'>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Top Airing Anime
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10">
        {animeList.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                src={item.image || "/api/placeholder/300/450"}
                alt={item.title || item.romaji || item.english || item.userPreferred || item.native}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2">
                  {item.title || item.romaji || item.english || item.userPreferred || item.native}
                </h3>

              </div>
          </div>
        ))}
      </div>
      </div>
      <div className=' flex-1 p-10'>
        <Layout/>
      </div>
    </div>
  );
}