import React from "react";

import Link from "next/link";
import { urlFor } from "../lib/client";
import { useStateContext } from "../context/StateContext";
import { FormattedMessage } from "react-intl";

const HeroBanner = ({ heroBanner }) => {
  console.log({ heroBanner });
  const { language } = useStateContext();

  // Access the translation based on the selected language
  const description = heroBanner.desc[language];

  return (
    <div className="hero-banner-container">
      <div className="hero-banner-wrapper">
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText1[language]}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <div>
          <Link href={`/product/${heroBanner.productSlug}`}>
            <button className="hero-banner-button" type="button">
              <FormattedMessage id="banner.button.text" />
            </button>
          </Link>
          <div className="desc">
            <h5>
              <FormattedMessage id="description.banner.text" />
            </h5>
            {/* <p>{heroBanner.desc}</p> */}
            <p>{description}</p>
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
