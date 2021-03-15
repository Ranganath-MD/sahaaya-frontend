import React, { createContext, useState } from "react";

interface InitState {
  openDrawer?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleDrawer?: (e: React.KeyboardEvent | React.MouseEvent) => void;
}

export const LayoutContext = createContext<InitState>({});

export const LayoutProvider: React.FC = ({ children }) => {
  const [ openDrawer, setOpenDrawer ] = useState(false);

  const handleDrawer = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (
      e?.type === "keydown" &&
      ((e as React.KeyboardEvent).key === "Tab" ||
        (e as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(!openDrawer);
  };
  return (
    <LayoutContext.Provider value={{
      openDrawer, handleDrawer
    }}>
      {children}
    </LayoutContext.Provider>
  );
};
