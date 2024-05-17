import type { Entry } from "./entry";
import type { SysOf } from "./sys-of";

/**
 * Extracts the content type of an {@link Entry}.
 * @example
 * type MyType = { sys: { contentType: { sys: { id: "foobar" } } } };
 *
 * // these types are equivalent
 * type ContentType = ContentTypeOf<MyType>;
 * type ContentType = "foobar";
 */
export type ContentTypeOf<T extends Pick<Entry, "sys">> = SysOf<
  SysOf<T>["contentType"]
>["id"];
