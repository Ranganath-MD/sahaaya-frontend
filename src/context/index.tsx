import React from "react";
import { LayoutProvider } from "./layoutContext";
import { AuthProvider } from "./authContext";
import { RouteComponentProps } from "@reach/router";

export const Provider: React.FC<RouteComponentProps> = ({ children }) => {
  return (
    <LayoutProvider>
      <AuthProvider>
        { children }
      </AuthProvider>
    </LayoutProvider>
  );
};

export * from "./layoutContext";
export * from "./authContext";