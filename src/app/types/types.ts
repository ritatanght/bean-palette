import { Dispatch, SetStateAction } from "react";
import { ImageAsset, PortableTextBlock } from "sanity";
interface Slug {
  current: string;
  _type: "slug";
}

interface SizePriceObj {
  size: string;
  price: number;
  _key: string;
}

export interface ProductData {
  _id: string;
  isInStock: boolean;
  image: ImageAsset[];
  _createdAt: string;
  sizePrice: SizePriceObj[];
  name: string;
  description: PortableTextBlock;
  slug: Slug;
}

export interface CartItemDetail {
  product: ProductData;
  size: string;
  price: number;
  grind: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItemDetail[];
  totalQuantity: number;
  totalAmount: number;
  addToCart: (newItem: CartItemDetail) => void;
  toggleQuantity: (
    id: string,
    grind: string,
    size: string,
    quantity: number,
    type: string
  ) => void;
  removeFromCart: (id: string, grind: string, size: string) => void;
  setCartItems: Dispatch<SetStateAction<CartItemDetail[]>>;
}

export interface CheckoutItem {
  id: string;
  name: string;
  quantity: number;
  size: string;
  grind: string;
}

export type CheckProductData = Pick<
  ProductData,
  "_id" | "sizePrice" | "isInStock"
>;
