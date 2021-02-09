import React, { useContext } from "react";
import { VscListSelection, VscBell } from "react-icons/vsc";
import { LayoutContext } from "../../../context";
import "../layout.scss";
import { Toolbar, IconButton, Drawer } from "@material-ui/core";
import { DevButton } from "../../button";
import { Link, LinkGetProps } from "@reach/router";
import Logo from "../../../assets/logo.svg";

export const MobileNav: React.FC = () => {
  const context = useContext(LayoutContext);

  const Links = [
    { name: "Browse Campaign", path:"browse-campaign" },
    { name: "How it Works", path:"how-sahaaya-works" },
    { name: "Start Campaign", path:"start-campaign" }
  ];

  const isActive = ({ isCurrent }: LinkGetProps) => {
    return isCurrent ? { className: "active-link" } : { className: "inactive-link" };
  };

  const renderDrawer = () => {
    return (
      <Drawer
        anchor={"left"}
        open={context.openDrawer}
        onClose={context.handleDrawer}
      >
        <div className="drawer">
          <Link to="/">
            <img src={Logo} width="30px" height="auto" />
          </Link>
          <div className="drawer-items">
            {
              Links.map((link, i) => {
                return (
                  <Link
                    to={link.path}
                    key={i}
                    getProps={isActive}
                    onClick={context.handleDrawer}
                  >{link.name}</Link>
                );
              })
            }
          </div>
        </div>
      </Drawer>
    );
  };

  return (
    <>
      {renderDrawer()}
      <Toolbar>
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={context.handleDrawer}
        >
          <VscListSelection color="#3C61A7" />
        </IconButton>
        <Link to="/">
          <img src={Logo} width="30px" height="auto" />
        </Link>
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
    </>
  );
};
