import type { Document } from "@contentful/rich-text-types";
import { describe, it } from "vitest";

import type { GqlAsset, GqlEntry } from "../src";

const TEST_DOCUMENT = {} as unknown as Document;
const TEST_ASSET: GqlAsset = {
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
        richText: { json: TEST_DOCUMENT },
      };

      // contentfulMetadata
      entry.contentfulMetadata?.tags[0].id;
      entry.contentfulMetadata?.tags[0].name;

      // scalar
      entry.scalar = "value";

      // optScalar
      entry.optScalar = 123;
      entry.optScalar = null;
      entry.optScalar = undefined;

      // entry
      entry.entry = entry;

      // optEntry
      entry.optEntry = entry;
      entry.optEntry = null;
      entry.optEntry = undefined;

      // scalarArray
      entry.scalarArray = ["value", true];

      // optScalarArray
      entry.optScalarArray = [123, true];
      entry.optScalarArray = null;
      entry.optScalarArray = undefined;

      // entryArray
      entry.entryArrayCollection = { items: [entry] };
      entry.entryArrayCollection = {
        skip: 123,
        limit: 123,
        total: 123,
        items: [entry],
      };

      // optEntryArray
      entry.optEntryArrayCollection = { items: [entry] };
      entry.optEntryArrayCollection = {
        skip: 123,
        limit: 123,
        total: 123,
        items: [entry],
      };
      entry.optEntryArrayCollection = null;
      entry.optEntryArrayCollection = undefined;

      // richText
      entry.richText = {
        json: TEST_DOCUMENT,
      };
      entry.richText = {
        json: TEST_DOCUMENT,
        links: {
          entries: {
            inline: [entry],
            hyperlink: [entry],
            block: [entry],
          },
          assets: {
            block: [TEST_ASSET],
            hyperlink: [TEST_ASSET],
          },
        },
      };

      // optRichText
      entry.optRichText = entry.richText;
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

      entry;
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
        entry: void 0 as never,
      };

      // sys
      entry.sys.myId = "value";
      entry.sys.spaceId = "value";

      // __typename
      entry.myType = "TestContentType";

      // scalar
      entry.myScalar = "value";

      // optScalar
      entry.optScalar = 1;
      entry.optScalar = null;
      entry.optScalar = undefined;

      // nested sys
      entry.entry.sys.myId = "value";
      entry.entry.sys.spaceId = "value";

      // nested __typename
      entry.entry.myType = "TestContentType";
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
        entry: void 0 as never,
      };

      // sys
      entry.sys.myId = "value";

      // __typename
      entry.myType = "TestContentType";

      // nested sys (first level)
      entry.entry.sys.myId1 = "value";

      // nested __typename (first level)
      entry.entry.myType1 = "TestContentType";

      // nested sys (second level)
      entry.entry.entry.sys.myId2 = "value";

      // nested __typename (second level)
      entry.entry.entry.myType2 = "TestContentType";
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
        richText: { json: TEST_DOCUMENT },
      };

      const linkedEntry = entry.richText?.links?.entries?.block?.[0];
      if (linkedEntry?.type === "RichTextContentType1") {
        // field1
        linkedEntry.field1 = "value";
      } else if (linkedEntry?.type === "RichTextContentType2") {
        // sys
        linkedEntry.sys.other = "value";

        // field2
        linkedEntry.myOptField2 = "value";
        linkedEntry.myOptField2 = null;
        linkedEntry.myOptField2 = undefined;
      }
    });
  });
});
