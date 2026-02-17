import {type ListSettings} from "~/types/list-settings";

export type List = {
    id: number,
    name: string
    isPublic: boolean
    listSettings: ListSettings
}

