import React from "react";
import { Drawer, DrawerProps } from "@material-ui/core";

export const NavigationSidebar: React.FC<DrawerProps> = ({ ...props }) => {
  return (
    <Drawer
      {...props}
    >
      <h1>side bar content here </h1>
    </Drawer>
  );
};
