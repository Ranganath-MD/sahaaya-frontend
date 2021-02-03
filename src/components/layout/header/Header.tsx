import React from "react";
import { AppBar } from "@material-ui/core";
import { useWindowsize } from "../../../hooks";
import { ElevationScroll } from "../../elevationSroll";
import "../layout.scss";
import { MobileNav } from "./MobileNav";
import { NavBar } from "./Navbar";

export const Header: React.FC = () => {
  const windowSize = useWindowsize();
  return (
    <ElevationScroll>
      <AppBar
        position="sticky"
        className="appbar"
      >
        { windowSize.width <= 800 ? <MobileNav /> : <NavBar /> }
      </AppBar>
    </ElevationScroll>
  );
};
