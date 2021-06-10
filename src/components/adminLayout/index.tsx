import React, { useMemo, useState } from "react";
import { RiArrowRightCircleLine, RiArrowLeftCircleFill } from "react-icons/ri";
import styled from "styled-components";
import { SideBar } from "./sidebar";

interface IGrid {
  open?: boolean;
  width: string;
}
const Grid = styled.div<IGrid>`
  display: grid;
  grid-template-columns: ${(props) => (props.open ? props.width ? `${props.width} 1fr` : "200px 1fr" : "75px 1fr")};
  grid-gap: 20px;
`;

interface ILayoutProps {
  children?: React.ReactNode;
  footerText?: string;
  footerSecondaryText?: string;
  width?: string;
  pathName?: string;
}

export const AdminLayout: React.FC<ILayoutProps> = ({ ...props }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const sidebar = useMemo(
    () => (
      <SideBar
        openSidebar={openSidebar}
        footerText={props.footerText}
        footerSecondaryText={props.footerSecondaryText}
        pathName={props.pathName}
      />
    ),
    [openSidebar, props]
  );

  return (
    <Grid open={openSidebar} width={props.width as string}>
      <div className="sidebar_container">
        <div className="right_arrow">
          {openSidebar ? (
            <RiArrowLeftCircleFill onClick={handleOpenSidebar} />
          ) : (
            <RiArrowRightCircleLine onClick={handleOpenSidebar} />
          )}
        </div>
        {sidebar}
      </div>
      <div>{props.children}</div>
    </Grid>
  );
};
