import React from "react";
import { Seo } from "../../components/layout/Seo";
import { RouteComponentProps } from "@reach/router";

export const BrowseFundriser: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Seo title="Browse Fundriser"/>
      <h1>Browse Fundriser</h1>
    </>
  );
};

