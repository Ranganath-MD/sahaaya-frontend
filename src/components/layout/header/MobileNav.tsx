import React, { useContext } from "react";
import { VscListSelection, VscBell } from "react-icons/vsc";
import { LayoutContext } from "../../../context";
import "../layout.scss";
import { Toolbar, IconButton, Typography, Drawer } from "@material-ui/core";
import { DevButton } from "../../button";
import { Link, LinkGetProps } from "@reach/router";

export const MobileNav: React.FC = () => {
  const context = useContext(LayoutContext);

  const Links = [
    { name: "Browse Fundrisers", path:"/fundrisers" },
    { name: "How it Works", path:"/how-it-works" },
    { name: "Start Fundriser", path:"/start" }
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
          <Typography variant="h4" className="text" color="textPrimary">
            Fundo
          </Typography>
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
        <Typography variant="h6" color="textPrimary">
          Fundo
        </Typography>
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
    </>
  );
};
