import type { Movie } from "~/types/movie";

export type MovieList = {
  id: number;
  name: string;
  public: boolean;
  owner: number;
  movie_count: number;
  movies: Movie[];
};
