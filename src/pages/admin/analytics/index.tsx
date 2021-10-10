import React, { useContext, useEffect } from "react";
import { RouteComponentProps, useLocation } from "@reach/router";
import { AdminLayout, Seo } from "components";
import { AdminDashboardContext, ProfileContext } from "context";
import { Grid } from "@material-ui/core";
import { CampaignsPerStatus  } from "./campaignsPerStatus";
import { CampaignsByCategory } from "./campaignsByCategory";
import { DonationsByyear } from "./donationsByyear";

export const Analytics: React.FC<RouteComponentProps> = () => {
  const ctx = useContext(AdminDashboardContext);
  const profile = useContext(ProfileContext);
  const location = useLocation();

  useEffect(() => {
    ctx.getAnalyticsData();
  }, []);

  return (
    <>
      <Seo title="Analytics"/>
      <AdminLayout
        width={"250px"}
        headerText={profile?.user.username}
        headerSecondaryText={profile?.user.email}
        pathName={location && location.pathname}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <CampaignsPerStatus/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CampaignsByCategory/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DonationsByyear/>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  );
};
