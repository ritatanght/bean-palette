"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { submitForm } from "../api/service";

const ContactForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    toggleCaptchaBadge(true);
    return () => toggleCaptchaBadge(false);
  }, []);

  const loadRecaptcha = async () => {
    const token = await window.grecaptcha.execute(
      process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY,
      { action: "formSubmit" }
    );
    return token;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = await loadRecaptcha();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    if (name && email && message) {
      const toastId = toast.loading("Submitting...");
      if (token) {
        try {
          const data = await submitForm(token, { name, email, message });
          if (data.status === 201) {
            toast.success("Message sent", { id: toastId });
            setFormSubmitted(true);
          } else if (data.message) {
            toast.error(data.message, { id: toastId });
            return;
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message, { id: toastId });
          }
          console.log(error);
        }
      } else {
        toast.error("There is a problem with the captcha, please try again", {
          id: toastId,
        });
      }
    } else {
      toast.error("All form fields are required");
    }
  };

  return (
    <>
      {!formSubmitted ? (
        <form className="contact__form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <textarea name="message" placeholder="Message"></textarea>
          <input className="btn" type="submit" value="Submit" />
        </form>
      ) : (
        <p className="text-center contact__text">
          Your message has been received. We&apos;ll be in touch with you
          shortly. Thank you!
        </p>
      )}
    </>
  );
};

export default ContactForm;

const toggleCaptchaBadge = (show: boolean) => {
  const badge = document.getElementsByClassName("grecaptcha-badge")[0];
  if (badge && badge instanceof HTMLElement) {
    badge.style.visibility = show ? "visible" : "hidden";
  }
};
