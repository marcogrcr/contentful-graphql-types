import type { Entry, FieldsOf } from "../../contentful";
import type { Default, If } from "../../util";
import type { GqlMetadata } from "../gql-metadata";
import type { GqlSys } from "../gql-sys";
import type { GqlAllFields } from "./gql-all-fields";
import type {
  GqlEntryBasicOptions,
  GqlEntryOptions,
} from "./gql-entry-options";
import type { GqlFieldMapKeys } from "./gql-field-map-keys";
import type { GqlFields } from "./gql-fields";
import type { GqlSysFields } from "./gql-sys-fields";
import type { GqlTypeNameField } from "./gql-type-name-field";

/**
 * Transforms an {@link Entry} type to its corresponding GraphQL type.
 * See `README.md` for examples.
 * @template E The entry type to transform.
 * @template O The options to use.
 * @template R The allowed rich text content types.
 * @see https://www.contentful.com/developers/docs/references/graphql/#/reference/schema-generation
 */
export type GqlEntry<
  E extends Entry,
  O extends GqlEntryOptions<E> = object,
  R = Entry,
> = GqlSysFields<
  If<Default<O["sys"], false>, GqlAllFields<GqlSys>, object>,
  GqlFieldMapKeys<If<Default<O["sys"], false>, GqlAllFields<GqlSys>, object>>
> &
  GqlTypeNameField<E, Default<O["__typename"], false>> & {
    contentfulMetadata?: GqlMetadata;
  } & GqlFields<
    E,
    Default<O["references"], Pick<O, keyof GqlEntryBasicOptions>>,
    GqlFieldMapKeys<Default<O["fields"], GqlAllFields<FieldsOf<E>>>>,
    If<
      Default<O["fields"], GqlAllFields<FieldsOf<E>>>,
      GqlAllFields<FieldsOf<E>>,
      object
    >,
    R
  >;
