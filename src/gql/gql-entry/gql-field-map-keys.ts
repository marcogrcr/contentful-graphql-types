import type { ConvertMappedKeys } from "../../util";
import type { GqlFieldMap } from "./gql-field-map";

/**
 * Gets keys of a {@link GqlFieldMap} converted to keys of the type that the {@link GqlFieldMap} applies.
 * @see https://github.com/Microsoft/TypeScript/pull/12826
 * @template M The type to extract the keys.
 */
export type GqlFieldMapKeys<M extends GqlFieldMap<unknown>> =
  M extends GqlFieldMap<infer T> ? ConvertMappedKeys<T, M> : never;
