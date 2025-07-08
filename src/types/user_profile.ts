import type { MovieList } from "~/types/movielist";

export type UserProfile = {
  name: string;
  username: string;
  date_joined: string;
  lists: MovieList[];
};
