import { useState, useEffect } from "react";

interface ISizeProps {
    width: number;
    height: number;
}

export const useWindowsize = () => {
  const [windowSize, setWindowSize] = useState<ISizeProps>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    if(window){
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener<"resize">("resize", () => handleResize());
    return () => {
      window.removeEventListener<"resize">("resize", () => handleResize());
    };
  }, []);

  return windowSize;
};
