import React, { useEffect } from "react";
import { client } from "../lib/client";
import { HeroBanner, Product, FooterBanner } from "../components";
import { useStateContext } from "../context/StateContext";
import { updateCartFromLocalStorage } from "../utils/localStorageUtil";
import { FormattedMessage } from "react-intl";

const Home = ({ products, bannerData }) => {
  const { setCartItems, setTotalPrice, setTotalQuantities, setShowIconCart } =
    useStateContext();

  useEffect(() => {
    setShowIconCart(true);
    updateCartFromLocalStorage(setCartItems, setTotalPrice, setTotalQuantities);
  }, []);

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>
          {" "}
          <FormattedMessage id="subheader1.home" />
        </h2>
        <p>
          <FormattedMessage id="subheader2.home" />
        </p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return { props: { products, bannerData } };
};

export default Home;
