import RelatedEntity from "./RelatedEntity";

export class FacetChildGroup extends RelatedEntity {
  override get $title(): string | undefined {
    return this.facet?.title;
  }

  static create(values?: object): FacetChildGroup {
    return Object.assign(new FacetChildGroup(), values || {});
  }
}

export const Entity = FacetChildGroup;

export default FacetChildGroup;
