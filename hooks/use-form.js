import React from "react";

const useForm = () => {
  const isEmpty = (value) => value.trim() === "";

  const validLenght = (value, num) => value.trim().length >= num;

  const emailValidation = (value) =>
    value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const phoneValidation = (value) => {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(value);
  };

  const postalCodeValidation = (value) => {
    const re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    return re.test(value);
  };

  return {
    isEmpty,
    validLenght,
    emailValidation,
    phoneValidation,
    postalCodeValidation,
  };
};

export default useForm;
