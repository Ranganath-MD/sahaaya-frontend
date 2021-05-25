import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
  IconButton
} from "@material-ui/core";
import { ReadOnlyMaskInput, CloudinaryImage, RichText } from "components";
import { CampaignContext } from "context";
import styled from "styled-components";
import "./campaign.scss";
import { format } from "date-fns";
import { RiCloseLine } from "react-icons/ri";

const Label = styled.span`
  color: #697384;
  font-size: 12px;
`;
const HeaderText = styled.p`
  font-weight: 600;
  color: #2a415d;
  margin: 10px 0;
  box-shadow: 1px 1px 5px #0000001f;
  padding: 10px;
`;
const CloseButton = styled.div`
  position: absolute;
  top: 50px;
  right: 70px;
`;

export const PreviewCampaign: React.FC = () => {
  const ctx = useContext(CampaignContext);

  return (
    <Dialog open={ctx.previewOpen} fullScreen>
      <Container>
        <CloseButton>
          <IconButton onClick={() => ctx.setPreviewOpen(!ctx.previewOpen)}>
            <RiCloseLine />
          </IconButton>
        </CloseButton>
        <DialogTitle disableTypography>
          <h2 className="heading">Preview</h2>
        </DialogTitle>
        <DialogContent>
          <div>
            <Label>Campaign Name</Label>
            <h1 className="name_preview">{ctx.campaign?.campaignName}</h1>
          </div>
          <div>
            <Label>short Note</Label>
            <p>{ctx.campaign?.description}</p>
          </div>
          <HeaderText>Campaign Details</HeaderText>
          <div className="section">
            <div>
              <Label>Start Date</Label>
              <p>
                {ctx.campaign?.fromdate &&
                  format(new Date(ctx.campaign?.fromdate), "dd/MM/yyyy")}
              </p>
            </div>
            <div>
              <Label>End Date</Label>
              <p>
                {ctx.campaign?.enddate &&
                  format(new Date(ctx.campaign?.enddate), "dd/MM/yyyy")}
              </p>
            </div>
            <div>
              <Label>Target Amount</Label>
              <ReadOnlyMaskInput
                displayType={"text"}
                value={ctx.campaign?.target}
                thousandSeparator={true}
                prefix={"₹"}
                thousandsGroupStyle="lakh"
              />
            </div>
          </div>
          <HeaderText>Beneficiary Details</HeaderText>
          <div className="section">
            <div>
              <Label>Name</Label>
              <p>
                {ctx.campaign?.beneficiary.firstName}{" "}
                {ctx.campaign?.beneficiary.lastName}
              </p>
            </div>
            <div>
              <Label>Date of Birth</Label>
              <p>
                {ctx.campaign?.beneficiary.dob &&
                  format(new Date(ctx.campaign?.beneficiary.dob), "dd/MM/yyyy")}
              </p>
            </div>
            <div>
              <Label>Address</Label>
              <p>{ctx.campaign?.beneficiary.address}</p>
            </div>
            <div>
              <Label>Phone Number</Label>
              <ReadOnlyMaskInput
                displayType={"text"}
                value={ctx.campaign?.beneficiary.phone}
                prefix={"+91"}
                format="+91 (###) ###-####"
              />
            </div>
            <div>
              <Label>Email</Label>
              <p>{ctx.campaign?.beneficiary.email}</p>
            </div>
            <div>
              <Label>PIN</Label>
              <p>{ctx.campaign?.beneficiary.pin}</p>
            </div>
            <div>
              <Label>Place</Label>
              <p>
                {ctx.campaign?.beneficiary.city}, {ctx.campaign?.beneficiary.state}
              </p>
            </div>
            <div>
              <Label>Adhaar Number</Label>
              <ReadOnlyMaskInput
                displayType={"text"}
                value={ctx.campaign?.beneficiary.adhaar}
                format="#### #### #### ####"
              />
            </div>
          </div>
          <HeaderText>Attachments</HeaderText>
          <div className="section">
            <div>
              {ctx.campaign?.adhaar_photo &&
              ctx.campaign?.adhaar_photo.map((item: any) => {
                return (
                  <div key={item.public_id} className="image_container">
                    <Label>Adhaar Card</Label>
                    <CloudinaryImage publicId={item.public_id} width={200} />
                  </div>
                );
              })}
            </div>
            <div>
              {ctx.campaign?.beneficiary_photo &&
              ctx.campaign?.beneficiary_photo.map((item: any) => {
                return (
                  <div key={item.public_id} className="image_container">
                    <Label>Benefiiciary photos</Label>
                    <CloudinaryImage publicId={item.public_id} width={200} />
                  </div>
                );
              })}
            </div>
            <div>
              {ctx.campaign?.others &&
              ctx.campaign?.others.map((item: any) => {
                return (
                  <div key={item.public_id} className="image_container">
                    <Label>Others photos</Label>
                    <CloudinaryImage publicId={item.public_id} width={200} />
                  </div>
                );
              })}
            </div>
          </div>
          <HeaderText>Bank Details</HeaderText>
          <div className="section">
            <div>
              <Label>Bank Name</Label>
              <p>{ctx.campaign?.bank && ctx.campaign?.bank.bankName}</p>
            </div>
            <div>
              <Label>Branch</Label>
              <p>{ctx.campaign?.bank && ctx.campaign?.bank.branch}</p>
            </div>
            <div>
              <Label>IFSC</Label>
              <p>{ctx.campaign?.bank && ctx.campaign?.bank.ifsccode}</p>
            </div>
            <div>
              <Label>Account Name</Label>
              <p>{ctx.campaign?.bank && ctx.campaign?.bank.accountName}</p>
            </div>
            <div>
              <Label>Account Number</Label>
              <p>{ctx.campaign?.bank && ctx.campaign?.bank.accountNumber}</p>
            </div>
          </div>
          <div>
            <Label>Long Description</Label>
            <RichText
              content={ctx.campaign?.longDescription}
              readOnly
            />
          </div>
        </DialogContent>
        {/* <DialogActions>
          <DevButton
            primary
            onClick={() => ctx.setPreviewOpen(!ctx.previewOpen)}
          >
            OK
          </DevButton>
        </DialogActions> */}
      </Container>
    </Dialog>
  );
};
