import type {Movie} from "~/types/movie";
import type {User} from "~/types/user";

export type MovieList = {
    id: number
    name: string
    is_public: boolean
    owner: string
    role: string
    movies: Movie[]
    collaborators: User[]
}

