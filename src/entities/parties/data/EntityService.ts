import type { AxiosInstance } from "axios"
import { EntityServiceBase, type IConfig } from "@/regira_modules/vue/entities"
import Entity, { Person, Organization, PartyTypes } from "./Entity"

export class EntityService extends EntityServiceBase<Entity> {
    constructor(axios: AxiosInstance, config: IConfig) {
        super(axios, config)
    }

    override toEntity(item: object): Entity {
        if (item instanceof Entity) {
            return item
        }
        const partyType = (item as any).partyType
        if (partyType === PartyTypes.Person) {
            return Object.assign(this.createInstance(Person as new () => Person), item || {})
        }
        if (partyType === PartyTypes.Organization) {
            return Object.assign(this.createInstance(Organization as new () => Organization), item || {})
        }
        // Default to Person if no partyType is set
        return Object.assign(this.createInstance(Person as new () => Person), item || {})
    }
}

export default EntityService
