import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const AdminContext = ({ children }) => {
  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <Context.Provider value={{ isUpdated, setIsUpdated }}>
      {children}
    </Context.Provider>
  );
};

export const useAdminContext = () => useContext(Context);
