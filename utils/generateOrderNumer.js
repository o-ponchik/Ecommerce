export const generateOrderNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  let orderNumber = "";
  for (let i = 0; i < 3; i++) {
    orderNumber += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 3; i++) {
    orderNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return orderNumber;
};
