import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
// import { useLocation } from "react-router-dom";

export const  ElevationScroll = (props: Props) => {
  const { children, window } = props;
  // const location = useLocation();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  const elevation = () => {
    if(trigger) {
      return 4;
    }else {
      return 0;
    }
  };

  return React.cloneElement(children, {
    elevation: elevation()
  });
};