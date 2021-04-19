import React from "react";
import { Seo } from "components";
import { RouteComponentProps } from "@reach/router";

export const BrowseFundriser: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Seo title="Browse Fundriser"/>
      <h1>Browse Fundriser</h1>
    </>
  );
};

