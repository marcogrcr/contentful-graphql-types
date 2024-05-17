import type { Document } from "@contentful/rich-text-types";

import type { Entry } from "../contentful/entry";
import type { DeepPartial } from "../util";
import type { GqlAsset } from "./gql-asset";
import type { GqlEntry } from "./gql-entry";

/**
 * A Contentful Graphql rich text type.
 * @template E The types of entries that can be linked to the rich text document.
 * @see https://www.contentful.com/developers/docs/references/graphql/#/reference/schema-generation/rich-text
 */
export interface GqlRichText<E> {
  json: Document;
  links?: {
    entries?: {
      inline?: ToGqlEntry<E>[];
      hyperlink?: ToGqlEntry<E>[];
      block?: ToGqlEntry<E>[];
    };
    assets?: {
      block?: DeepPartial<GqlAsset>[];
      hyperlink?: DeepPartial<GqlAsset>[];
    };
  };
}

type ToGqlEntry<T> = T extends Entry
  ? GqlEntry<T>
  : T extends GqlEntry<Entry>
    ? T
    : never;
