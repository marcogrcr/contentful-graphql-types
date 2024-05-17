/**
 * The Contentful `Sys` GraphQL type.
 * @see https://www.contentful.com/developers/docs/references/graphql/#/reference/schema-generation/sys-field
 */
export interface GqlSys {
  /** Unique identifier of the resource. */
  id: string;

  /** Unique identifier of the resource's space. */
  spaceId: string;

  /** Unique identifier of the resource's environment. */
  environmentId: string;

  /** DateTime string of the resource's last published time. */
  publishedAt: string;

  /** DateTime string of the resource's first published time. */
  firstPublishedAt: string;

  /** The version of the draft resource when it was published. */
  publishedVersion: number;
}
