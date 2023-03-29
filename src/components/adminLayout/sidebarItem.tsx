import React, { useCallback } from "react";
import { ListItem, ListItemText, Tooltip } from "@material-ui/core";
import { ISideBarItemProps } from "./items";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { SubItem } from "./subItem";

interface IListItemProps {
  item?: ISideBarItemProps;
  openSidebar?: boolean;
  pathName?: string;
}
const Image = ({ Component }: any) => {
  return <Component />;
};
export const SideBarItem: React.FC<IListItemProps> = ({
  item,
  openSidebar,
  pathName,
}) => {
  const navigate = useNavigate();

  const handleClick = (item: any) => {
    navigate(item.route);
  };
  const handleSubItemClick = useCallback((path: any) => {
    navigate(path);
  }, []);

  return (
    <>
      <Tooltip
        title={!openSidebar ? (item?.name as string) : ""}
        placement="right"
      >
        <ListItem
          button
          onClick={() => handleClick(item)}
          className={
            pathName !== item?.route ? "list_item" : "list_item_selected"
          }
          selected={pathName === item?.route}
        >
          {item?.leftIcon && (
            <div className="left_icon">
              <Image Component={item?.leftIcon} />
            </div>
          )}
          {openSidebar && (
            <ListItemText>
              <p className="list_item_text">{item?.name}</p>
            </ListItemText>
          )}
          {/* {item?.collapsibleItem && item?.collapsibleItem.length > 0 && (
            <div>{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
          )} */}
        </ListItem>
      </Tooltip>
      {item?.collapsibleItem &&
        item?.collapsibleItem.length > 0 &&
        item?.collapsibleItem.map((data) => {
          return (
            <SubItem
              key={data.name}
              data={data}
              // open={open}
              openSidebar={openSidebar}
              pathName={pathName}
              handleSubItemClick={handleSubItemClick}
            />
          );
        })}
    </>
  );
};
