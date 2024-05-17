# contentful-graphql-types

This package converts [Contentful]'s entry content types to their corresponding GraphQL API according to the [schema generation] rules.

## Compatible with

- Compatible with [contentful.js]'s `Entry` type.
- Compatible with [contentful-typescript-codegen].
- Compatible with custom `Entry` types.

[Contentful]: https://www.contentful.com/
[contentful.js]: https://github.com/contentful/contentful.js
[contentful-typescript-codegen]: https://github.com/intercom/contentful-typescript-codegen
[schema generation]: https://www.contentful.com/developers/docs/references/graphql/#/reference/schema-generation

## Usage

The main type is called `GqlEntry`. The simplest approach is to wrap the content type with it:

```ts
import { Document } from "@contentful/rich-text-types";
import { GqlEntry } from "contentful-graphql-types";

interface MyContentType {
  sys: { contentType: { sys: { id: "MycontentType" } } };
  fields: {
    scalar: boolean;
    optional?: number;
    scalarArray: string[];
    reference: MyContentType;
    references: MyContentType[];
    richText: Document;
  };
}

// the following types are equivalent
type GqlMyContentType1 = GqlEntry<MyContentType>;

function example1(entry: GqlMyContentType1) {
  // the GraphQL ContentfulMetadata type is added as an optional field
  entry.contentfulMetadata?.tags?.forEach((t) => {
    t.id;
    t.name;
  });

  // scalar fields maintain their type
  entry.scalar = true;

  // optional fields can also be assigend to null in addition to undefined
  entry.optional = 1;
  entry.optional = null;
  entry.optional = undefined;

  // scalar arrays maintain their name
  entry.scalarArray = ["foo", "bar"];

  // references are converted recursively
  // however all required fields are marked optional
  // since there's no way to indicate which fields are included in the GraphQL query
  entry.reference.scalar = true;
  entry.reference.scalar = undefined;
  entry.reference.optional = 1;
  entry.reference.optional = undefined;

  // reference arrays are automatically renamed and typed as collections
  entry.referencesCollection.items![0].scalar = true;
  entry.referencesCollection.items![0].optional = 1;

  // rich text fields are cast to GraphQL's rich text type
  entry.richText.json = {} as unknown as Document;

  // field is mapped to GraphQL rich text type
  entry.richText.json = {} as unknown as Document;

  // assets are mapped to GraphQL Asset type
  entry.richText.links!.assets!.block![0].url = "value";

  // entries don't provide much type safety with the default options, but this can be customized
  entry.richText.links!.entries!.block![0]!.contentfulMetadata = {
    tags: [],
  };
}
```

The `sys` and `__typename` fields are not included by default.
To add them, simply configure their values to `true`.

```ts
type GqlMyContentType2 = GqlEntry<
  MyContentType,
  {
    sys: true;
    __typename: true;
  }
>;

function example2(entry: GqlMyContentType2) {
  // sys is included with all fields
  entry.sys.id = "foo";
  entry.sys.spaceId = "bar";
  entry.sys.environmentId = "baz";

  // __typename is included with constant type
  entry.__typename = "MycontentType";
}
```

Field names can be changed by specifying a field map.
Omitted fields are excluded from the returned type.

```ts
type GqlMyContentType3 = GqlEntry<
  MyContentType,
  {
    sys: {
      id: true;
      publishedAt: "published_at";
    };
    __typename: "type";
    fields: {
      scalarArray: "scalar_array";
    };
  }
>;

function example3(entry: GqlMyContentType3) {
  // sys fields names are mapped
  entry.sys.id = "foo";
  entry.sys.published_at = "bar";

  // __typename field is mapped
  entry.type = "MycontentType";

  // other fields names are mapped
  entry.scalar_array = ["foo", "bar"];
}
```

Nested references inherit `sys` and `__typename` configurations from the parent.
However, these can be customized if necessary:

```ts
type GqlMyContentType4 = GqlEntry<
  MyContentType,
  {
    sys: {
      id: "Id";
      publishedAt: "PublishedAt";
    };
    __typename: "type";
    references: {
      sys: {
        id: "NestedId";
      };
      __typename: "nestedType";
      // references can be specified here or inherited from the parent
    };
    fields: {
      reference: "Reference";
    };
  }
>;

function example4(entry: GqlMyContentType4) {
  // sys/__typename field names are mapped accordingly
  entry.sys.Id = "value";
  entry.sys.PublishedAt = "value";
  entry.type = "MycontentType";

  // field and nested sys/__typename fields are mapped accordingly
  entry.Reference.sys!.NestedId = "value";
  entry.Reference.nestedType = "MycontentType";

  // deeper nesting inherit last specified parent's mappings
  // limitation: fields cannot be inherited as the references may refer to other content types
  entry.Reference.reference!.sys!.NestedId = "value";
  entry.Reference.reference!.nestedType = "MycontentType";
}
```

Finally, rich text linked entries can be constrained to provide type safety as shown below:

```ts
interface FooContentType {
  sys: { contentType: { sys: { id: "foo" } } };
  fields: { foo: string };
}

interface BarContentType {
  sys: { contentType: { sys: { id: "bar" } } };
  fields: { bar: string };
}

type GqlMyContentType5 = GqlEntry<
  MyContentType,
  object, // default options
  // supports raw entries or GqlEntry
  | GqlEntry<FooContentType, { __typename: "type" }>
  | GqlEntry<BarContentType, { __typename: "type" }>
>;

function example5(entry: GqlMyContentType5) {
  // field is mapped to GraphQL rich text type
  entry.richText.json = {} as unknown as Document;

  // assets are mapped to GraphQL Asset type
  entry.richText.links!.assets!.block![0].contentType = "a";

  // references are constrained to the specified types
  const reference = entry.richText.links?.entries?.block?.[0];
  switch (reference?.type) {
    case "Foo": {
      reference.foo = "baz";
      break;
    }
    case "Bar": {
      reference.bar = "baz";
      break;
    }
  }
}
```
