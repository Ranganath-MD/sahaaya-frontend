import React from "react";
import { Toolbar, Typography, IconButton } from "@material-ui/core";
import { DevButton } from "../../button";
import { VscBell } from "react-icons/vsc";
import { Link, LinkGetProps } from "@reach/router";

export const NavBar: React.FC = () => {

  const isActive = ({ isCurrent }: LinkGetProps) => {
    return isCurrent ? { className: "active-link" } : { className: "inactive-link" };
  };

  const Links = [
    { name: "Browse Fundrisers", path:"/fundrisers" },
    { name: "How it Works", path:"/how-it-works" },
    { name: "Start Fundriser", path:"/start" }
  ];

  return (
    <Toolbar>
      <Typography variant="h6" color="textPrimary">
        Fundo
      </Typography>
      <Toolbar>
        {
          Links.map((link, i) => {
            return (
              <Link to={link.path} key={i} getProps={isActive}>{link.name}</Link>
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
        bordered
        isShadow={false}
      >Sign In</DevButton>
    </Toolbar>
  );
};
