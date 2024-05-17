/**
 * Evaluates {@link V}:
 * - When `true`, returns {@link T}.
 * - When `false`, return {@link F}.
 * - Otherwise, returns {@link V}.
 * @template V The type to evaluate
 * @template T The type to when if `V` is `true`
 * @template F The type to when if `V` is `false`
 * @example
 * type Two = If<true, 2, 1>; // 2
 * type One = If<false, 2, 1>; // 1
 * type Three = If<3, 2, 1>; // 3
 */
export type If<V, T, F> = V extends true ? T : V extends false ? F : V;
