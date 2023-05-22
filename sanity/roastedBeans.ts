import {
  defineType,
  defineField,
  defineArrayMember,
  SanityDocument,
  ArrayOptions,
} from "sanity";
import { client } from "./lib/client";

export default defineType({
  title: "Product",
  name: "product",
  type: "document",
  fields: [
    defineField({
      title: "Image",
      name: "image",
      type: "array",
      of: [defineArrayMember({ type: "image" })],
      options: { hotspot: true } as ArrayOptions<boolean>,
    }),
    defineField({
      title: "Name",
      name: "name",
      type: "string",
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: async (doc: SanityDocument): Promise<string> => {
          const countDoc = await client.fetch('count(*[_type == "product"])');
          if (countDoc) return `${doc.name}-${countDoc + 1}`;
          return doc.name as string;
        },
        maxLength: 80,
      },
    }),
    defineField({
      title: "Size and Price",
      name: "sizePrice",
      type: "array",
      of: [
        defineArrayMember({
          type: "sizePrice",
        }),
      ],
      initialValue: [
        { size: "50g", price: 3.5 },
        { size: "100g", price: 8 },
        { size: "250g", price: 15 },
      ],
      validation: (rule) => rule.unique(),
    }),

    {
      title: "Description",
      name: "description",

      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
          ],
        },
        { type: "image" },
      ],
    },
    defineField({
      title: "InStock",
      name: "isInStock",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
