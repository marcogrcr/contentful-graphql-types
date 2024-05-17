import type { Document } from "@contentful/rich-text-types";

import type { Asset, Entry } from "../../contentful";
import type { IfOptional } from "../../util";
import type { GqlAsset } from "../gql-asset";
import type { GqlCollection } from "../gql-collection";
import type { GqlRichText } from "../gql-rich-text";
import type { GqlEntry } from "./gql-entry";
import type { GqlEntryBasicOptions } from "./gql-entry-options";

/**
 * Gets the type of a field:
 * - References to {@link Entry} are recursively converted to {@link GqlEntry}.
 * - Reference arrays of {@link Entry} are converted to {@link GqlCollection}.
 * - Optional fields are also assignable to `null` (GraphQL returns `null` on optional fields without values).
 * - Other types are kept as is.
 * @template T The field type.
 * @template O The options that will be applied to recursively converted {@link GqlEntry} fields.
 */
export type GqlFieldType<T, O extends GqlEntryBasicOptions, R> =
  | (Exclude<T, undefined> extends (infer I)[]
      ? I extends Asset
        ? Partial<GqlCollection<Partial<GqlAsset>>>
        : I extends Entry
          ? Partial<GqlCollection<Partial<GqlEntry<I, O>>>>
          : T
      : T extends Asset
        ? Partial<GqlAsset>
        : T extends Entry
          ? Partial<GqlEntry<T, O>>
          : T extends Document
            ? GqlRichText<R>
            : T)
  | IfOptional<T, null, never>;
