import React from "react";
import { Grid } from "@material-ui/core";

export const Steps: React.FC<IStepProps> = ({ renderImage, step, setStep }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={4} md={4}>
        <div
          className={step === 1 ? "steps__active" : "steps__primary" }
          onClick={() => setStep(1)}
        >
          {/* <div className="icon">1</div> */}
          <div>Registration</div>
        </div>
        <div
          className={step === 2 ? "steps__active" : "steps__primary" }
          onClick={() => setStep(2)}
        >
          {/* <div className="icon">2</div> */}
          <div>Create a Campaign</div>
        </div>
        <div
          className={step === 3 ? "steps__active" : "steps__primary" }
          onClick={() => setStep(3)}
        >
          {/* <div className="icon">3</div> */}
          <div>Submit for Approval</div>
        </div>
        <div
          className={step === 4 ? "steps__active" : "steps__primary" }
          onClick={() => setStep(4)}
        >
          {/* <div className="icon">4</div> */}
          <div>Raise Fund</div>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={8} className="image-grid">
        <img src={renderImage()} />
      </Grid>
    </Grid>
  );
};
