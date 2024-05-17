import type { Entry } from "./entry";

/**
 * Extracts the `fields` of an {@link Entry}.
 * @example
 * type SomeType = {
 *   fields: { foo: "bar" };
 *   other: "prop";
 * };
 *
 * // these types are equivalent
 * type Fields = FieldsOf<SomeType>;
 * type Fields = { foo: "bar" };
 */
export type FieldsOf<T extends Pick<Entry, "fields">> = T["fields"];
