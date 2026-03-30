import { EntityBase } from "@/regira_modules/vue/entities"
import type Facet from "@/entities/facets/data/Entity"

export class ArticleFacet extends EntityBase {
    id: number = 0
    articleId: number
    facetId: number

    facet?: Facet

    _deleted: boolean = false

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.facet?.title
    }

    static create(values?: object): ArticleFacet {
        return Object.assign(new ArticleFacet(), values || {})
    }
}

export const Entity = ArticleFacet

export default ArticleFacet