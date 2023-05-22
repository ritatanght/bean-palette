"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const Banner = () => {
  const [bannerInd, setBannerInd] = useState(0);
  useEffect(() => {
    const changeBanner = () => {
      const bannerLength = 2;
      setBannerInd((prevInd) =>
        prevInd + 1 === bannerLength ? 0 : prevInd + 1
      );
    };
    const intervalID = setInterval(changeBanner, 5000);
    return () => clearInterval(intervalID);
  }, []);
  const freeBagBanner = (
    <div className={`banner__bag ${bannerInd === 0 ? "current-banner" : ""}`}>
      <h2 className="banner__heading">Claim your FREE exclusive tote bag</h2>
      <h3 className="banner__subheading">
        with the purchase of any of our coffee beans
      </h3>
      <Image
        src="/tote-bag.png"
        alt="Bean Palette's tote bag"
        className="banner__gift-image"
        width={232}
        height={270}
      />
      <p>
        Act fast, as this offer is limited to the first 100 orders only. Embark
        on your coffee journey with us in style!
      </p>
    </div>
  );

  const freeShippingBanner = (
    <div
      className={`banner__shipping ${bannerInd === 1 ? "current-banner" : ""}`}
    >
      <h2 className="banner__heading">
        Free shipping on orders over CAD $50.00
      </h2>
    </div>
  );

  return (
    <div className="hero-banner-container text-center">
      {freeBagBanner}
      {freeShippingBanner}
    </div>
  );
};

export default Banner;
