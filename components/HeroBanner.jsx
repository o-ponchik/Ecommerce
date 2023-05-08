import React from "react";

import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button className="hero-banner-button" type="button">
              {heroBanner.buttonText}
            </button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
        <img
          src={urlFor(heroBanner.image)}
          alt="candles"
          className="hero-banner-image"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
