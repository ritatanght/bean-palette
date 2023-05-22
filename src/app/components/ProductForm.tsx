"use client";
import { ChangeEvent, useState } from "react";
import { CartContextType, CartItemDetail, ProductData } from "../types/types";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useCartContext } from "../context/cartContext";

const ProductForm: React.FC<{ product: ProductData }> = ({ product }) => {
  const { name, sizePrice } = product;
  const [size, setSize] = useState(sizePrice[0].size);
  const [price, setPrice] = useState(sizePrice[0].price);
  const [grind, setGrind] = useState("Whole Bean");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartContext() as CartContextType;

  const grindOptions = [
    "Whole Bean",
    "For Espresso",
    "For French press",
    "For Filter drip",
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
    const sizePricePair = sizePrice.find(
      (item) => item.size === e.target.value
    );
    if (sizePricePair) {
      setPrice(sizePricePair.price);
    }
  };

  const handleQuantityChange = (type: string) => {
    if (type === "add") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (type === "minus") {
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
                }`}
              >
                <input
                  type="radio"
                  value={item.size}
                  name="size"
                  checked={size === item.size}
                  onChange={handleChange}
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
              className={`product-grind ${grind === option ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="grind"
                value={option}
                checked={grind === option}
                onChange={(e) => setGrind(e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      </section>
      <section>
        <strong>Quantity:</strong>
        <div className="qty-selector-container">
          <button
            className="minus-qty icon-btn"
            aria-label="Decrease quantity"
            onClick={() => handleQuantityChange("minus")}
          >
            <HiMinusSm />
          </button>
          <input
            type="number"
            min="1"
            name="quantity"
            value={quantity}
            className="quantity-num text-center"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button
            className="add-qty icon-btn"
            aria-label="Increase quantity"
            onClick={() => handleQuantityChange("add")}
          >
            <HiPlusSm />
          </button>
        </div>
      </section>
      <button className="btn to-cart-btn" onClick={handleAddCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductForm;
