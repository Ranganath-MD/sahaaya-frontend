import { Grid } from "@material-ui/core";
import React from "react";

export const CampaignDetails: React.FC = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={4} md={4}>
          Campaign Start Date
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          Campaign End Date
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          Target Amount
        </Grid>
        <div>
          Rich Editor
        </div>
      </Grid>
    </>
  );
};

