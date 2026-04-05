import { EntityBase } from "@/regira_modules/vue/entities";
import type FacetGroup from "../data/Entity";
import type Facet from "@/entities/facets/data/Entity";

export abstract class RelatedEntity extends EntityBase {
  id: number = 0;
  facetGroupId: number;
  facetId: number;

  facetGroup?: FacetGroup;
  facet?: Facet;

  _deleted: boolean = false;

  override get $id(): string | number {
    return this.id || "new";
  }
}

export const Entity = RelatedEntity;

export default RelatedEntity;
