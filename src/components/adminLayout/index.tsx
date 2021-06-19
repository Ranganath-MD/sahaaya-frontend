import { Breadcrumbs } from "@material-ui/core";
import { useWindowsize } from "hooks";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RiArrowRightCircleLine, RiArrowLeftCircleFill } from "react-icons/ri";
import styled from "styled-components";
import { SideBar } from "./sidebar";

interface IGrid {
  open?: boolean;
  width: string;
}
const Grid = styled.div<IGrid>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.open
      ? props.width
        ? `${props.width} 1fr`
        : "200px 1fr"
      : "75px 1fr"};
`;

interface ILayoutProps {
  children?: React.ReactNode;
  headerText?: string;
  headerSecondaryText?: string;
  width?: string;
  pathName?: string;
}

export const AdminLayout: React.FC<ILayoutProps> = ({ ...props }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const size = useWindowsize();
  const handleOpenSidebar = useCallback((input: boolean) => {
    setOpenSidebar(input);
  }, []);

  useEffect(() => {
    if (size.width < 700) {
      setOpenSidebar(false);
    } else {
      setOpenSidebar(true);
    }
  }, [size]);

  const sidebar = useMemo(
    () => (
      <SideBar
        openSidebar={openSidebar}
        headerText={props.headerText}
        headerSecondaryText={props.headerSecondaryText}
        pathName={props.pathName}
      />
    ),
    [props]
  );

  return (
    <Grid open={openSidebar} width={props.width as string}>
      <div className="sidebar_container">
        <div className="right_arrow">
          {size.width > 700 && (
            <div>
              {openSidebar ? (
                <RiArrowLeftCircleFill
                  onClick={() => handleOpenSidebar(false)}
                />
              ) : (
                <RiArrowRightCircleLine
                  onClick={() => handleOpenSidebar(true)}
                />
              )}
            </div>
          )}
        </div>
        {sidebar}
      </div>
      <div>
        <div className="breadcrumb">
          <Breadcrumbs>
            <p>Admin</p>
            {props.pathName &&
              props.pathName
                .split("/")
                .slice(1)
                .map((x: string) => {
                  return <p key={x} className="breadcrumb-text">{x}</p>;
                })}
          </Breadcrumbs>
        </div>
        <div className="children">
          {props.children}
        </div>
      </div>
    </Grid>
  );
};
