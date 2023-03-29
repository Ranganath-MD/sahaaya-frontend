import React from "react";
import styled from "styled-components";

const Card = styled.div`
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.12) !important;
  min-width: 100%;
  position: relative;
  overflow: hidden;
`;
export const DevCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Card>
      {children}
    </Card>
  );
};
