import React, { createContext, useState } from "react";

interface InitState {
  siteName?: string;
  name?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
}
export const siteContext = createContext<InitState>({});

export const SiteProvider: React.FC = ({ children }) => {
  const [ name, setName ] = useState("fundo");
  return (
    <siteContext.Provider value={{
      name, setName
    }}>
      {children}
    </siteContext.Provider>
  );
};
