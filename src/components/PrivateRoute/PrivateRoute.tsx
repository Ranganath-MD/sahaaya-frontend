import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context";

interface IPrivateRouteProps {
  children?: React.ReactNode;
}
export const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  children
}: any) => {
  const context = useContext(AuthContext);
  return context.isLoggedIn() && !context.isAdmin() ? children : (
    <Navigate to="/" />
  );
};
