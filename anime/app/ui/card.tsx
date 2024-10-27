"use client";
import Image from "next/image";
import axios from "axios";
import useStore from "../useStore";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  IAnimeInfo,
  AnimeCardData,
} from "@consumet/extensions/dist/models/types";
import Minilabel from "./minilabels";

export const Card: React.FC<{ item: AnimeCardData }> = ({
  item,
}: AnimeCardData) => {
  const [animeInfo, setAnimeInfo] = useState<IAnimeInfo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAnimeInfo(id: string) {
    try {
      const response = await axios.get(`/api/anime-info/${id}`);
      return response;
    } catch (error) {
      console.error("Error fetching anime info:", error);
      return null;
    }
  }


  const getInfo = useCallback(async () => {
    try {
      const res = await fetchAnimeInfo(item.id);
      if (res && res.data) {
        const enrichedData = {
        ...res.data,
        };
        setAnimeInfo(enrichedData);
      }
    } catch (error) {
      console.error("Error in getInfo:", error);
    }
  }, [item.id, item]);

  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMovement = useCallback((e: MouseEvent) => {
    const isOverCard = containerRef.current?.contains(e.target as Node);
    const isOverModal = modalRef.current?.contains(e.target as Node);

    if (isOverCard || isOverModal) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowModal(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setShowModal(false);
      }); // Small delay before hiding
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMovement);
    return () => {
      document.removeEventListener("mousemove", handleMouseMovement);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleMouseMovement]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);
  const router = useRouter();

  //Push the anime details to the local storage
  function toanimepage() {
    localStorage.setItem('abort','TRUE');
    console.log(animeInfo)
    localStorage.setItem("animeInfo", JSON.stringify(animeInfo));
    router.push(`/${item.id}`);
  }
  return (
    <div key={item.id} className="relative" ref={containerRef}>
      {/* Main Card */}
      <div
        className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer"
        onClick={toanimepage}
      >
        {/* Image section */}
        <div className="relative aspect-[1] overflow-hidden">
          <Image 
            src={item.image || "/api/placeholder/250/375"}
            alt={
              item.title ||
              item.romaji ||
              item.english ||
              item.userPreferred ||
              item.native
            }
            width={450}
            height={350}
            className={`hover:blur-sm object-cover transform transition-transform duration-300 group-hover:scale-110 ${
              isLoading ? "opacity-50" : ""
            }`}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
            <Minilabel subOrDub={animeInfo?.subOrDub} totaleps={animeInfo?.totalEpisodes}/>
            <h3 className="text-base font-semibold text-white line-clamp-2 mt-1">
              {item.title ||
                item.romaji ||
                item.english ||
                item.userPreferred ||
                item.native}
            </h3>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          ref={modalRef}
          className="absolute z-50 left-1/2 right-0 top-1/2 min-h-[300px] min-w-[280px]"
        >
          <div className="bg-black/50 backdrop-blur-md rounded-lg min-h-[300px] shadow-xl p-4 animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-white truncate max-w-[200px]">
                {item.title ||
                  item.romaji ||
                  item.english ||
                  item.userPreferred ||
                  item.native}
              </h2>
              {animeInfo?.rating && (
                <span className="text-yellow-400 text-sm">
                  ★ {animeInfo.rating}
                </span>
              )}
            </div>

            <div className="mt-2 flex min-w-[250px] items-center gap-2 mb-2">
              <Minilabel subOrDub={animeInfo?.subOrDub} totaleps={animeInfo?.totalEpisodes}/>
              {animeInfo?.type && (
                <div className="ml-auto p-0.1 h-5 items-center px-2 rounded-md bg-black">
                  <span className="text-md leading-none text-white font-bold">
                    {animeInfo.type}
                  </span>
                </div>
              )}
            </div>

            {animeInfo?.description && (
              <p className="text-sm text-gray-200 font-semibold line-clamp-3">
                {animeInfo.description}
              </p>
            )}

            {animeInfo?.genres && (
              <div className="mt-2 flex flex-wrap gap-1">
                {animeInfo.genres.slice(0, 3).map((genre, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-700/50 text-gray-200 px-2 py-0.5 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}


            <div className="mt-4">
              <p className="text-white text-sm">
                Japanese Title: {animeInfo?.otherName}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
