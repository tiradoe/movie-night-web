import type { Movie } from "~/types/movie";

export type Showing = {
  id: number;
  owner: number;
  public: boolean;
  title: string;
  movie: Movie;
  showtime: string;
};
