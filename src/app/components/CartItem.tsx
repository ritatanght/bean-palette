import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "../../../sanity/lib/image";
import { CartItemDetail } from "../types/types";
import { RiDeleteBin2Line } from "react-icons/ri";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useCartContext } from "../context/cartContext";

const CartItem: React.FC<{ item: CartItemDetail }> = ({ item }) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const { toggleQuantity, removeFromCart } = useCartContext();
  const {
    product: { _id: id, slug:{current:slug}, name, image },
    size,
    grind,
    price,
  } = item;

  const handleQuantityChange = (inputVal: string, type: string) => {
    if (type === "input") {
      toggleQuantity(id, grind, size, Number(inputVal), type);
      setQuantity(Number(inputVal));
    } else if (type === "add" || type === "minus") {
      toggleQuantity(id, grind, size, quantity, type);
      if (type === "add") {
        setQuantity((prevQty) => prevQty + 1);
      } else {
        setQuantity((prevQty) => {
          if (prevQty - 1 < 1) return 1;
          return prevQty - 1;
        });
      }
    }
  };

  return (
    <div className="mini-cart__item">
      <div className="mini-cart__item-image">
        <Image
          src={urlForImage(image[0]).url()}
          alt={name}
          width={50}
          height={50}
        />
      </div>
      <div className="mini-cart__item-text">
        <Link href={`/product/${slug}`}>
          <h3 className="mini-cart__item-name">
            {name.length > 25 ? name.slice(0, 25) + "..." : name}
          </h3>
          <p>
            <strong>Size:</strong> {size}
          </p>
          <p>
            <strong>Grind:</strong> {grind}
          </p>
        </Link>
      </div>

      <div className="qty-selector-container mini-cart__qty-selector">
        <button
          className="minus-qty icon-btn"
          aria-label="Decrease quantity"
          onClick={() => handleQuantityChange("", "minus")}
        >
          <HiMinusSm />
        </button>
        <input
          type="number"
          min="1"
          name="quantity"
          value={quantity}
          className="quantity-num text-center"
          onChange={(e) => handleQuantityChange(e.target.value, "input")}
        />
        <button
          className="add-qty icon-btn"
          aria-label="Increase quantity"
          onClick={() => handleQuantityChange("", "add")}
        >
          <HiPlusSm />
        </button>{" "}
      </div>
      <span className="mini-cart__price"> × CAD ${price.toFixed(2)}</span>
      <button
        className="icon-btn remove-btn"
        aria-label="Remove Item"
        onClick={() => removeFromCart(id, grind, size)}
      >
        <RiDeleteBin2Line />
      </button>
    </div>
  );
};
export default CartItem;
