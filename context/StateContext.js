import React, { useState, useEffect, useContext, createContext } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    // we should check if the product that we want to add is aleary has been added before
    // if yes => update total price and qty of product and total qty)
    // if no => add product to the cartItems, change total price, total qty

    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    // change quantity of this particular product, change Total Price,
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);

    // if particular product is already exist in the card: update quantity of all products in the cart
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      // if we add a new product to the card: change the amount of this product
      product.quantity = quantity;

      // update the cart with this product inside
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        onAdd,
      }}
    >
      {console.log(cartItems)}
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
