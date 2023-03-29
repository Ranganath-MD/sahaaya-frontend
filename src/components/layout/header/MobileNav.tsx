import React, { useContext } from "react";
import { VscListSelection } from "react-icons/vsc";
import { AuthContext, LayoutContext } from "../../../context";
import "../layout.scss";
import { Toolbar, IconButton, Drawer } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/logo-sahaaya.svg";
import { RightMenu } from "./Menu";

export const MobileNav: React.FC<IHeaderProps> = ({ links }) => {
  const context = useContext(LayoutContext);
  const auth = useContext(AuthContext);

  const isActive = ({ isCurrent }: { isCurrent: boolean}) => {
    return isCurrent
      ? { className: "active-link" }
      : { className: "inactive-link" };
  };

  const renderDrawer = () => {
    return (
      <Drawer
        anchor={"left"}
        open={context.openDrawer}
        onClose={context.handleDrawer}
      >
        <div className="drawer">
          {
            auth.isAuthenticated ? <img src={Logo} width="30px" height="auto" /> :
              <Link to={"/"}>
                <img src={Logo} width="30px" height="auto" />
              </Link>
          }
          <div className="drawer-items">
            {links().map((link: any, i: number) => {
              return (
                <Link
                  to={link.path}
                  key={i}
                  onClick={context.handleDrawer}
                >
                  {link.name}
                </Link>
              );
            })}
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
        <RightMenu />
      </Toolbar>
    </>
  );
};
