"use client";
import "./success.css";
import { useState, useEffect } from "react";
import { useCartContext } from "../../context/cartContext";
import { getSessionDetails } from "@/app/api/service";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Stripe from "stripe";

const Success = () => {
  const [session, setSession] =
    useState<Stripe.Response<Stripe.Checkout.Session> | null>(null);
  const searchParams = useSearchParams();
  const { setCartItems } = useCartContext();
  useEffect(() => {
    const sId = searchParams?.get("session_id");
    if (sId) {
      getSessionDetails(sId).then(
        (res) => res?.customer_details && setSession(res)
      );
      setCartItems([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <main className="transaction-success-wrapper text-center">
      <h2 className="success__heading">Thank you</h2>
      <h3 className="success__subheading">for your order</h3>
      <hr className="success__divider" />
      <p>
        Dear{" "}
        <span className="customer-name">
          {session?.customer_details
            ? session.customer_details.name
            : "Customer"}
        </span>
        , your order has been successfully placed and confirmed.
      </p>
      <p>
        We are currently processing your order and will send you a confirmation
        email{" "}
        {session?.customer_details ? (
          <>
            at{" "}
            <span className="customer-email">
              {session.customer_details.email}
            </span>
          </>
        ) : (
          ""
        )}{" "}
        once it has been shipped.
      </p>
      <p>
        If you have any questions or need assistance regarding your order,
        please don&apos;t hesitate to contact us. We&apos;re here to help!
      </p>
      <Link href="/" className="btn">
        Return to Home
      </Link>
    </main>
  );
};

export default Success;
