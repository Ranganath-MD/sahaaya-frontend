import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

const Label = styled.p`
  margin: 0;
  padding: 0;
  font-weight: bold;
  font-size: 10px;
`;
export const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number; size?: number }
) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        size={props.size}
        color="primary"
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Label>{`${Math.round(props.value)}%`}</Label>
      </Box>
    </Box>
  );
};
