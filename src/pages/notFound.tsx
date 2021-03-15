import React from "react";
import { RouteComponentProps } from "@reach/router";


export const NotFound: React.FC<RouteComponentProps> = ({ location }: any) => {
  return (
    <div className="not-found">
      <h1>{location && location.state !== null ? location.state.status : "404"}</h1>
      <p>{location && location.state !== null ? location.state.errMsg : "Page Not Found"}</p>
    </div>
  );
};
