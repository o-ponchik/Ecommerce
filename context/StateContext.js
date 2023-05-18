import React, { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [showIconCart, setShowIconCart] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [language, setLanguage] = useState("uk");

  // -----User Info----//
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [details, setDetails] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  //-----Form inputs validation------
  const [formInputsValidity, setFormInputsValidity] = useState({
    inputFirstName: true,
    inputLastName: true,
    inputPhone: true,
    inputEmail: true,
    inputAddress: true,
    inputCity: true,
    inputPostalCode: true,
    inputCountry: true,
  });

  let foundProduct;
  let index;

  const updateLocalStorage = (cartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

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
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      // if we add a new product to the card: change the amount of this product
      product.quantity = quantity;

      // update the cart with this product inside
      setCartItems([...cartItems, { ...product }]);
    }

    setQty(1);

    toast.success(`${qty} ${product.name} added to the cart.`);

    updateLocalStorage(cartItems);
  };

  useEffect(() => {
    updateLocalStorage(cartItems);
  }, [cartItems]);

  // remove product from the Cart list
  const onRemove = (product) => {
    foundProduct = cartItems.filter((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct[0].price * foundProduct[0].quantity
    );
    setTotalQuantities(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct[0].quantity
    );
    setCartItems(newCartItems);
    updateLocalStorage(newCartItems);
  };

  // Change quantity of product in the cart and update cart with new qauntity of products, total price and price of product
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      newCartItems.splice(index, 0, {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      });

      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        newCartItems.splice(index, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        });

        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1);
      }
    }
    updateLocalStorage(newCartItems);
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

  const clearCart = () => {
    setCartItems([]);
    setTotalQuantities(0);
    setTotalPrice(0);
    localStorage.clear();
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setCity("");
    setState("");
    setPostalCode("");
    setCountry("");
    setDetails("");
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        showIconCart,
        setShowIconCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        phone,
        setPhone,
        email,
        setEmail,
        address,
        setAddress,
        city,
        setCity,
        state,
        setState,
        postalCode,
        setPostalCode,
        country,
        setCountry,
        details,
        setDetails,
        orderNumber,
        setOrderNumber,
        formInputsValidity,
        setFormInputsValidity,
        clearCart,
        resetForm,
        language,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
