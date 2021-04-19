import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { EndDate, FromDate } from "components";
import { CampaignContext } from "context";

export const CampaignDetails: React.FC = () => {
  const ctx = useContext(CampaignContext);
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={4} md={4}>
          <FromDate
            value={ctx.selectedFromDate}
            onChange={ctx.handleFromDateChange}
            label={"Campaign Start Date"}
            showTodayButton
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <EndDate
            value={ctx.selectedEndDate}
            onChange={ctx.handleEndDateChange}
            label={"Campaign End Date"}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          Target Amount
        </Grid>
        <div>Rich Editor</div>
      </Grid>
    </>
  );
};
