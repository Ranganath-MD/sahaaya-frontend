import { Breadcrumbs, Chip, Container, Grid } from "@material-ui/core";
import { RouteComponentProps, useParams } from "@reach/router";
import React, { useContext, useEffect, useMemo } from "react";
import { DevButton, EditableTextArea, Seo } from "components";
import { BankContext, BeneficiaryContext, CampaignContext, AttachmentContext } from "context";
import { RiUser4Line } from "react-icons/ri";
import { BiSitemap } from "react-icons/bi";
import "./campaign.scss";
import { CampaignDetails } from "./campaignDetails";
import { BeneficiaryDetails } from "./beneficiaryDetails";
import { apiService } from "utils";
import { Attchments } from "./attachments";
// import { AttachmentContext } from "context/attachmentContext";
import { BankDetails } from "./bankDetails";
import { PreviewCampaign } from "./previewModal";
import { SuccessMessage } from "./successMessage";
import { Spinner } from "components/progressbar/global";

export const CreateCampaignForm: React.FC<RouteComponentProps> = () => {
  const ctx = useContext(CampaignContext);
  const ctx_b = useContext(BeneficiaryContext);
  const docs = useContext(AttachmentContext);
  const bank = useContext(BankContext);
  const params = useParams();

  const getCampaign = async () => {
    ctx.setLoading(true);
    try {
      const result = await apiService.get(`campaign/${params.id}`);
      ctx_b.setBeneficiaryData(result.data?.beneficiary);
      ctx.setCampaignData(result.data);
      docs.setDocs(result.data);
      bank.setBankDetails(result.data?.bank);
      ctx.setLoading(false);
    } catch (err) {
      ctx.setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("campaignId", params.id);
    getCampaign();
  }, []);

  const preview = useMemo(() => <PreviewCampaign/>, [ctx.previewOpen]);
  const success = useMemo(() => <SuccessMessage/>, [ctx.openSuccess]);
  return (
    <>
      <Seo title={ctx.campaignName} />
      {ctx.loading && <Spinner />}
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} md={1} />
          <Grid item xs={12} sm={12} md={9}>
            <div className="campaign-input">
              <Breadcrumbs>
                <Chip size="small" icon={<RiUser4Line />} label="Campaign" className="chip"/>
                <Chip size="small" icon={<BiSitemap />} label="Category" className="chip"/>
                <Chip size="small" label={ctx.category} className="chip"/>
              </Breadcrumbs>
              <EditableTextArea
                autoFocus
                required
                maxLength={128}
                label="Campaign Name"
                placeholder="Enter Campaign Name"
                value={ctx.campaignName}
                error={ctx.campaignName === ""}
                className="cmpName"
                onChange={(e) => ctx.setCampaignName(e.target.value)}
                onBlur={(e) => ctx.handleOnBlur(e.target.value)}
              />
              <EditableTextArea
                required
                maxLength={200}
                label="Few words"
                placeholder="Enter Description"
                value={ctx.description}
                className="cmp-description"
                error={ctx.description === ""}
                onChange={(e) => ctx.setDescription(e.target.value)}
                onBlur={(e) => ctx.handleDescriptionOnBlur(e.target.value)}
              />
            </div>
            <div>
              <CampaignDetails />
              <BeneficiaryDetails />
              <Attchments />
              <BankDetails />
            </div>
            <div className="campaign_buttons">
              <DevButton
                bordered
                onClick={() => ctx.setPreviewOpen(!ctx.previewOpen)}
                disabled={!ctx.campaign?.step4}
              >
                Preview
              </DevButton>
              <DevButton
                primary
                disabled={!ctx.campaign?.step4}
                onClick={ctx.changeStatus}
              >
                Submit
              </DevButton>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={1} />
        </Grid>
        {preview}
        {success}
      </Container>
    </>
  );
};
