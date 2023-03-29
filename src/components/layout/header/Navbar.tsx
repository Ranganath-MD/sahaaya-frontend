import React, { useContext } from "react";
import { Toolbar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/logo-sahaaya.svg";
import { RightMenu } from "./Menu";
import { AuthContext } from "../../../context";

export const NavBar: React.FC<IHeaderProps> = ({ links }) => {
  const auth = useContext(AuthContext);

  return (
    <Toolbar>
      {auth.isAuthenticated ? (
        <img src={Logo} width="30px" height="auto" />
      ) : (
        <NavLink to={"/"}>
          <img src={Logo} width="30px" height="auto" />
        </NavLink>
      )}
      <Toolbar>
        {links().map((link: any, i: number) => {
          return (
            <div key={i} className="nav-item">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                }
              >
                {link.name}
              </NavLink>
            </div>
          );
        })}
      </Toolbar>
      <div style={{ flexGrow: 1 }} />
      <RightMenu />
    </Toolbar>
  );
};
