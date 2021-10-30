import React, { useContext, useEffect } from "react";
import { CampaignCard, Seo } from "components";
import { navigate, RouteComponentProps } from "@reach/router";
import { Container, Grid } from "@material-ui/core";
import "./browse.scss";
import { BaseContext } from "context";
import { ICampaign } from "../../../typings/campaign";

export const BrowseFundriser: React.FC<RouteComponentProps> =
  () => {
    const ctx = useContext(BaseContext);

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
            <h1>Campaigns</h1>
            <Grid container spacing={5}>
              {ctx.campaignData?.campaigns?.map(
                (campaign: ICampaign) => {
                  return (
                    <Grid item xs={12} sm={6} md={3}>
                      <CampaignCard
                        campaign={campaign}
                        onClick={() => handleClick(campaign._id)}
                      />
                    </Grid>
                  );
                }
              )}
            </Grid>
          </div>
        </Container>
      </>
    );
  };
