import React, { useState } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import styled from "styled-components";
import {
  CircularProgress,
  Container,
  MenuItem,
  Popover,
} from "@material-ui/core";

type MenuItem = {
  name: string;
  onClick?: () => void;
};

interface IdevCardProps {
  headerText?: string;
  showMenu?: boolean;
  menuItems?: MenuItem[];
}

const HeaderWrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  p {
    font-weight: 600;
  }
`;
const Icon = styled.div`
  background-color: #0052cc2e;
  width: 15px;
  height: 15px;
  color: black;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const MenuItemText = styled.span`
  font-size: 14px;
  margin: 0 5px;
`;

export const DevCardHeader: React.FC<IdevCardProps> = ({
  headerText,
  showMenu = true,
  menuItems,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOnClick = (onClick: any) => {
    handleClose();
    onClick();
  };

  return (
    <HeaderWrapper>
      {headerText && <p>{headerText}</p>}
      {showMenu && (
        <Icon>
          <BiDotsHorizontal onClick={handleClick} />
        </Icon>
      )}
      <Popover
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="popover"
      >
        {menuItems &&
          menuItems.map((item: any) => {
            return (
              <MenuItem
                onClick={() => handleOnClick(item.onClick)}
                key={item.name}
              >
                <MenuItemText>{item.name}</MenuItemText>
              </MenuItem>
            );
          })}
      </Popover>
    </HeaderWrapper>
  );
};
