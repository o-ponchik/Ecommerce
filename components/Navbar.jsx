import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

const Navabar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <p className="logo">
          <Link href="/">LogoCandles</Link>
        </p>

        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />

          <span className="cart-item-qty">{totalQuantities}</span>
        </button>

        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navabar;
