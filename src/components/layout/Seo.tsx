import React from "react";
import { Helmet } from "react-helmet";

export const Seo: React.FC<ISeoProps> = ({ title, description }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta
        name={description}
        content="Sahaaya is a crowdfunding application for farmers, talents, movie makers and startup"
      />
      <link rel="canonical" href="https://sahaaya-staging.web.app" />
    </Helmet>
  );
};