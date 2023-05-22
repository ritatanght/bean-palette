import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { client } from "../../../../sanity/lib/client";
import { CheckProductData, CheckoutItem } from "@/app/types/types";
import { stripe } from "../service";
import Stripe from "stripe";

export async function POST(req: Request) {
  const headersList = headers();
  const origin = headersList.get("origin");
  let total = 0;

  try {
    const body = await req.json();
    const list = [...new Set(body.map((item: CheckoutItem) => `"${item.id}"`))];
    const query = `*[_type=="product" && _id in [${list}] ]{_id, sizePrice, isInStock}`;

    // retrieve prices and availability from database for confirmation
    const data: CheckProductData[] = await client.fetch(query);
    if (!data)
      throw new Error("Unable to confirm prices, please try again later.");

    //Create Checkout Sessions from body params
    const session = await stripe.checkout.sessions.create({
      line_items: body.map((item: CheckoutItem) => {
        const { id, name, size, grind, quantity } = item;
        const product = data.find(({ _id }) => _id === id);
        const sizePricePair = product?.sizePrice.find(
          (priceLbl) => priceLbl.size === size
        );
        if (!sizePricePair)
          throw new Error("Unable to confirm prices, please try again later.");
        if (!product?.isInStock)
          throw new Error(
            `${name} is out of stock, please clear the item and try again.`
          );
        total += sizePricePair.price * quantity;
        return {
          price_data: {
            currency: "cad",
            product_data: { name, description: `${size} ${grind}` },
            unit_amount: sizePricePair.price * 100,
          },
          quantity: quantity,
        };
      }),
      mode: "payment",
      payment_method_types: ["card", "alipay"],

      shipping_options:
        total >= 50
          ? [{ shipping_rate: "shr_1N74rxEtuaWlx4AyweN4qgOL" }]
          : [
              { shipping_rate: "shr_1N8cFLEtuaWlx4AyMPbFkyUD" },
              { shipping_rate: "shr_1N8cGTEtuaWlx4AyvwOLEaUe" },
            ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
    });

    return NextResponse.json({ status: 200, session });
  } catch (err: unknown) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({
        status: err.statusCode || 500,
        message: err.message,
      });
    } else if (err instanceof Error) {
      return NextResponse.json({
        message: err.message,
      });
    }
  }
}
