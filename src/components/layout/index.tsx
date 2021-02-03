import React from "react";
import { Header } from "./header/Header";
import { Footer } from "./Footer";

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "80vh" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};
