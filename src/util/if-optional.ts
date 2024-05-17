/**
 * Evaluates {@link V}:
 * - When optional (i.e. `undefined` is assignable), returns {@link T}.
 * - Otherwise, returns {@link F}.
 * @template V The type to evaluate
 * @template T The type to return when `V` is optional
 * @template F The type to return when `V` is required
 * @example
 * type False = IfOptional<string, true, false>; // false
 * type True = IfOptional<string | undefined, true, false>; // true
 */
export type IfOptional<V, T, F> = undefined extends V ? T : F;
