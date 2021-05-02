import React, { createContext, useContext, useState } from "react";

export const AttachmentContext = createContext<any>({});

export const AttachmentProvider: React.FC = ({ children }) => {
  return (
    <AttachmentContext.Provider value={{ value: "Ranganath" }}>
      {children}
    </AttachmentContext.Provider>
  );
};
