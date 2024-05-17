import type { GqlMetadata } from "./gql-metadata";
import type { GqlSys } from "./gql-sys";

/**
 * A Contentful Graphql asset type.
 * @see https://www.contentful.com/developers/docs/references/graphql/#/reference/schema-generation/assets
 */
export interface GqlAsset {
  sys: GqlSys;
  contentfulMetadata: GqlMetadata;
  title: string;
  description: string;
  contentType: string;
  fileName: string;
  url: string;
  size: number;
  width?: number | null;
  height?: number | null;
}
