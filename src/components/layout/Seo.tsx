import React from "react";
import { Helmet } from "react-helmet-async";

export const Seo: React.FC<ISeoProps> = ({ title, description }) => {
  return (
    <Helmet
      title={title}
      htmlAttributes={{ lang: "en" }}
      meta={[
        {
          name: "description",
          content:
            description ||
            "Sahaaya is a crowdfunding application for farmers, talents, movie makers and startup",
        },
      ]}
    />
  );
};
