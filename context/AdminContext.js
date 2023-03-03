import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const AdminContext = ({ children }) => {
  const [showDashboard, setShowDashboard] = useState(true);

  return (
    <Context.Provider value={{ showDashboard, setShowDashboard }}>
      {children}
    </Context.Provider>
  );
};

export const useAdminContext = () => useContext(Context);
