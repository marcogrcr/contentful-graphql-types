/**
 * A Contentful GraphQL metadata type.
 * @see https://www.contentful.com/developers/docs/references/graphql/#/reference/schema-generation/contentfulmetadata-field
 */
export interface GqlMetadata {
  tags: {
    id: string;
    name: string;
  }[];
}
