// src/utils/WatchLaterStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

const STORAGE_KEY = 'watchLater';

export const getWatchLater = async (): Promise<Movie[]> => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const addToWatchLater = async (movie: Movie) => {
  const list = await getWatchLater();
  const exists = list.some((m: Movie) => m.id === movie.id);
  if (!exists) {
    list.push(movie);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
};

export const removeFromWatchLater = async (id: number) => {
  const list = await getWatchLater();
  const updated = list.filter((m: Movie) => m.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
