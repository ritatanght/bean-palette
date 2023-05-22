import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "",
  {
    apiVersion: "2022-11-15",
  }
);

export const getSessionDetails = async (sId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sId);
  if (session?.customer_details) {
    return session;
  }
  return null;
};

export const submitForm = async (
  token: string,
  formData: {
    name: FormDataEntryValue;
    email: FormDataEntryValue;
    message: FormDataEntryValue;
  }
) => {
  const res = await fetch("/contact/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, formData }),
  });

  return res.json();
};
