import React, { useContext } from "react";
import styled from "styled-components";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import { TableContext } from "./context";
import { GrRefresh } from "react-icons/gr";
import { CircularProgress } from "@material-ui/core";

const ToolbarWrapper = styled.div`
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
`;

const HeaderText = styled.h1`
  font-size: 1.2rem;
`;
const ToolBarButton = styled.button`
  font-size: 13px;
  padding: 5px 10px;
  font-weight: bold;
  border: none;
  background: none;
  cursor: pointer;
  margin: 0 5px;
  outline: none;
  &:hover {
    background: ghostwhite;
  }
`;

interface IToolbarProps {
  headerText?: string;
  denseTableItem?: boolean;
  handleRefresh?: () => void;
  showLoading?: boolean;
  noRefresh?: boolean;
}
export const TableToolbar: React.FC<IToolbarProps> = (props) => {
  const ctx = useContext(TableContext);
  const handleClick = () => {
    ctx.setDense(!ctx.dense);
  };

  return (
    <ToolbarWrapper>
      <HeaderText>{props.headerText}</HeaderText>
      <div>
        {props.showLoading && <CircularProgress size={20} />}
        <ToolBarButton onClick={handleClick}>
          {ctx.dense ? (
            <BsArrowsExpand color="blue" />
          ) : (
            <BsArrowsCollapse color="blue" />
          )}{" "}
          Dense
        </ToolBarButton>
        {props.noRefresh ? null : (
          <ToolBarButton onClick={props.handleRefresh}>
            <GrRefresh color="blue" /> Refresh
          </ToolBarButton>
        )}
      </div>
    </ToolbarWrapper>
  );
};
