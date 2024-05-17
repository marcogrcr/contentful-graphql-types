/**
 * Allows to map the field names of {@link T} to other names:
 * - Set a field type to `true` to include it with the default name.
 * - Omit a field to exclude it.
 * - Set a field type to another `string` to map it to another name.
 * @template T The type to map the field names.
 */
export type GqlFieldMap<T> = { [_ in keyof T]?: true | string };
