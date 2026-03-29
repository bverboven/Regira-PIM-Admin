import { EntityBase } from "@/regira_modules/vue/entities"
import type Article from "../data/Entity"

export class ArticleComponent extends EntityBase {
    id: number = 0
    assemblyId: number
    componentId: number
    quantity: number
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

    static create(values?: object): ArticleComponent {
        return Object.assign(new ArticleComponent(), values || {})
    }
}

export const Entity = ArticleComponent

export default ArticleComponent