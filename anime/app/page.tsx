'use client'
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Card } from './ui/card';
import { debounce } from 'lodash';

interface AnimeResult {
  id: string;
  title: string;
  image: string;
  releaseDate?: string;
  url?: string;
}

interface SearchResponse {
  currentPage: number;
  hasNextPage: boolean;
  results: AnimeResult[];
}

export default function Home() {
  const controller = new AbortController();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<AnimeResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const signal = controller.signal;


  const performSearch = async (query: string, page: number) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(`/api/search/${encodeURIComponent(query)}/${page}`,{
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data: SearchResponse = await response.json();
      
      if (page === 1) {
        setSearchResults(data.results);
      } else {
        setSearchResults(prev => [...prev, ...data.results]);
      }
      
      setHasNextPage(data.hasNextPage);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      if (page === 1) setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => performSearch(query, 1), 300)
    ,[]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery, 1);
  };

  const loadMoreResults = () => {
    if (!hasNextPage || isSearching) return;
    performSearch(searchQuery, currentPage + 1);
  };

  return (
    <div 
      className="min-h-screen bg-black p-48 text-white relative"
      style={{
        backgroundImage: "url('https://wallpapergod.com/images/hd/dark-anime-1920X1200-wallpaper-hap3kxf8czba91pc.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-center font-bold text-6xl mb-8">ANIME HUB</h1>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="flex justify-center w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  debouncedSearch(e.target.value);
                }}
                placeholder="Search for anime..."
                className="w-full md:w-96 px-4 py-2 rounded-l-lg border focus:outline-none bg-transparent border-white"
              />
              <button 
                type="submit"
                className="bg-white px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-100 transition-colors"
                disabled={isSearching}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197M16.804 15.804A7.5 7.5 0 1111.196 5.196a7.5 7.5 0 015.608 10.608z"
                  />
                </svg>
              </button>
            </div>
          </form>

          {isSearching && (
            <div className="text-center mb-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white" />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center mb-8">
              {error}
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="max-w-10xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Search Results</h2>
              {/* Modified grid container with improved spacing and positioning */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-24 relative">
                {searchResults.map((anime) => (
                  <div key={anime.id} className="relative" style={{ minHeight: '300px' }}>
                    <Card item={anime} />
                  </div>
                ))}
              </div>

              {hasNextPage && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMoreResults}
                    disabled={isSearching}
                    className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    {isSearching ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </div>
          )}

          {!searchResults.length && !isSearching && !error && (
            <>
              <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
                Find your favorite anime shows and movies. Immerse yourself in the world of captivating stories and stunning animation.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/home"
                  className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-black hover:text-white hover:border hover:border-white transition-all duration-300"
                >
                  Watch Anime
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}