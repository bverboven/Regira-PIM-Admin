import { EntityBase } from "@/regira_modules/vue/entities"
import { type Entity as UnitType } from "@/entities/unit-types"
import type { ArticleComponent } from "../article-components/Entity"
import type ArticleFacet from "../article-facets/Entity"

export class Article extends EntityBase {
    id: number = 0
    title: string
    description?: string

    allowAdditions: boolean = true
    unitTypeId?: number
    price?: number

    created?: Date
    lastModified?: Date

    unitType?: UnitType
    assemblies?: ArticleComponent[]
    components?: ArticleComponent[]
    facets?: ArticleFacet[]

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.title
    }
}

export const Entity = Article

export default Article
