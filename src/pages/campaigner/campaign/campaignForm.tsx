import { Breadcrumbs, Chip, Container, Grid } from "@material-ui/core";
import { RouteComponentProps, useParams } from "@reach/router";
import React, { useContext, useEffect } from "react";
import { EditableInput, ExpandablePanel, Seo } from "components";
import { BeneficiaryContext, CampaignContext } from "context";
import { RiAttachmentLine, RiBankCardLine, RiUser4Line } from "react-icons/ri";
import { BiSitemap } from "react-icons/bi";
import "./campaign.scss";
import { CampaignDetails } from "./campaignDetails";
import { BeneficiaryDetails } from "./beneficiaryDetails";
import { apiService } from "utils";

const iconStyle = {
  width: "1.1em",
  height: "1.1em"
};

export const CreateCampaignForm: React.FC<RouteComponentProps> = () => {
  const ctx = useContext(CampaignContext);
  const ctx_b = useContext(BeneficiaryContext);
  const params = useParams();

  const getCampaign = async () => {
    ctx.setLoading(true);
    try {
      const result = await apiService.get(`campaign/${params.id}`);
      ctx_b.setBeneficiaryData(result.data?.beneficiary);
      ctx.setCampaignData(result.data);
      ctx.setLoading(false);
    } catch (err) {
      ctx.setLoading(false);
    }
  };

  useEffect(() => {
    getCampaign();
  }, []);

  return (
    <>
      <Seo title={ctx.campaignName} />
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} md={1} />
          <Grid item xs={12} sm={12} md={9}>
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
              <CampaignDetails />
              <BeneficiaryDetails />
              <ExpandablePanel
                headerText={"Attachments"}
                headerIcon={
                  <RiAttachmentLine
                    color="#0052CC"
                    style={iconStyle}
                  />}
              >
                Attachments
              </ExpandablePanel>
              <ExpandablePanel
                headerText={"Bank Details"}
                headerIcon={
                  <RiBankCardLine
                    color="#0052CC"
                    style={iconStyle}
                  />}
              >
                Campaign Details
              </ExpandablePanel>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={1} />
        </Grid>
      </Container>
    </>
  );
};
