/**
 * Evaluates {@link M}:
 * - When empty (i.e. no keys), returns {@link T}.
 * - Otherwise, returns {@link F}.
 * @template M The map to evaluate
 * @template T The type to return when `R` is empty
 * @template F The type to return when `R` is not empty
 * @example
 * type True = IfEmptyMap<{}, true, false>; // true
 * type False = IfEmptyMap<{ foo: "bar" }, true, false>; // false
 */
export type IfEmptyMap<
  M extends Record<string, unknown>,
  T,
  F,
> = M[keyof M] extends never ? T : F;
