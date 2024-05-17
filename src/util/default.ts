/**
 * Evaluates {@link T}:
 * - When `undefined`, returns {@link D}.
 * - Otherwise, returns {@link T}.
 * @template T The type to evaluate
 * @template D The type to return when `T` is `undefined`
 * @example
 * type Foo = Default<"foo", "bar">; // "foo"
 * type Bar = Default<undefined, "bar">; // "bar"
 */
export type Default<T, D> = undefined extends T ? D : Exclude<T, undefined>;
