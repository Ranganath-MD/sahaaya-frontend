import React, { createContext, useState } from "react";

export const TableContext: React.Context<any> = createContext({});

export const TableProvider: React.FC = ({ children }) => {
  const [dense, setDense] = useState(false);
  return (
    <TableContext.Provider
      value={{
        name: "ranganath",
        dense,
        setDense
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
