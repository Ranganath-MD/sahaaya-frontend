import React from "react";
import { LayoutProvider } from "./layoutContext";
import { RouteComponentProps } from "@reach/router";

export const Provider: React.FC<RouteComponentProps> = ({ children }) => {
  return (
    <LayoutProvider>
      { children }
    </LayoutProvider>
  );
};

export * from "./layoutContext";