import React from "react";
import { Header } from "./header/Header";
import { Footer } from "./Footer";
import { HelmetProvider } from "react-helmet-async";
// import { NetworkStatus } from "../networkStatus/NetworkStatus";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HelmetProvider>
      <Header />
      {/* <NetworkStatus /> */}
      <div style={{ minHeight: "83vh" }}>
        {children}
      </div>
      <Footer />
    </HelmetProvider>
  );
};

export * from "./Seo";
