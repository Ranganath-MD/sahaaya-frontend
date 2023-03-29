import React, { useContext, ReactNode } from "react";
import { Navigate, IndexRouteProps, RouterProps } from "react-router-dom";
import { AuthContext } from "../../context";

interface IPrivateRouteProps extends IndexRouteProps {
  component?: React.FC<RouterProps>;
}
export const AdminPrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  children,
  ...rest
}: any) => {
  const context = useContext(AuthContext);
  return context.isLoggedIn() && context.isAdmin() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" />
  );
};
