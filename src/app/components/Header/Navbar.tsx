import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { IoMdClose } from "react-icons/io";
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
    );
  }
  return stripePromise;
};

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav
      aria-label="Primary Navigation"
      className={isMenuOpen ? "show-menu" : ""}
    >
      <button
        className="icon-btn menu-close-btn"
        onClick={() => setIsMenuOpen(false)}
      >
        <IoMdClose />
      </button>
      <ul className="nav__list" role="menubar">
        <li>
          <Link
            href="/"
            className="nav__link"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/faqs"
            className="nav__link"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQs
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="nav__link"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
