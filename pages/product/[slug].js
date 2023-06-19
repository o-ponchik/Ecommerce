import React, { useState, useEffect } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import { client, urlFor } from "../../lib/client";
import Product from "../../components/Product";
import { useStateContext } from "../../context/StateContext";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import Image from "next/image";
import { updateCartFromLocalStorage } from "../../utils/localStorageUtil";

const ProductDetails = ({ product, products, bannerData }) => {
  const {
    decreaseQty,
    increaseQty,
    qty,
    onAdd,
    setShowIconCart,
    language,
    setCartItems,
    setTotalPrice,
    setTotalQuantities,
  } = useStateContext();
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setShowIconCart(true);
    updateCartFromLocalStorage(setCartItems, setTotalPrice, setTotalQuantities);
  }, []);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              src={urlFor(image && image[index]).url()}
              alt={name[language]}
              className="product-detail-image"
              width={500}
              height={500}
              loading="lazy"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => {
              return (
                <Image
                  key={i}
                  src={urlFor(item.asset._ref).url()}
                  className={i === index ? "small-image" : "small-image"}
                  alt={name[language]}
                  width={100}
                  height={100}
                  loading="lazy"
                  onMouseEnter={() => setIndex(i)}
                />
              );
            })}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name[language]}</h1>
          {/* <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div> */}
          <h4>
            <FormattedMessage id="details.slug.text" />:
          </h4>
          <p>{details[language]}</p>
          <p className="price">₴ {price}</p>
          <div className="quantity">
            <h3>
              <FormattedMessage id="quantity.slug.text" />:
            </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              <FormattedMessage id="addToCart.button.text" />
            </button>
            <Link href={`/checkout/checkout`}>
              <button
                type="button"
                className="buy-now"
                onClick={() => onAdd(product, qty)}
              >
                <FormattedMessage id="buyNow.button.text" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>
          <FormattedMessage id="subheader.slug" />
        </h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug{
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return { props: { products, product, bannerData } };
};

export default ProductDetails;
