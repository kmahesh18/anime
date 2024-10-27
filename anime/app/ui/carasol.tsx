"use client";

import { useState, useEffect } from "react";
import { IAnimeResult } from "@consumet/extensions";
import { Card } from "./card";
import { usePathname } from "next/navigation";
import next from "@/public/assets/next.png";
import previous from '@/public/assets/previous.png';
import Image from "next/image";



export default function Carousel() {
  const controller = new AbortController();
  const [animeList, setAnimeList] = useState<IAnimeResult[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const signal = controller.signal;

//ROUTE CONFIG
const ROUTE_CONFIG = {
  "/movies": {
    title: "Recent Anime Movies",
    endpoint: `/api/movies/${currentPage}`,
  },
  "/anime-list": {
    title: "List of Anime",
    endpoint: "/api/anime-list",
  },
  "/most-popular": {
    title: "Most Popular Anime",
    endpoint: "/api/most-popular",
  },
  "/top-airing": {
    title: "Top Airing Anime",
    endpoint: "/api/top-airing/",
  },
  "/genre":{
    title:"Explore various genre of anime",
    endpoint:"/api/genre"
  }
} as const;

const MAX_PAGE_NUMBERS_TO_SHOW = 6;

  const fetchAnimeData = async (endpoint: string, page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from the dynamic page endpoint
      const response = await fetch(`${endpoint}/${page}`, { signal });
      if (!response.ok) {
        throw new Error(`Failed to fetch anime data from ${endpoint}`);
      }

      const data = await response.json();
      setAnimeList(data.results);
      setTotalPages(data.totalPages); // Ensure the total number of pages is being set
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const config = ROUTE_CONFIG[pathname as keyof typeof ROUTE_CONFIG];
    if (config) {
      fetchAnimeData(config.endpoint, currentPage); // Pass currentPage to fetch data for that page
    }
  }, [pathname, currentPage]); // Update the data when either pathname or currentPage changes

  const getTitle = () => {
    return ROUTE_CONFIG[pathname as keyof typeof ROUTE_CONFIG]?.title ?? "Anime Collection";
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page); // Update the current page when a button is clicked
    }
  };

  const getPageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_NUMBERS_TO_SHOW / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGE_NUMBERS_TO_SHOW - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  function toanimepage() {
    controller.abort();
  }

  return (
    <div className="bg-black pl-10 pr-6">
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          {getTitle()}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {animeList.map((item, ind) => (
            <div key={ind} onClick={toanimepage}>
              <Card key={ind} item={item} />
            </div>
          ))}
        </div>

        {loading && <div className="text-white text-center">Loading...</div>}
        {error && <div className="text-red-500 text-center">Error: {error}</div>}

        {/* Render pagination with Previous, page numbers, and Next */}
        <div className="flex justify-center mt-8 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 bg-white text-black rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <Image src={previous} className="rounded-full" alt="previous" height={40} width={40} />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-full ${
                currentPage === page
                  ? "bg-amber-400 text-black font-bold"
                  : "bg-white text-black"
              } hover:bg-gray-100 dark:hover:bg-amber-300`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-white text-black w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <Image src={next} className="rounded-full" alt="next" height={40} width={40} />
          </button>
        </div>
      </div>
    </div>
  );
}
