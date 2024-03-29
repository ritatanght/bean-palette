"use client";
import Image from "next/image";
import { useState } from "react";
import { ImageAsset } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";
import {
  IoMdClose,
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

interface Props {
  name: string;
  images: ImageAsset[];
}

const ProductImage: React.FC<Props> = ({ name, images }) => {
  const [index, setIndex] = useState(0);
  const [showLgImage, setLgImage] = useState(false);

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

  const toggleImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className="product-image-container">
      <div
        className={`overlay enlarge-image-container ${
          showLgImage ? "show-overlay" : ""
        }`}
        onClick={() => setLgImage(false)}
      >
        <div className="enlarge-image">
          <button
            className="icon-btn enlarge-image-close"
            aria-label="Close Enlarged Image"
            onClick={() => setLgImage(false)}
          >
            <IoMdClose />
          </button>
          <Image
            src={urlForImage(images && images[index]).url()}
            alt={name}
            fill={true}
            sizes="(max-width: 650px) 90vw, (max-width: 1200px) 60vw, 50vw"
            priority
            onClick={(e) => toggleImage(e)}
          />
        </div>
      </div>

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
          onClick={() => setLgImage(true)}
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
          <button
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
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
