/**
 * Converts keys of {@link M} into keys of {@link T} when possible.
 * This allows to create mapped types of {@link T} based on the keys of {@link M} while maintaining the property modifiers.
 * @template T The target type
 * @template M The source type
 * @see https://github.com/Microsoft/TypeScript/pull/12826
 * @example
 * type MyType = {
 *   foo: 1;
 *   bar?: 2;
 *   readonly baz: 3;
 *   readonly foobar?: 4;
 *   omit: 5;
 * };
 *
 * type MyTypeMap = {
 *   foo: 6;
 *   bar: 7;
 *   baz: 8;
 *   foobar: 9;
 * };
 *
 * type MapType<T, K extends keyof T, M extends { [_ in keyof T]?: unknown }> = {
 *   [P in K]: M[P];
 * };
 *
 * // the following type are equivalent
 * type Result = MapType<MyType, ConvertMappedKeys<MyType, MyTypeMap>, MyTypeMap>;
 * type Result = {
 *   foo: 6;
 *   bar?: 7;
 *   readonly baz: 8;
 *   readonly foobar?: 9;
 * };
 */
export type ConvertMappedKeys<
  T,
  M extends { [_ in keyof T]?: unknown },
> = keyof M extends keyof T ? keyof M : keyof T;
