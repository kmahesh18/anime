"use client"

import { useState, useEffect } from 'react';
import { IAnimeResult } from '@consumet/extensions';
import Layout from './layout';
import Card from './card';
import { usePathname } from 'next/navigation';

type FetchFunction = () => Promise<void>;

const ROUTE_CONFIG = {
  '/movies': {
    title: 'Recent Anime Movies',
    endpoint: '/api/movies'
  },
  '/tv-series': {
    title: 'Anime Series',
    endpoint: '/api/tv-series'
  },
  '/most-popular': {
    title: 'Most Popular Anime',
    endpoint: '/api/most-popular'
  },
  '/top-airing': {
    title: 'Top Airing Anime',
    endpoint: '/api/top-airing'
  }
} as const;

export default function Carousel() {
  const [animeList, setAnimeList] = useState<IAnimeResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const fetchAnimeData = async (endpoint: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch anime data from ${endpoint}`);
      }
      
      const data = await response.json();
      setAnimeList(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching anime data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const config = ROUTE_CONFIG[pathname as keyof typeof ROUTE_CONFIG];
    if (config) {
      fetchAnimeData(config.endpoint);
    }
  }, [pathname]);

  const getTitle = () => {
    return ROUTE_CONFIG[pathname as keyof typeof ROUTE_CONFIG]?.title ?? 'Anime Collection';
  };


  return (
    <div className="flex bg-black pl-10 pr-6">
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          {getTitle()}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10">
          {animeList.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="flex-1 p-10">
        <Layout />
      </div>
    </div>
  );
}