import React from "react";
import { useNavigate } from "react-router-dom";
import CampaignImage from "assets/user/crowdfunding.svg";
import DonationImage from "assets/user/donate.svg";
import { DevDashboardCard } from "components";
import { Grid } from "@material-ui/core";
// import { CampaignContext } from "context";

const fundCardData = [
  {
    id: 1,
    title: "Start Campaign",
    description: "Start a campaign here",
    icon: CampaignImage,
  },
  {
    id: 2,
    title: "Donate",
    description: "Donate to the people who is in need",
    icon: DonationImage,
  }
];

export const DashboardCard: React.FC = () => {
  // const ctx = useContext(CampaignContext);
  const navigate = useNavigate();

  const onClickCard = (id: number) => {
    if(id === 1) {
      navigate("./create-campaign");
    }else {
      navigate("./browse-campaign");
    }
  };

  return (
    <Grid container className="dashboard-cards">
      {fundCardData.map((item: any) => {
        return (
          <Grid item sm={12} md={6} key={item.id} className="item">
            <DevDashboardCard
              title={item.title}
              description={item.description}
              icon={item.icon}
              handleClick={() => onClickCard(item.id)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
