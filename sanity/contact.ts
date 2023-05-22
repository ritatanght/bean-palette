import { defineType, defineField } from "sanity";

export default defineType({
  title: "Contact",
  name: "contact",
  type: "document",
  fields: [
    defineField({ title: "Name", name: "name", type: "string" }),
    defineField({ title: "Email", name: "email", type: "string" }),
    defineField({ title: "Message", name: "message", type: "string" }),
  ],
});
