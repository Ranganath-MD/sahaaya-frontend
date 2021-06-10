import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tooltip,
} from "@material-ui/core";
import { SideBarItem } from "./sidebarItem";
import { sidebaritems, ItemProps } from "./items";

interface ISidebar {
  openSidebar: boolean;
  footerText?: string;
  footerSecondaryText?: string;
  pathName?: string;
}

export const SideBar: React.FC<ISidebar> = ({
  openSidebar,
  footerText,
  footerSecondaryText,
  pathName,
}) => {
  return (
    <>
      <div className="sidebar_header">
        <Tooltip
          title={
            <div>
              <p style={{ margin: "5px 0" }}>{footerText}</p>
              <span>{footerSecondaryText}</span>
            </div>
          }
          arrow
          placement="bottom-end"
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar className="profile_menu">R</Avatar>
            </ListItemAvatar>
            {openSidebar && (
              <ListItemText
                className="list_item_text"
                primary={footerText}
                secondary={footerSecondaryText}
              />
            )}
          </ListItem>
        </Tooltip>
      </div>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {sidebaritems.length !== 0 &&
          sidebaritems.map((item: ItemProps) => {
            return (
              <SideBarItem
                key={item.name}
                item={item}
                openSidebar={openSidebar}
                pathName={pathName}
              />
            );
          })}
      </List>
    </>
  );
};
