import {
  Card,
  CardContent,
  LinearProgress,
} from "@material-ui/core";
import React from "react";
import { ICampaign } from "../../../typings/campaign";
import "./card.scss";

interface ICampaignCard {
  campaign: ICampaign;
  onClick?: any;
}
export const CampaignCard: React.FC<ICampaignCard> = ({
  campaign,
  onClick,
}) => {
  return (
    <Card onClick={onClick} className="card">
      <img
        src={campaign?.beneficiary_photo[0].url}
        alt="beneficiary"
        className="card_image"
        onError={(e: any) => {
          e.target.src =
            "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6";
        }}
      />
      <CardContent>
        <h3 className="camp_text">
          {campaign.campaignName}
        </h3>
        <span className="camp_desc">
          {campaign.description}
        </span>
        <LinearProgress
          value={
            (campaign.donation / campaign.target) * 100
          }
          className="linear-progress"
          variant="determinate"
        />
        <p className="donation">
          Raised <b>{campaign.donation}</b> of{" "}
          <b>{campaign.target}</b>
        </p>
      </CardContent>
    </Card>
  );
};
