import {
  Breadcrumbs,
  Chip,
  Container,
  Grid
} from "@material-ui/core";
import { RouteComponentProps, useParams } from "@reach/router";
import React, { useContext, useEffect } from "react";
import { EditableInput } from "../../../components";
import { Seo } from "../../../components/layout/Seo";
import { CampaignContext } from "../../../context";
import { RiUser4Line } from "react-icons/ri";
import { BiSitemap } from "react-icons/bi";
import "./campaign.scss";
import VerticalTabs from "./campaignMenu";

export const CreateCampaignForm: React.FC<RouteComponentProps> = () => {
  const ctx = useContext(CampaignContext);
  const params = useParams();

  useEffect(() => {
    ctx.getCampaignById(params.id);
  }, []);

  return (
    <>
      <Seo title={ctx.campaignName} />
      <Container>
        <Grid container>
          <Grid item xs={12} sm={2} md={2} />
          <Grid item xs={12} sm={12} md={8}>
            <div className="campaign-input">
              <Breadcrumbs>
                <Chip size="small" icon={<RiUser4Line />} label="Campaign" />
                <Chip size="small" icon={<BiSitemap />} label="Category" />
                <Chip size="small" label={ctx.category} />
              </Breadcrumbs>
              <EditableInput
                autoFocus
                required
                maxLength={128}
                label="Campaign Name"
                placeholder="Enter Campaign Name"
                value={ctx.campaignName}
                className="cmpName"
                onChange={(e) => ctx.setCampaignName(e.target.value)}
                onBlur={(e) => ctx.handleOnBlur(e.target.value)}
              />
              <EditableInput
                required
                maxLength={200}
                label="Few words"
                placeholder="Enter Description"
                value={ctx.description}
                className="cmp-description"
                onChange={(e) => ctx.setDescription(e.target.value)}
                onBlur={(e) => ctx.handleDescriptionOnBlur(e.target.value)}
              />
            </div>
            <div>
              <VerticalTabs />
            </div>
          </Grid>
          <Grid item xs={12} sm={2} md={2} />
        </Grid>
      </Container>
    </>
  );
};
