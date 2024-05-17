import type { Entry } from "../../contentful";
import type { If } from "../../util";

/**
 * Gets the default name of a field:
 * - If the field type is an {@link Array} of entries, the suffix `Collection` is added.
 * - Otherwise the field name is kept as is.
 * @template T The type that the field belongs to.
 * @template F The field name.
 * @example
 * type MyType = { foo: string; bar: string[] };
 * type Foo = GqlDefaultFieldName<MyType, "foo">; // "foo"
 * type BarCollection = GqlDefaultFieldName<MyType, "bar">; // "barCollection"
 */
export type GqlDefaultFieldName<T, F extends keyof T> = If<
  Exclude<T[F], undefined> extends (infer E)[]
    ? E extends Entry
      ? true
      : false
    : false,
  `${string & F}Collection`,
  F
>;
