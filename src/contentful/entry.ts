/**
 * Describes the basic shape of a Contentful entry.
 * Defines the minimum required overlap with the `Entry` type from the `contentful` package.
 */
export interface Entry {
  sys: {
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: unknown;
}
