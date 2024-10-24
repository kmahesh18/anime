import ccicon from "@/public/assets/icons8-so-closed-caption-32.png";
import micicon from "@/public/assets/icons8-mic-16.png";
import Image from "next/image";

import {
  IAnimeInfo,
  AnimeCardData,
} from "@consumet/extensions/dist/models/types";
export default function Card({ item }: AnimeCardData) {
  return (
    <div
      key={item.id}
      className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={item.image || "/api/placeholder/300/450"}
          alt={
            item.title ||
            item.romaji ||
            item.english ||
            item.userPreferred ||
            item.native
          }
          height={250}
          width={250}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="inline-flex h-5 p-0.5 items-center rounded-sm  bg-white/10 backdrop-blur-sm">
          {item.sub ? (
            <div className="inline-flex h-5 items-center px-2 rounded-sm  bg-cyan-300">
              <Image
                src={ccicon}
                width={16}
                height={16}
                alt="closed captions icon"
                className="mr-1"
              />
              <span className="text-sm leading-none font-bold text-black">
                {item.sub}
              </span>
            </div>
          ) : null}

          {item.sub && item.dub && <div className="h-5 w-[3px] bg-black" />}

          {item.dub ? (
            <div className="inline-flex h-5 items-center px-2 rounded-sm  bg-lime-300">
              <Image
                src={micicon}
                width={16}
                height={16}
                alt="mic icon"
                className="mr-1"
              />
              <span className="text-sm leading-none font-bold text-black">
                {item.dub}
              </span>
            </div>
          ) : null}
        </div>{" "}
        <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2">
          {item.title ||
            item.romaji ||
            item.english ||
            item.userPreferred ||
            item.native}
        </h3>
      </div>
      <p>{}</p>
    </div>
  );
}