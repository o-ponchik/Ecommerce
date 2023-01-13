import React from "react";

import { HeroBanner, Product, FooterBanner } from "../components";

const Home = () => {
  return (
    <>
      <HeroBanner />

      <div className="products-heading">
        <h2>Best handmade candles ever</h2>
        <p>Make home atmosphere more cozy</p>
      </div>
      <div className="products-container">
        {["Product 1", "Product 2"].map((product) => product)}
      </div>
      <FooterBanner />
    </>
  );
};

export default Home;
