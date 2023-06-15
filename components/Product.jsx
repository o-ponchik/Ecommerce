import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { useStateContext } from "../context/StateContext";
import Image from "next/image";

const Product = ({ product: { name, image, slug, price } }) => {
  const { language } = useStateContext();
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            src={urlFor(image && image[0])
              .width(250)
              .height(250)
              .url()}
            width={270}
            height={250}
            loading="lazy"
            alt={name[language]}
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
