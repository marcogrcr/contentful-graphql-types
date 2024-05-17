import type { Entry, FieldsOf } from "../../contentful";
import type { GqlSys } from "../gql-sys";
import type { GqlFieldMap } from "./gql-field-map";

/** Specifies the basic {@link GqlEntry} options that are not dependent on the {@link Entry} type. */
export interface GqlEntryBasicOptions {
  /**
   * Maps field names of {@link GqlSys} to other names:
   * - Set to `true` to include all fields with their default names.
   * - Set a field to `false` to omit it.
   * @default false
   */
  sys?: boolean | GqlFieldMap<GqlSys>;

  /**
   * Maps the `__typename` field name to another name.
   * - Set to `true` to include the field with its default name.
   * - Set to `false` to omit it.
   * @default false
   */
  __typename?: boolean | string;

  /**
   * Indicates how the {@link sys} and {@link __typename} field mappings should behave for nested references.
   */
  references?: GqlEntryBasicOptions;
}

/**
 * The options for configuring {@link GqlEntry} types.
 * @template E The type for which the {@link GqlEntry} is being configured.
 */
export interface GqlEntryOptions<E extends Entry> extends GqlEntryBasicOptions {
  /**
   * Maps field names of {@link E} to other names.
   * - Set to `true` to include all fields with their default names.
   * - Set to `false` to exclude all fields.
   * @default true
   */
  fields?: boolean | GqlFieldMap<FieldsOf<E>>;
}
