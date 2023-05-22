"use client";
import React, { Dispatch, SetStateAction, use } from "react";
import { useCartContext } from "../context/cartContext";
import { IoMdClose } from "react-icons/io";
import { CartItemDetail } from "../types/types";
import CartItem from "./CartItem";
import { getStripe } from "./Navbar";
import { toast } from "react-hot-toast";

interface MiniCartProps {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}

const MiniCartDetails: React.FC<MiniCartProps> = ({
  isCartOpen,
  setIsCartOpen,
}) => {
  const { cartItems, totalQuantity, totalAmount } = useCartContext();
  
  const handleSubmit = async () => {
    const stripe = await getStripe();
    const checkoutItems = cartItems.map(
      ({ product: { _id, name }, size, grind, quantity }) => ({
        id: _id,
        name,
        size,
        grind,
        quantity,
      })
    );
    if (stripe) {
      const response = await fetch("/api/checkout_sessions  ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutItems),
      });

      if (response.status === 500) return;

      const data = await response.json();
      if (data.message) {
        toast.error(data.message, { duration: 5000 });
        return;
      }

      toast.loading("Redirecting...");
      stripe.redirectToCheckout({ sessionId: data.session.id });
    }
  };
  return (
    <>
      <div className={`mini-cart-container ${isCartOpen ? "show-cart" : ""}`}>
        <header className="mini-cart__header">
          <button className="icon-btn" onClick={() => setIsCartOpen(false)}>
            <IoMdClose />
          </button>{" "}
          <h2>My Cart</h2>
          <span>{totalQuantity} item(s)</span>
        </header>
        <section
          className={
            cartItems.length > 0 ? "mini-cart__list" : "mini-cart__empty"
          }
        >
          {cartItems.length > 0 ? (
            cartItems.map((item: CartItemDetail) => (
              <CartItem
                key={`${item.product._id}_${item.size}_${item.grind}`}
                item={item}
              />
            ))
          ) : (
            <p>Your shopping cart is empty.</p>
          )}
        </section>
        {cartItems.length > 0 && (
          <section className="mini-cart__summary">
            <p>
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </p>
            <p>
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </p>
            <p className="summary__total">
              <span>Total</span>
              <span>To be determined</span>
            </p>

            <button className="btn" onClick={handleSubmit}>
              Proceed to Checkout
            </button>
          </section>
        )}
      </div>
    </>
  );
};

export default MiniCartDetails;
