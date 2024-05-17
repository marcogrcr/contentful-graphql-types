import type { Default, If } from "../../util";
import type { GqlDefaultFieldName } from "./gql-default-field-name";
import type { GqlFieldMap } from "./gql-field-map";

/**
 * Gets the name of a field according to a field map.
 * @template T The object the field belongs to.
 * @template F The field name.
 * @template M The field map to use.
 * @example
 * type MyType = { foo: number };
 * type Foo = GqlFieldName<MyType, "foo", { foo: true }>; // "foo"
 * type Bar = GqlFieldName<MyType, "foo", { foo: "bar" }>; // "bar"
 */
export type GqlFieldName<T, F extends keyof T, M extends GqlFieldMap<T>> = If<
  Default<M[F], true>,
  GqlDefaultFieldName<T, F>,
  never
>;
