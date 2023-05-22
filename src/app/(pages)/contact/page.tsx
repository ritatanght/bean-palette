"use client";
import { useEffect } from "react";
import "./contact.css";
import ContactForm from "@/app/components/ContactForm";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const Contact = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <main className="container page-container">
      <h2>Contact Us</h2>
      <div className="contact-page-wrapper">
        <p className="contact__text">
          We would love to hear from you! If you have any questions, comments,
          or feedback, please don&apos;t hesitate to get in touch with us.
          Simply fill out and submit the contact form, and we will get back to
          you as soon as possible.
        </p>
        <ContactForm />
      </div>
    </main>
  );
};


export default Contact;
