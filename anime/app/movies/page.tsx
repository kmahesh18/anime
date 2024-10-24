// Import the package and the specific extension
"use client"
import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import { useEffect, useState } from "react";
import Carasol from "../ui/carasol";

function Page() {
  // const [animeList, setAnimeList] = useState([]);

  // Fetch top-airing anime
  // const fetchTopAiringAnime = async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchTopAiring();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // const fetchAnimeInfo= async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchAnimeInfo();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // const fetchRecentMovies= async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchRecentMovies();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // const fetchRecentEpisodes= async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchRecentEpisodes();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // const fetchPopular= async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchPopular();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // const fetchGenreList= async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchGenreList();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // const fetchGenreInfo= async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchGenreInfo();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // const fetchEpisodeSources= async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchEpisodeSources();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // const fetchEpisodeServers= async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchEpisodeServers();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // const fetchDirectDownloadLink= async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchDirectDownloadLink();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // const fetchAnimeList= async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchAnimeList();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // const fetchAnimeIdFromEpisodeId= async () => {
  //   try {
  //     // Instantiate the Gogoanime extension
  //     const gogoanime = new Gogoanime();
      
  //     // Use the extension's method to fetch top-airing anime
  //     const result = await gogoanime.fetchAnimeIdFromEpisodeId();
  //     console.log(result); // You can see the fetched data here
  //   } catch (error) {
  //     console.error("Error fetching top-airing anime:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchTopAiringAnime();
  // },[])

  return(
    <div>
      <Carasol/>
    </div>
  );
  
}

export default Page;
