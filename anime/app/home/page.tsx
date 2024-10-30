'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";

function Page() {
  const controller=new AbortController();
  const [recentEpisodes, setRecentEpisode] = useState([]);
  const [topEpisodes, setTopEpisodes] = useState([]);
  const [actionEpisodes, setActionEpisodes] = useState([]);
  const [comedyEpisodes, setComedyEpisodes] = useState([]);
  const [romanceEpisodes, setRomanceEpisodes] = useState([]);
  const [fantasyEpisodes, setFantasyEpisodes] = useState([]);
  const signal=controller.signal;

  async function recentEpisode() {
    const episode = await axios.get(`/api/recent-episodes/${1}/${1}`, {
      signal: controller.signal,
    });
    setRecentEpisode(episode.data.results);
  }
  async function topEpisode() {
    const episode = await axios.get(`/api/top-airing/${1}`, {
      signal: controller.signal,
    });
    setTopEpisodes(episode.data.results);
  }
  async function actionEpisode() {
    const episode = await axios.get(`/api/genre-search/action/${1}`, {
      signal: controller.signal,
    });
    setActionEpisodes(episode.data.results);
  }
  async function comedyEpisode() {
    const episode = await axios.get(`/api/genre-search/comedy/${1}`, {
      signal: controller.signal,
    });
    setComedyEpisodes(episode.data.results);
  }
  async function romanceEpisode() {
    const episode = await axios.get(`/api/genre-search/romance/${1}`, {
      signal: controller.signal,
    });
    setRomanceEpisodes(episode.data.results);
  }
  async function fantasyEpisode() {
    const episode = await axios.get(`/api/genre-search/fantasy/${1}`, {
      signal: controller.signal,
    });
    setFantasyEpisodes(episode.data.results);
  }

  useEffect(() => {
    recentEpisode();
    topEpisode();
    actionEpisode();
    comedyEpisode();
    romanceEpisode();
    fantasyEpisode();
    return () => {
      controller.abort();
    };
  }, []);

  return (
<div className="bg-black">
  <div>
    i need slide show of top-airing anime with big images like in netflix or prime
  </div>
<div className="container mx-auto p-10">
  <h1 className="text-white text-3xl font-bold py-4">Recently added</h1>
  <div className="overflow-x-auto scrollbar-custom flex space-x-4 min-h-[600px]">
    {recentEpisodes.map((item) => (
      <div key={item.id} className="inline-block min-w-[350px]">
        <Card item={item} key={item.id} />
      </div>
    ))}
  </div>
</div>

<div className="container mx-auto p-10">
  <h1 className="text-white text-3xl font-bold py-4">Trending</h1>
  <div className="overflow-x-auto scrollbar-custom flex space-x-4 min-h-[600px]">
    {topEpisodes.map((item) => (
      <div key={item.id} className="inline-block min-w-[350px]">
        <Card item={item} key={item.id} />
      </div>
    ))}
  </div>
</div>

<div className="container mx-auto p-10">
  <h1 className="text-white text-3xl font-bold py-4">Popular in Action</h1>
  <div className="overflow-x-auto scrollbar-custom flex space-x-4 min-h-[600px]">
    {actionEpisodes.map((item) => (
      <div key={item.id} className="inline-block min-w-[350px]">
        <Card item={item} key={item.id} />
      </div>
    ))}
  </div>
</div>

<div className="container mx-auto p-10">
  <h1 className="text-white text-3xl font-bold py-4">Popular in Comedy</h1>
  <div className="overflow-x-auto scrollbar-custom flex space-x-4 min-h-[600px]">
    {comedyEpisodes.map((item) => (
      <div key={item.id} className="inline-block min-w-[350px]">
        <Card item={item} key={item.id} />
      </div>
    ))}
  </div>
</div>
<div className="container mx-auto p-10">
  <h1 className="text-white text-3xl font-bold py-4">Popular in Romance</h1>
  <div className="overflow-x-auto scrollbar-custom flex space-x-4 min-h-[600px]">
    {romanceEpisodes.map((item) => (
      <div key={item.id} className="inline-block min-w-[350px]">
        <Card item={item} key={item.id} />
      </div>
    ))}
  </div>
</div>
<div className="container mx-auto p-10">
  <h1 className="text-white text-3xl font-bold py-4">Popular in Fantasy</h1>
  <div className="overflow-x-auto scrollbar-custom flex space-x-4 min-h-[600px]">
    {fantasyEpisodes.map((item) => (
      <div key={item.id} className="inline-block min-w-[350px]">
        <Card item={item} key={item.id} />
      </div>
    ))}
  </div>
</div>
</div>
  );
}

export default Page;
