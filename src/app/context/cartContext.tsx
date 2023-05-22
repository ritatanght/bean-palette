"use client";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CartContextType, CartItemDetail } from "@/app/types/types";

const CartContext = createContext<CartContextType>({} as any);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItemDetail[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart-items");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    let totalQty = 0;
    let totalAmt = 0;
    cartItems.forEach(({ price, quantity }) => {
      totalQty += quantity;
      totalAmt += price * quantity;
    });
    setTotalQuantity(totalQty);
    setTotalAmount(totalAmt);
  }, [cartItems]);

  const addToCart = (newItem: CartItemDetail) => {
    let checkProductInCart = cartItems.findIndex(
      (i) =>
        i.product._id === newItem.product._id &&
        i.grind === newItem.grind &&
        i.size === newItem.size
    );
    if (checkProductInCart === -1) {
      setCartItems((prevCartItems) => prevCartItems.concat([newItem]));
    } else {
      setCartItems((prevCartItems) =>
        prevCartItems.map((i, ind) =>
          ind === checkProductInCart
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        )
      );
    }
    // setTotalAmount(
    //   (prevTotalAmount) => prevTotalAmount + newItem.price * newItem.quantity
    // );
    // setTotalQuantity(
    //   (prevTotalQuantity) => prevTotalQuantity + newItem.quantity
    // );

    toast.success("Added to Cart");
  };

  const toggleQuantity = (
    id: string,
    grind: string,
    size: string,
    quantity: number,
    type: string
  ) => {
    let productIndex = cartItems.findIndex(
      (i) => i.product._id === id && i.grind === grind && i.size === size
    );
    if (type === "add") {
      setCartItems((prevCartItems) =>
        prevCartItems.map((i, ind) =>
          ind === productIndex ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else if (type === "minus") {
      if (cartItems[productIndex].quantity === 1) {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item, ind) => ind !== productIndex)
        );
        return;
      }
      setCartItems((prevCartItems) =>
        prevCartItems.map((i, ind) => {
          if (ind === productIndex) {
            return { ...i, quantity: i.quantity - 1 };
          } else {
            return i;
          }
        })
      );
    } else {
      setCartItems((prevCartItems) =>
        prevCartItems.map((i, ind) =>
          ind === productIndex ? { ...i, quantity } : i
        )
      );
    }
  };

  const removeFromCart = (id: string, grind: string, size: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter(
        (item) =>
          !(
            item.product._id === id &&
            item.grind === grind &&
            item.size === size
          )
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQuantity,
        totalAmount,
        addToCart,
        toggleQuantity,
        removeFromCart,
        setCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
