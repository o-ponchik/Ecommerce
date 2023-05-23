import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Image from "next/image";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";

const Navabar = () => {
  const { locale } = useRouter();

  const { showCart, setShowCart, totalQuantities, showIconCart, setLanguage } =
    useStateContext();
  const [activeUkr, setActiveUkr] = useState(locale === "uk");

  const changeLanguage = (newLocale) => {
    setLanguage(newLocale);
    setActiveUkr(newLocale === "uk");
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <div className="logo">
          <Link href="/" passHref>
            <a>
              <Image
                src="/logo-pink.svg"
                width={100}
                height={50}
                alt="Rosy Fox Logo"
              />
            </a>
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
            <Link href="#" locale={"en"}>
              <button
                className={`lang-btn ${!activeUkr ? "active" : ""}`}
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
            </Link>

            <span>|</span>
            <Link href="#" locale={"uk"}>
              <button
                className={`lang-btn ${activeUkr ? "active" : ""}`}
                onClick={() => changeLanguage("uk")}
              >
                UKR
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navabar;
