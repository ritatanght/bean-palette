"use client";
import { useState } from "react";
import { useCartContext } from "../context/cartContext";
import Image from "next/image";
import Link from "next/link";
import { GrMenu, GrCart } from "react-icons/gr";
import MiniCartDetails from "./MiniCartDetails";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalQuantity } = useCartContext();
  const toggleSidebar = () => {
    isCartOpen && setIsCartOpen(!isCartOpen);
    isMenuOpen && setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="header">
      <div className="header-container container">
        <button
          aria-label="Open navigation"
          className="mobile-menu icon-btn"
          aria-expanded="false"
          onClick={() => setIsMenuOpen(true)}
        >
          <GrMenu />
        </button>
        <div className="logo-container">
          <Link href="/">
            <Image
              className="logo-image"
              src="/logo.png"
              alt="Bean Palette logo"
              width={100}
              height={100}
              priority
            />
            <span className="logo-text">Bean Palette</span>
          </Link>
        </div>
        <button
          type="button"
          className="cart-icon icon-btn"
          aria-label="View Cart"
          onClick={() => setIsCartOpen(true)}
          data-count={totalQuantity}
        >
          <GrCart />
        </button>
      </div>
      <Toaster />
      <div
        className={`overlay ${isCartOpen || isMenuOpen ? "show-overlay" : ""}`}
        onClick={toggleSidebar}
      ></div>
      <MiniCartDetails isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
};

export default Header;
