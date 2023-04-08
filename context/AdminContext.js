import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const AdminContext = ({ children }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export const useAdminContext = () => useContext(Context);
