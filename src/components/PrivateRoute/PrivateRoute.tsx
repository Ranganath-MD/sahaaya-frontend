import React, { useContext } from "react";
import { Redirect, RouteComponentProps } from "@reach/router";
import { AuthContext } from "../../context";

interface IPrivateRouteProps extends RouteComponentProps {
  component?: React.FC<RouteComponentProps>;
}
export const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}: any) => {
  const context = useContext(AuthContext);
  return context.isLoggedIn() && !context.isAdmin() ? (
    <Component {...rest} />
  ) : (
    <Redirect to="/" noThrow />
  );
};
