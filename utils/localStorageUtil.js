export const updateCartFromLocalStorage = (
  setCartItems,
  setTotalPrice,
  setTotalQuantities
) => {
  const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (storedCartItems) {
    if (storedCartItems.length > 0) {
      const storedTotalPrice = storedCartItems
        .map((item) => item.price * item.quantity)
        .reduce((prevItem, currItem) => prevItem + currItem);
      const storedTotalQuantities = storedCartItems
        .map((item) => item.quantity)
        .reduce((prevItem, currItem) => prevItem + currItem);

      setCartItems(storedCartItems);
      setTotalPrice(storedTotalPrice);
      setTotalQuantities(storedTotalQuantities);
    } else {
      return;
    }
  }
};
