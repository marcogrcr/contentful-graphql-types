/**
 * Describes the basic shape of a Contentful asset.
 * Defines the minimum required overlap with the `Asset` type from the `contentful` package.
 */
export interface Asset {
  sys: unknown;
  fields: {
    file: {
      url: string;
      contentType: string;
    };
  };
}
