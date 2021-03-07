import React from "react";
import { Header } from "./header/Header";
import { Footer } from "./Footer";
// import { NetworkStatus } from "../networkStatus/NetworkStatus";

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      {/* <NetworkStatus /> */}
      <div style={{ minHeight: "83vh" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};
