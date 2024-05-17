import type { Document } from "@contentful/rich-text-types";
import { describe, it } from "vitest";

import type {
  Asset,
  Entry,
  GqlAsset,
  GqlCollection,
  GqlEntry,
  GqlRichText,
  GqlSys,
} from "../src";

const TEST_DOCUMENT = {} as unknown as Document;
const TEST_GQL_ASSET: GqlAsset = {
  sys: {
    id: "value",
    spaceId: "value",
    environmentId: "value",
    publishedAt: "value",
    firstPublishedAt: "value",
    publishedVersion: 123,
  },
  contentfulMetadata: {
    tags: [
      {
        id: "value",
        name: "value",
      },
    ],
  },
  title: "value",
  description: "value",
  contentType: "value",
  fileName: "value",
  url: "value",
  size: 123,
  width: 123,
  height: 123,
};

interface TestContentType {
  sys: {
    contentType: {
      sys: {
        id: "testContentType";
      };
    };
  };
  fields: {
    scalar: string;
    optScalar?: number;

    entry: TestContentType;
    optEntry?: TestContentType;

    scalarArray: (string | boolean)[];
    optScalarArray?: (number | boolean)[];

    entryArray: TestContentType[];
    optEntryArray?: TestContentType[];

    asset: Asset;
    optAsset?: Asset;

    assetArray: Asset[];
    optAssetArray?: Asset[];

    richText: Document;
    optRichText?: Document;
  };
}

interface RichTextContentType1 {
  sys: {
    contentType: {
      sys: {
        id: "richTextContentType1";
      };
    };
  };
  fields: {
    field1: string;
  };
}

interface RichTextContentType2 {
  sys: {
    contentType: {
      sys: {
        id: "richTextContentType2";
      };
    };
  };
  fields: {
    optField2?: string;
  };
}

