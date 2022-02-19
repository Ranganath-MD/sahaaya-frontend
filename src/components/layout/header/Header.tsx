import React, { useContext } from "react";
import { AppBar } from "@material-ui/core";
import { useWindowsize } from "../../../hooks";
import { ElevationScroll } from "../../elevationSroll";
import "../layout.scss";
import { MobileNav } from "./MobileNav";
import { NavBar } from "./Navbar";
import { AuthContext } from "../../../context";

export const Header: React.FC = () => {
  const windowSize = useWindowsize();
  const context = useContext(AuthContext);

  const LinksBasedOnRoles = () => {
    let Links = [
      { name: "Browse Campaign", path: "browse-campaign" },
    ];
    if (context.isAuthenticated && context.isAdmin()) {
      Links = [
        { name: "Dashboard", path: "admin/dashboard" }
      ];
    }

    if (context.isAuthenticated && !context.isAdmin()) {
      Links.unshift({ name: "Dashboard", path: "/dashboard" });
    }

    return Links;
  };

  return (
    <ElevationScroll>
      <AppBar
        position="sticky"
        className="appbar"
      >
        { windowSize.width <= 800 ?
          <MobileNav
            links={LinksBasedOnRoles}
          /> :
          <NavBar
            links={LinksBasedOnRoles}
          /> }
      </AppBar>
    </ElevationScroll>
  );
};
