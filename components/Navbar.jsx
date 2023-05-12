import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Image from "next/image";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

const Navabar = () => {
  const { showCart, setShowCart, totalQuantities, showIconCart } =
    useStateContext();

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <div className="logo">
          <Link href="/">
            <Image
              src="/logo-pink.svg"
              width={100}
              height={50}
              alt="Rosy Fox Logo"
            />
          </Link>
        </div>

        {showIconCart && (
          <button
            type="button"
            className="cart-icon"
            onClick={() => {
              setShowCart(true);
            }}
          >
            <AiOutlineShopping />

            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        )}

        {showCart && <Cart />}
        {/* <Cart /> */}
      </div>
    </div>
  );
};

export default Navabar;
