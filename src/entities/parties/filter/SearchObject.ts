import { SearchObjectBase } from "@/regira_modules/vue/entities"

export class EntitySearchObject extends SearchObjectBase {
    code?: string
    name?: string
    partyType?: string

    minCreated?: Date
    maxCreated?: Date
    minLastModified?: Date
    maxLastModified?: Date

    isArchived?: boolean
}

export default EntitySearchObject
