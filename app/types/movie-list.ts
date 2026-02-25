import {type MovieListSettings} from "~/types/movie-list-settings";
import type {Movie} from "~/types/movie";

export type MovieList = {
    id: number,
    name: string
    is_public: boolean
    movieListSettings: MovieListSettings
    movies: Movie[]
}

