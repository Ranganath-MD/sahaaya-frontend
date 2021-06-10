import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Tooltip,
} from "@material-ui/core";
import "./index.scss";
// import { navigate } from "@reach/router";

const Image = ({ Component }: any) => {
  return <Component />;
};

interface ISubItemProps {
  data?: any;
  open?: boolean;
  openSidebar?: boolean;
  pathName?: string;
  handleSubItemClick?: any;
}

export const SubItem: React.FC<ISubItemProps> = ({
  data,
  open = true,
  openSidebar,
  pathName,
  handleSubItemClick,
}) => {
  return (
    <Collapse
      in={open}
      timeout="auto"
      unmountOnExit
    >
      <List component="div" disablePadding>
        <Tooltip
          title={!openSidebar ? (data?.name as string) : ""}
          placement="right"
        >
          <ListItem
            button
            onClick={() => handleSubItemClick(data?.route as string)}
            className={
              pathName !== data?.route ? "list_item" : "list_item_selected"
            }
            selected={pathName === data?.route}
          >
            {data?.leftIcon && (
              <div className="left_icon sub_item">
                <Image Component={data?.leftIcon} />
              </div>
            )}
            {openSidebar && (
              <ListItemText>
                <p className="list_item_text">{data?.name}</p>
              </ListItemText>
            )}
          </ListItem>
        </Tooltip>
      </List>
    </Collapse>
  );
};
