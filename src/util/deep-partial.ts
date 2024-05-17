/**
 * DeepPartial as defined by `utility-types`.
 * We inline it to keep the package dependency free.
 * @see https://github.com/piotrwitek/utility-types
 */
export type DeepPartial<T> = {
  [P in keyof T]?: _DeepPartial<T[P]>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type _DeepPartial<T> = T extends Function
  ? T
  : T extends (infer U)[]
    ? _DeepPartialArray<U>
    : T extends object
      ? DeepPartial<T>
      : T | undefined;

type _DeepPartialArray<T> = _DeepPartial<T>[];
