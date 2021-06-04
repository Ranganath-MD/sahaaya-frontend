import React, { createContext, useState } from "react";

export const AdminDashboardContext: React.Context<any> = createContext({});

export const AdminDashboardProvider: React.FC = ({ children }) => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(true);
  return (
    <AdminDashboardContext.Provider value={{ openSideBar, setOpenSideBar }}>
      {children}
    </AdminDashboardContext.Provider>
  );
};
