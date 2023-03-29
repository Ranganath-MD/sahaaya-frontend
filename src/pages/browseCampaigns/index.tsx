import React, { useContext, useEffect } from "react";
import { CampaignCard, Seo } from "components";
import { useNavigate } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import "./browse.scss";
import { BaseContext } from "context";
import { ICampaign } from "../../../typings/campaign";

export const BrowseFundriser: React.FC = () => {
  const ctx = useContext(BaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    ctx.fetchCampaigns();
  }, []);

  const handleClick = (id: string) => {
    navigate(`/browse-campaign/${id}`);
  };

  return (
    <>
      <Seo title="Browse Fundriser" />
      <Container>
        <div className="campaigns">
          <Grid container spacing={5}>
            {ctx.campaignData?.campaigns?.length !== 0 ? (
              ctx.campaignData?.campaigns?.map((campaign: ICampaign) => {
                return (
                  <Grid item xs={12} sm={6} md={3}>
                    <CampaignCard
                      campaign={campaign}
                      onClick={() => handleClick(campaign._id)}
                    />
                  </Grid>
                );
              })
            ) : (
              <div className="no_data">
                <p>No Campaigns found</p>
              </div>
            )}
          </Grid>
        </div>
      </Container>
    </>
  );
};
