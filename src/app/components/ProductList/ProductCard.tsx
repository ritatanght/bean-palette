import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import { ProductData } from "../../types/types";

interface ProductProps {
  product: ProductData;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const { name, slug, image, sizePrice, isInStock } = product;

  return (
    <>
      <div className={`product-card ${isInStock ? "" : "sold-out"}`}>
        <Link href={`/product/${slug.current}`}>
          <Image
            src={urlForImage(image && image[0]).url()}
            width={250}
            height={250}
            alt={name}
            priority
            className="product-image"
          />

          <p className="product-card__name">
            {name.length > 25 ? name.slice(0, 25) + "..." : name}
          </p>
          <p className="product-card__price">
            {sizePrice.length === 1
              ? `$${sizePrice[0].price}`
              : `from $${sizePrice
                  .sort((a, b) => a.price - b.price)[0]
                  .price.toFixed(2)}`}
          </p>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
