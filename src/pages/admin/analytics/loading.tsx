import React from "react";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  height: 200px;
  display: grid;
  place-items: center;
`;

export const Loading: React.FC = () => {
  return (
    <LoadingWrapper>
      <CircularProgress size={25} />
    </LoadingWrapper>
  );
};
