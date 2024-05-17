import type { ContentTypeOf, Entry } from "../../contentful";
import type { If } from "../../util";

/**
 * Conditionally adds GraphQL's `__typename` field to a {@link GqlEntry}.
 * @template E The {@link IEntry} to add the field to.
 * @template F The field name to use.
 *             Set to `true` to use the default `__typename`.
 *             Set to `false` to omit the field.
 *             Set to a string to rename the field.
 * @example
 * type MyType = {
 *   sys: { contentType: { sys: { id: "myType" } } };
 *   fields: unknown;
 * };
 *
 * type True = GqlTypeNameField<MyType, true>; // { __typename: "myType" }
 * type False = GqlTypeNameField<MyType, false>; // {}
 * type Foo = GqlTypeNameField<MyType, "foo">; // { foo: "myType" }
 */
export type GqlTypeNameField<E extends Entry, F extends boolean | string> = {
  [_ in If<F, "__typename", never>]: Capitalize<ContentTypeOf<E>>;
};
