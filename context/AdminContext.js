import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const AdminContext = ({ children }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [language, setLanguage] = useState("uk");

  return (
    <Context.Provider
      value={{ isUpdated, setIsUpdated, language, setLanguage }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAdminContext = () => useContext(Context);
