import React from "react";
import { Toolbar, IconButton } from "@material-ui/core";
import { DevButton } from "../../button";
import { VscBell } from "react-icons/vsc";
import { FaSearchDollar } from "react-icons/fa";
import { Link, LinkGetProps } from "@reach/router";
import Logo from "../../../assets/logo.svg";

export const NavBar: React.FC = () => {

  const isActive = ({ isCurrent }: LinkGetProps) => {
    return isCurrent ? { className: "active-link" } : { className: "inactive-link" };
  };

  const Links = [
    { name: "Browse Campaign", path:"browse-campaign" },
    { name: "How it Works", path:"how-sahaaya-works" },
    { name: "Start Campaign", path:"start-campaign" }
  ];

  return (
    <Toolbar>
      <Link to="/">
        <img src={Logo} width="35px" height="auto" />
      </Link>
      <Toolbar>
        {
          Links.map((link, i) => {
            return (
              <div key={i} className="nav-item">
                <Link to={link.path} getProps={isActive}>{link.name}</Link>
              </div>
            );
          })
        }
      </Toolbar>
      <div style={{ flexGrow: 1 }} />
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
      >
        <VscBell />
      </IconButton>
      <DevButton
        primary
        isShadow={false}
      >Sign In</DevButton>
    </Toolbar>
  );
};
