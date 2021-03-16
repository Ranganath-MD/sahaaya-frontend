import React from "react";
import { Toolbar } from "@material-ui/core";
import { Link, LinkGetProps } from "@reach/router";
import Logo from "../../../assets/logo.svg";
import { RightMenu } from "./Menu";

export const NavBar: React.FC<IHeaderProps> = ({ links }) => {
  const isActive = ({ isCurrent }: LinkGetProps) => {
    return isCurrent
      ? { className: "active-link" }
      : { className: "inactive-link" };
  };

  return (
    <Toolbar>
      <Link to="/">
        <img src={Logo} width="35px" height="auto" />
      </Link>
      <Toolbar>
        {links().map((link: any, i: number) => {
          return (
            <div key={i} className="nav-item">
              <Link to={link.path} getProps={isActive}>
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
