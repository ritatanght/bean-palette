"use client";
import Image from "next/image";
import { useState } from "react";
import { ImageAsset } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

interface Props {
  name: string;
  images: ImageAsset[];
}

const ProductImage: React.FC<Props> = ({ name, images }) => {
  const [index, setIndex] = useState(0);

  const handleArrowClick = (action: string) => {
    if (action === "prev") {
      setIndex((prevInd) =>
        prevInd - 1 < 0 ? images.length - 1 : prevInd - 1
      );
    } else {
      setIndex((prevInd) =>
        prevInd + 1 > images.length - 1 ? 0 : prevInd + 1
      );
    }
  };

  return (
    <div className="product-image-container">
      <div className="product-large">
        <button
          className="icon-btn prev-btn"
          aria-label="Previous Image"
          onClick={() => handleArrowClick("prev")}
        >
          <IoMdArrowDropleftCircle />
        </button>
        <Image
          src={urlForImage(images && images[index]).url()}
          alt={name}
          fill={true}
          sizes="(max-width: 650px) 90vw, (max-width: 1200px) 45vw, 30vw"
          priority
        />
        <button
          className="icon-btn next-btn"
          aria-label="Next Image"
          onClick={() => handleArrowClick("next")}
        >
          <IoMdArrowDroprightCircle />
        </button>
      </div>
      <div className="product-thumbnails">
        {images.map((img, ind) => (
          <div
            className={`thumbnail ${index === ind ? "current" : ""}`}
            key={img._key as React.Key}
            onClick={() => setIndex(ind)}
          >
            <Image
              src={urlForImage(img).url()}
              alt={name}
              fill={true}
              sizes="100px"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
