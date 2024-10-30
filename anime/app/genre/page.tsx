'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Link from "next/link";

function Page() {
  const [genreList, setGenreList] = useState([]);
  const [animeList, setAnimeList] = useState([]);

  const fetchGenre = async () => {
    try {
      const response = await axios.get('/api/genre');
      setGenreList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }

  useEffect(() => {
    fetchGenre();
  }, []);

  const getGenreAnime = async (id) => {
    try {
      const response = await axios.get(`/api/genre-search/${id}/1`);
      setAnimeList(response.data);
      console.log("Anime by genre:", response.data);
    } catch (error) {
      console.error("Error fetching anime by genre:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-6">Watch your type of Animes</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genreList.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            {/* <img src={animeList.image} alt="" /> */}
            <Link
              href={`/genre/${item.id}`}
              onClick={() => getGenreAnime(item.id)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>

      {/* Display anime list */}
      {animeList.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Anime Results:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {animeList.map((item,anime) => (
              <div key={anime.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{anime.title}</h3>
                {/* Add more anime details as needed */}
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Page;