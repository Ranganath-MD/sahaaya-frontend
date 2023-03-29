import React, { useContext } from "react";
import { Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo-sahaaya.svg";
import { RightMenu } from "./Menu";
import { AuthContext } from "../../../context";

export const NavBar: React.FC<IHeaderProps> = ({ links }) => {
  const auth = useContext(AuthContext);
  const isActive = ({ isCurrent }: any) => {
    return isCurrent
      ? { className: "active-link" }
      : { className: "inactive-link" };
  };

  return (
    <Toolbar>
      {auth.isAuthenticated ? (
        <img src={Logo} width="30px" height="auto" />
      ) : (
        <Link to={"/"}>
          <img src={Logo} width="30px" height="auto" />
        </Link>
      )}
      <Toolbar>
        {links().map((link: any, i: number) => {
          return (
            <div key={i} className="nav-item">
              <Link to={link.path} >
                {link.name}
              </Link>
            </div>
          );
        })}
      </Toolbar>
      <div style={{ flexGrow: 1 }} />
      <RightMenu />
    </Toolbar>
  );
};