describe("GqlEntry", () => {
  describe("with defaults", () => {
    it("transforms type as expected", () => {
      type GqlTestContentType = GqlEntry<TestContentType>;

      const entry: GqlTestContentType = {
        scalar: "value",
        entry: void 0 as never,
        scalarArray: ["1", "2"],
        entryArrayCollection: { items: [] },
        asset: TEST_GQL_ASSET,
        assetArrayCollection: { items: [TEST_GQL_ASSET] },
        richText: { json: TEST_DOCUMENT },
      };

      // contentfulMetadata
      entry.contentfulMetadata = {
        tags: [
          {
            id: "value",
            name: "value",
          },
        ],
      };
      const _1: string = entry.contentfulMetadata.tags[0].id;
      const _2: string = entry.contentfulMetadata.tags[0].name;
      entry.contentfulMetadata = undefined;

      // scalar
      const _3: string = entry.scalar;

      // optScalar
      const _4: number | null | undefined = entry.optScalar;
      entry.optScalar = null;
      entry.optScalar = undefined;

      // entry
      const _5: Partial<GqlTestContentType> = entry.entry;

      // optEntry
      const _6: Partial<GqlTestContentType> | null | undefined = entry.optEntry;
      entry.optEntry = null;
      entry.optEntry = undefined;

      // scalarArray
      const _7: (string | boolean)[] = entry.scalarArray;

      // optScalarArray
      const _8: (number | boolean)[] | null | undefined = entry.optScalarArray;
      entry.optScalarArray = null;
      entry.optScalarArray = undefined;

      // entryArray
      const _9: Partial<GqlCollection<Partial<GqlTestContentType>>> =
        entry.entryArrayCollection;

      // optEntryArray
      const _10:
        | Partial<GqlCollection<Partial<GqlTestContentType>>>
        | null
        | undefined = entry.optEntryArrayCollection;
      entry.optEntryArrayCollection = null;
      entry.optEntryArrayCollection = undefined;

      // asset
      const _11: Partial<GqlAsset> = entry.asset;

      // optAsset
      const _12: Partial<GqlAsset> | null | undefined = entry.optAsset;
      entry.optAsset = null;
      entry.optAsset = undefined;

      // assetArray
      const _13: Partial<GqlCollection<Partial<GqlAsset>>> =
        entry.assetArrayCollection;

      // optAssetArray
      const _14: Partial<GqlCollection<Partial<GqlAsset>>> | null | undefined =
        entry.optAssetArrayCollection;
      entry.optAssetArrayCollection = null;
      entry.optAssetArrayCollection = undefined;

      // richText
      const _15: GqlRichText<Entry> = entry.richText;

      // optRichText
      const _16: GqlRichText<Entry> | null | undefined = entry.optRichText;
      entry.optRichText = null;
      entry.optRichText = undefined;
    });
  });

  describe("include sys, __typename, exclude fields", () => {
    it("returns type with just sys and __typename fields", () => {
      type GqlTestContentType = GqlEntry<
        TestContentType,
        {
          sys: true;
          __typename: true;
          fields: false;
        }
      >;

      const entry: GqlTestContentType = {
        sys: {
          id: "value",
          spaceId: "value",
          environmentId: "value",
          publishedAt: "value",
          firstPublishedAt: "value",
          publishedVersion: 1,
        },
        __typename: "TestContentType",
      };

      // sys
      const _1: GqlSys = entry.sys;

      // __typename
      const _2: "TestContentType" = entry.__typename;
    });
  });

  describe("with mapped fields", () => {
    it("returns type with mapped fields, nested references inherit sys, __typename mappings", () => {
      type GqlTestContentType = GqlEntry<
        TestContentType,
        {
          sys: {
            id: "myId";
            spaceId: true;
          };
          __typename: "myType";
          fields: {
            scalar: "myScalar";
            optScalar: true;
            entry: true;
          };
        }
      >;

      const entry: GqlTestContentType = {
        sys: {
          myId: "value",
          spaceId: "value",
        },
        myType: "TestContentType",
        myScalar: "value",
        entry: { sys: {}, entry: { sys: {} } } as never,
      };

      // sys
      const _1: string = entry.sys.myId;
      const _2: string = entry.sys.spaceId;
      const _3: string = entry.entry.sys!.myId;
      const _4: string = entry.entry.sys!.spaceId;
      entry.entry.sys = undefined;

      // __typename
      const _5: "TestContentType" = entry.myType;

      // scalar
      const _6: string = entry.myScalar;
      const _7: "TestContentType" | undefined = entry.entry.myType;
      entry.entry.myType = undefined;

      // optScalar
      const _8: number | null | undefined = entry.optScalar;
      entry.optScalar = null;
      entry.optScalar = undefined;
    });
  });

  describe("with references", () => {
    it("returns type with nested sys and __typename mappings overwritten", () => {
      type GqlTestContentType = GqlEntry<
        TestContentType,
        {
          sys: {
            id: "myId";
          };
          __typename: "myType";
          references: {
            sys: {
              id: "myId1";
            };
            __typename: "myType1";
            references: {
              sys: {
                id: "myId2";
              };
              __typename: "myType2";
            };
          };
          fields: {
            entry: true;
          };
        }
      >;

      const entry: GqlTestContentType = {
        sys: {
          myId: "value",
        },
        myType: "TestContentType",
        entry: { sys: {}, entry: { sys: {} } } as never,
      };

      // sys
      const _1: string = entry.sys.myId;
      const _2: string = entry.entry.sys!.myId1;
      const _3: string = entry.entry.entry!.sys!.myId2;
      entry.entry.entry!.sys = undefined;
      entry.entry.sys = undefined;

      // __typename
      const _4: "TestContentType" = entry.myType;
      const _5: "TestContentType" | undefined = entry.entry.myType1;
      const _6: "TestContentType" | undefined = entry.entry.entry!.myType2;
      entry.entry.entry!.myType2 = undefined;
      entry.entry.entry = undefined;
      entry.entry.myType1 = undefined;
    });
  });

  describe("with rich text content types", () => {
    it("restrict types accordingly", () => {
      type GqlEntryRichTextContentType1 = GqlEntry<
        RichTextContentType1,
        {
          __typename: "type";
        }
      >;
      type GqlRichTextContentType2 = GqlEntry<
        RichTextContentType2,
        {
          sys: {
            id: "other";
          };
          __typename: "type";
          fields: {
            optField2: "myOptField2";
          };
        }
      >;

      type GqlTestContentType = GqlEntry<
        TestContentType,
        object,
        GqlEntryRichTextContentType1 | GqlRichTextContentType2
      >;

      const entry: GqlTestContentType = {
        scalar: "value",
        entry: {} as unknown as GqlEntry<TestContentType>,
        scalarArray: ["1", "2"],
        entryArrayCollection: { items: [] },
        asset: TEST_GQL_ASSET,
        assetArrayCollection: { items: [TEST_GQL_ASSET] },
        richText: { json: TEST_DOCUMENT },
      };

      const linkedEntry = entry.richText?.links?.entries?.block?.[0];
      if (linkedEntry?.type === "RichTextContentType1") {
        // field1
        const _1: string = linkedEntry.field1;
      } else if (linkedEntry?.type === "RichTextContentType2") {
        // sys
        const _1: string = linkedEntry.sys.other;

        // field2
        const _2: string | null | undefined = linkedEntry.myOptField2;
        linkedEntry.myOptField2 = null;
        linkedEntry.myOptField2 = undefined;
      }
    });
  });
});
