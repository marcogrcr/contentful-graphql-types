/**
 * Extracts the `sys` field of an {@link Entry}.
 * @example
 * type SomeType = {
 *   sys: { foo: "bar" };
 *   other: "prop";
 * };
 *
 * // these types are equivalent
 * type Sys = SysOf<SomeType>;
 * type Sys = { foo: "bar" };
 */
export type SysOf<T extends { sys: unknown }> = T["sys"];
