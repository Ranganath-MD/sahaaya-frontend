import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { HiOutlineLightBulb } from "react-icons/hi";
import { GiHourglass, GiFarmTractor } from "react-icons/gi";
import { RiMovie2Line } from "react-icons/ri";
import "./dashboard.scss";

export const Categories: React.FC = () => {
  return (
    <List>
      <ListItem>
        <ListItemIcon className="listicon">
          <GiFarmTractor size={20} color="#000000" />
        </ListItemIcon>
        <ListItemText primary="Farmers" />
      </ListItem>
      <ListItem>
        <ListItemIcon className="listicon">
          <HiOutlineLightBulb size={20} color="#000000" />
        </ListItemIcon>
        <ListItemText primary="Talents" />
      </ListItem>
      <ListItem>
        <ListItemIcon className="listicon">
          <RiMovie2Line size={20} color="#000000" />
        </ListItemIcon>
        <ListItemText primary="Movie Makers" />
      </ListItem>
      <ListItem>
        <ListItemIcon className="listicon">
          <GiHourglass size={20} color="#000000" />
        </ListItemIcon>
        <ListItemText primary="Start-ups" />
      </ListItem>
    </List>
  );
};
