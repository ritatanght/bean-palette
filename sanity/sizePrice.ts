import { ObjectInput, defineField } from "sanity";

export default defineField({
  title: "Size and Price",
  name: "sizePrice",
  type: "object",
  fields: [
    { title: "Size", name: "size", type: "string" },
    { title: "Price", name: "price", type: "number" },
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (fields && fields.size && fields.price) return true;
      return "Both size and price must be input.";
    }),
});
