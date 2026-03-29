import { EntityBase } from "@/regira_modules/vue/entities"
import type Article from "../data/Entity"

export class ArticleAssembly extends EntityBase {
    id: number = 0
    assemblyId: number
    componentId: number
    quantity: number = 1
    isOmittable: boolean

    assembly?: Article
    component?: Article

    _deleted: boolean = false

    override get $id(): string | number {
        return this.id || "new"
    }
    override get $title(): string | undefined {
        return this.component?.title
    }

    static create(values?: object): ArticleAssembly {
        return Object.assign(new ArticleAssembly(), values || {})
    }
}

export const Entity = ArticleAssembly

export default ArticleAssembly