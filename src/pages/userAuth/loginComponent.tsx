import React from "react";
import { Seo } from "../../components/layout/Seo";
import { RouteComponentProps } from "@reach/router";

export const Login: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Seo title="Login to Sahaaya"/>
      <h1>Login</h1>
    </>
  );
};

