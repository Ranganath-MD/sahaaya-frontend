import React from "react";
import { LinearProgress, LinearProgressProps } from "@material-ui/core";

interface ILinearProps extends LinearProgressProps {
  progress?: number;
}

export const ProgressBar: React.FC<ILinearProps> = ({ progress }) => {
  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};
