import type Facet from "../data/Entity"
import type FacetGroup from "@/entities/facet-groups/data/Entity"

export class FamilyItem {
    parentId: number
    parentType: string
    childId: number
    childType: string
    level: number
    rootId: number
    rootType: string

    parent?: Facet | FacetGroup
    child?: Facet | FacetGroup
    root?: Facet | FacetGroup

    get $id(): string {
        return `${this.parentId}:${this.childId}`
    }
    get $title(): string {
        return `${(this.child as any)?.title} is child of ${(this.parent as any)?.title}`
    }

    toString(): string {
        return `${this.level}:${this.parentId || ""}:${this.childId || ""}`
    }
    static create(values: object): FamilyItem {
        return Object.assign(new FamilyItem(), values)
    }
}

export default FamilyItem
