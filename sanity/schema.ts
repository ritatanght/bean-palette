import { type SchemaTypeDefinition } from "sanity";
import roastedBeans from "./roastedBeans";
import sizePrice from "./sizePrice";
import contact from "./contact";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [roastedBeans, sizePrice, contact],
};
