import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
  AiOutlineClose,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { FormattedMessage } from "react-intl";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
    showCart,
    language,
  } = useStateContext();

  return (
    <div
      className="cart-wrapper"
      ref={cartRef}
      onClick={(event) => {
        if (event.target.classList.contains("cart-wrapper")) {
          setShowCart(false);
        }
      }}
    >
      <div
        className={`cart-container ${
          showCart ? "cart-appear" : "cart-disappear"
        }`}
      >
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineClose />
          <span className="heading">
            <FormattedMessage id="yourCart.text" />
          </span>
          <span className="cart-num-items">({totalQuantities})</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>
              <FormattedMessage id="emptyCart.text" />
            </h3>
            <Link href="/">
              <button
                type="button"
                className="btn"
                onClick={() => setShowCart(false)}
              >
                <FormattedMessage id="continueShop.cart.button" />
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name[language]}</h5>
                    <h4>₴{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>

                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      className="remove-item"
                      type="button"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom ">
            <div className="total">
              <h3>
                <FormattedMessage id="subtotalCart.text" />:
              </h3>
              <h3>₴ {totalPrice}</h3>
            </div>
            <div className="btn-container">
              <Link href={`/checkout/checkout`}>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setShowCart(false)}
                >
                  <FormattedMessage id="goToCheckout.cart.button" />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
