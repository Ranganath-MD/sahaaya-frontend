import React from "react";
import { RouteComponentProps } from "@reach/router";

export const NotFound: React.FC<RouteComponentProps> = (props) => {
  console.log(props)
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>The page you are looking for is not exists</p>
    </div>
  );
};
