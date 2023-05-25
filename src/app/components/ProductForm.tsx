"use client";
import { useState } from "react";
import { CartContextType, CartItemDetail, ProductData } from "../types/types";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import {
  BsFacebook,
  BsTwitter,
  BsLink45Deg,
  BsFillShareFill,
} from "react-icons/bs";
import { useCartContext } from "../context/cartContext";
import { usePathname } from "next/navigation";

const ProductForm: React.FC<{ product: ProductData }> = ({ product }) => {
  const { name, sizePrice, isInStock } = product;
  const [size, setSize] = useState(isInStock ? sizePrice[0].size : "");
  const [price, setPrice] = useState(sizePrice[0].price);
  const [grind, setGrind] = useState(isInStock ? "Whole Bean" : "");
  const [quantity, setQuantity] = useState(isInStock ? 1 : 0);
  const { addToCart } = useCartContext() as CartContextType;
  const pathname = usePathname();
  const path =
    typeof location === "undefined" ? "" : location.origin + pathname;

  const grindOptions = [
    "Whole Bean",
    "For Espresso",
    "For French press",
    "For Filter drip",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
    const sizePricePair = sizePrice.find(
      (item) => item.size === e.target.value
    );
    if (sizePricePair) {
      setPrice(sizePricePair.price);
    }
  };

  const handleQuantityChange = (type: string) => {
    if (type === "add" && isInStock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (type === "minus" && isInStock) {
      setQuantity((prevQuantity) => {
        if (prevQuantity - 1 < 1) return 1;
        return prevQuantity - 1;
      });
    }
  };

  const handleAddCart = () => {
    const item: CartItemDetail = { product, size, price, grind, quantity };
    addToCart(item);
  };

  return (
    <div className="product-form-container">
      <h2 className="product-name">{name}</h2>
      <p className="product-price">CAD ${price.toFixed(2)}</p>
      <section>
        <strong>Size:</strong>
        <div className="size-options-container">
          {sizePrice &&
            sizePrice.map((item) => (
              <label
                key={item._key}
                className={`product-size ${
                  size === item.size ? "selected" : ""
                }${isInStock ? "" : "disabled"}`}
              >
                <input
                  type="radio"
                  value={item.size}
                  name="size"
                  checked={size === item.size}
                  onChange={handleChange}
                  disabled={!isInStock}
                />
                {item.size}
              </label>
            ))}
        </div>
      </section>
      <section>
        <strong>Grind:</strong>
        <div className="grind-options-container">
          {grindOptions.map((option) => (
            <label
              key={option}
              className={`product-grind ${grind === option ? "selected" : ""}${
                isInStock ? "" : "disabled"
              }`}
            >
              <input
                type="radio"
                name="grind"
                value={option}
                checked={grind === option}
                onChange={(e) => setGrind(e.target.value)}
                disabled={!isInStock}
              />
              {option}
            </label>
          ))}
        </div>
      </section>
      <div className="product-share__container">
        <button className="icon-btn share-icon">
          <BsFillShareFill />
        </button>
        <ul aria-label="Social media share icons" className="social-share-list">
          <li>
            <a
              aria-label="Facebook"
              href={`https://www.facebook.com/sharer.php?u=${path}`}
              target="_blank"
              className="icon-btn"
              style={{ color: "#1877F2" }}
            >
              <BsFacebook />
            </a>
          </li>
          <li>
            <a
              aria-label="Twitter"
              href={`https://twitter.com/intent/tweet?url=${path}&text=${encodeURIComponent(
                "Take a look at this!"
              )}`}
              target="_blank"
              className="icon-btn"
              style={{ color: "#08A0E9" }}
            >
              <BsTwitter />
            </a>
          </li>
          <li>
            <button
              aria-label="Copy URL"
              className="icon-btn copy-link-btn"
              onClick={() => navigator.clipboard.writeText(path)}
            >
              <BsLink45Deg />
            </button>
          </li>
        </ul>
      </div>
      <section>
        <strong>Quantity:</strong>
        <div className="qty-selector-container">
          <button
            className="minus-qty icon-btn"
            aria-label="Decrease quantity"
            disabled={!isInStock}
            onClick={() => handleQuantityChange("minus")}
          >
            <HiMinusSm />
          </button>
          <input
            type="number"
            min={isInStock ? 1 : 0}
            name="quantity"
            value={quantity}
            className="quantity-num text-center"
            disabled={!isInStock}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button
            className="add-qty icon-btn"
            aria-label="Increase quantity"
            disabled={!isInStock}
            onClick={() => handleQuantityChange("add")}
          >
            <HiPlusSm />
          </button>
        </div>
      </section>
      <button
        className="btn to-cart-btn disabled-btn"
        onClick={handleAddCart}
        disabled={!isInStock}
      >
        {isInStock ? "Add to Cart" : "Sold Out"}
      </button>
    </div>
  );
};

export default ProductForm;
