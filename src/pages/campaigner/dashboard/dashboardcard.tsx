import React from "react";
import { RouteComponentProps } from "@reach/router";
import CampaignImage from "../../../assets/user/crowdfunding.svg";
import DonationImage from "../../../assets/user/donate.svg";
import { DevDashboardCard } from "../../../components";
import { Grid } from "@material-ui/core";

const fundCardData = [
  {
    title: "Start Campaign",
    description: "Start a campaign here",
    icon: CampaignImage,
    path: "/start-campaign"
  },
  {
    title: "Donate",
    description: "Donate to the people who is in need",
    icon: DonationImage,
    path: "/browse-campaign"
  }
];

export const DashboardCard: React.FC<RouteComponentProps> = () => {

  return (
    <Grid container className="dashboard-cards">
      {fundCardData.map((item: any) => {
        return (
          <Grid sm={12} md={6} key={item.title} className="item">
            <DevDashboardCard
              title={item.title}
              description={item.description}
              icon={item.icon}
              navigationPath={item.path}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
