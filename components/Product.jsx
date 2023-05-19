import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { useStateContext } from "../context/StateContext";

const Product = ({ product: { name, image, slug, price } }) => {
  const { language } = useStateContext();
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            alt=""
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name[language]}</p>
          <p className="product-price">₴{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
