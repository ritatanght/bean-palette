import { NextResponse } from "next/server";
import { client } from "../../../../../sanity/lib/client";

export async function POST(req: Request) {
  try {
    const { token, formData } = await req.json();

    // check email format
    const checkEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email);
    if (!checkEmail) throw Error("The email is invalid.");

    // verify token
    const key = process.env.NEXT_PUBLIC_CAPTCHA_SECRET_KEY;
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${key}&response=${token}`,
      { method: "POST" }
    );
    const captchaResponse = await res.json();

    // create message upon successful validation
    if (captchaResponse.success) {
      const doc = {
        _type: "contact",
        ...formData,
      };
      const createdDoc = await client.create(doc);
      return NextResponse.json({ status: 201 });
    } else {
      throw Error("reCAPTCHA verification failed, please try again.");
    }
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({
        message: err.message,
      });
    }
  }
}
