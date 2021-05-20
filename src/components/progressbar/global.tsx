import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const BackgroundCircle = styled.div`
  position: absolute;
  right: 50px;
  top: 100px;
  border-radius: 50%;
  height: 25px;
  padding: 5px;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;
export const Spinner: React.FC = () => {
  return (
    <BackgroundCircle>
      <CircularProgress
        size={20}
        color="primary"
      /><span>Loading...</span>
    </BackgroundCircle>
  );
};
