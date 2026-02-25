import type {Collaborator} from "~/types/collaborator";
import type {Role} from "~/types/role";

export type MovieListSettings = {
    listName: string,
    isPublic: boolean,
    collaborators: Collaborator[],
    roles: Role[]
}
