import type {User} from "~/types/user";
import type {Role} from "~/types/role";

export type MovieListSettings = {
    listName: string,
    isPublic: boolean,
    collaborators: User[],
    roles: Role[]
}
