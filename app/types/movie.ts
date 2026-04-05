import type {MovieCriticScore} from "~/types/movie-critic-score";

export type Movie = {
    id: number
    title: string
    year: number
    imdb_id: string
    director: string
    actors: string
    plot: string
    genre: string
    mpaa_rating: string
    critic_scores: Array<MovieCriticScore>
    poster: string
    added_by: number
}

