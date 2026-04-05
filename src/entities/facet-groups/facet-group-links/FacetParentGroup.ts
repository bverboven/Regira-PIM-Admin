import RelatedEntity from "./RelatedEntity";

export class FacetParentGroup extends RelatedEntity {
  override get $title(): string | undefined {
    return this.facet?.title;
  }

  static create(values?: object): FacetParentGroup {
    return Object.assign(new FacetParentGroup(), values || {});
  }
}

export const Entity = FacetParentGroup;

export default FacetParentGroup;
