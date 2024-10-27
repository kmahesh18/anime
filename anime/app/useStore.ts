// stores/useStore.js
import { create } from "zustand";
import { AnimeCardData } from "@consumet/extensions/dist/models/types"; // Adjust the path as necessary

interface StoreState {
  animeData: AnimeCardData | null;
  setAnimeData: (data: AnimeCardData) => void;
  clearAnimeData: () => void;
}

const useStore = create<StoreState>((set) => ({
  animeData: null,
  setAnimeData: (data) => set({ animeData: data }),
  clearAnimeData: () => set({ animeData: null }),
}));

export default useStore;
