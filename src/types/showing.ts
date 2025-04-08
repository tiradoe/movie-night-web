import type { Movie } from "~/types/movie";

export type Showing = {
  owner: number;
  public: boolean;
  movie: Movie;
  showtime: string;
};
