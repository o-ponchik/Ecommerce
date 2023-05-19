import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { useStateContext } from "../context/StateContext";
import { FormattedMessage } from "react-intl";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText2,
    desc,
    product,
    buttonText,
    image,
  },
}) => {
  const { language } = useStateContext();

  // Access the translation based on the selected language
  const description = desc[language];

  return (
    <div className="footer-banner-container ">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime[language]}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText2}</h3>
          <p>{description}</p>
          <Link href={`/product/${product}`}>
            <button type="button">
              <FormattedMessage id="banner.button.text" />
            </button>
          </Link>
        </div>

        <img src={urlFor(image)} className="footer-banner-image" />
      </div>
    </div>
  );
};

export default FooterBanner;
