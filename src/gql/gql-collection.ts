/**
 * A Contentful GraphQL collection type.
 * @see https://www.contentful.com/developers/docs/references/graphql/#/reference/collection-fields
 */
export interface GqlCollection<T> {
  skip: number;
  limit: number;
  total: number;
  items: T[];
}
