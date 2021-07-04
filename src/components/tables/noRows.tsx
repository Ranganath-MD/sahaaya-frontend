import React from "react";
import styled from "styled-components";
import { GoInbox } from "react-icons/go";

const GridOverlay = styled.div`
  min-height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NoRowOverlay: React.FC = () => {

  return (
    <GridOverlay >
      <div>
        <GoInbox color="#2a415d" style={{ width: 75, height: 50 }}/>
        <div>No Rows</div>
      </div>
    </GridOverlay>
  );
};