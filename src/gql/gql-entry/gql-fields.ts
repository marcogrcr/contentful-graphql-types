import type { Entry, FieldsOf } from "../../contentful";
import type { GqlEntryBasicOptions } from "./gql-entry-options";
import type { GqlFieldMap } from "./gql-field-map";
import type { GqlFieldName } from "./gql-field-name";
import type { GqlFieldType } from "./gql-field-type";

/**
 * Gets the `fields` of an {@link Entry} according to a field map.
 * @template E The entry to get the fields from.
 * @template O The options that will be applied to recursively converted {@link Entry} typed fields.
 * @template F The fields to map.
 * @template M The field mapping to use.
 * @template R The allowed rich text content types references.
 */
export type GqlFields<
  E extends Entry,
  O extends GqlEntryBasicOptions,
  F extends keyof FieldsOf<E>,
  M extends GqlFieldMap<FieldsOf<E>>,
  T,
> = {
  [P in F as GqlFieldName<FieldsOf<E>, P, M>]: GqlFieldType<
    FieldsOf<E>[P],
    O,
    T
  >;
};
