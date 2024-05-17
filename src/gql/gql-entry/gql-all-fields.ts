// eslint-disable-next-line unused-imports/no-unused-imports
import type { GqlFieldMap } from "./gql-field-map";

/**
 * Gets a {@link GqlFieldMap} of {@link T} with all the field types set to `true`.
 */
export type GqlAllFields<T> = {
  [_ in keyof T]: true;
};
