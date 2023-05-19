import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Image from "next/image";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

const Navabar = () => {
  const { showCart, setShowCart, totalQuantities, showIconCart, setLanguage } =
    useStateContext();
  const [activeUkr, setActiveUkr] = useState(true);

  const changeLanguage = (l) => {
    if (l === "en") {
      setLanguage("en");
      setActiveUkr(false);
    } else {
      setLanguage("uk");
      setActiveUkr(true);
    }
  };

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

        <div className="navbar-buttons-wrapper">
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
          <div>
            <button
              className={`lang-btn ${!activeUkr ? "active" : ""}`}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <span>|</span>
            <button
              className={`lang-btn ${activeUkr ? "active" : ""}`}
              onClick={() => changeLanguage("uk")}
            >
              UKR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navabar;
