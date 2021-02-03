import React from "react";
import { SiteProvider } from "./siteContext";
import { LayoutProvider } from "./layoutContext";
import { RouteComponentProps } from "@reach/router";

export const Provider: React.FC<RouteComponentProps> = ({ children }) => {
  return (
    <SiteProvider>
      <LayoutProvider>
        { children }
      </LayoutProvider>
    </SiteProvider>
  );
};

export * from "./layoutContext";
export * from "./siteContext";