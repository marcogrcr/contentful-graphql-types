import type { IfEmptyMap } from "../../util";
import type { GqlSys } from "../gql-sys";
import type { GqlFieldMap } from "./gql-field-map";
import type { GqlFieldName } from "./gql-field-name";

/**
 * Gets the `sys` fields of an {@link Entry} according to a {@link GqlFieldMap}.
 * @template M The field map to use.
 * @template F The fields to map.
 */
export type GqlSysFields<
  M extends GqlFieldMap<GqlSys>,
  F extends keyof GqlSys,
> = IfEmptyMap<
  M,
  unknown,
  {
    sys: {
      [P in F as GqlFieldName<GqlSys, P, M>]: GqlSys[P];
    };
  }
>;
