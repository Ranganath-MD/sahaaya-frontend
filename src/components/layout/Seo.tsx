import React from "react";
import { Helmet } from "react-helmet";

interface ISeoProps {
  title: string | undefined;
  description?: string;
}
export const Seo: React.FC<ISeoProps> = ({ title, description }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta
        name={description}
        content="Web site created using create-react-app"
      />
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
  );
};