import React from "react";
import TextTransition, { presets } from "react-text-transition";
const TEXTS = ["Farmer", "Talent", "Movie", "Start up"];

export const AnimateText = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <span className="animate-container">
      We are here to help
      <TextTransition
        text={`${TEXTS[index % TEXTS.length]}`}
        springConfig={presets.gentle}
        inline
        className="text-animate"
        noOverflow
      />s
    </span>
  );
};
