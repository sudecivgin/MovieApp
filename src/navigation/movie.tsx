export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average?: number;
  backdrop_path?: string;
  genre_ids?: number[];
};
