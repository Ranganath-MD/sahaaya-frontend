import React, { useContext } from "react";
import { IndexRouteProps, Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../../context";

interface IPrivateRouteProps extends IndexRouteProps {
  component?: React.FC<RouteProps>;
}
export const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}: any) => {
  const context = useContext(AuthContext);
  return context.isLoggedIn() && !context.isAdmin() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" />
  );
};
