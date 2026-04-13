import type Facet from "../data/Entity"
import type FacetGroup from "@/entities/facet-groups/data/Entity"

export class TreeItem {
    id: number
    type: string
    item?: Facet | FacetGroup
    children: Array<ChildItem> = []

    isExpanded: boolean = false

    static create(values: object): TreeItem {
        return Object.assign(new TreeItem(), values)
    }
}
export class ChildItem extends TreeItem {
    static create(values: object): ChildItem {
        return Object.assign(new ChildItem(), values)
    }
}

export default TreeItem
