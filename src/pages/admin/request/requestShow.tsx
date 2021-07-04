import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  Container,
  IconButton,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  ReadOnlyMaskInput,
  CloudinaryImage,
  RichText,
  DevButton,
} from "components";
import { AdminDashboardContext } from "context";
import styled from "styled-components";
import "../../campaigner/campaign/campaign.scss";
import "./request.scss";
import { format } from "date-fns";
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiCloseLine,
} from "react-icons/ri";

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

export const RequestShow: React.FC = () => {
  const ctx = useContext(AdminDashboardContext);

  return (
    <Dialog open={ctx.previewOpen} fullScreen>
      <AppBar className="appbar">
        <Toolbar>
          <div className="camp_heading">
            <h3>{ctx.selectedCampaign?.campaignName}</h3>
            <span
              className={
                ctx.selectedCampaign?.status === "IN_REVIEW"
                  ? "in_review"
                  : ctx.selectedCampaign?.status === "APPROVED"
                    ? "status_approved"
                    : "status_rejected"
              }
            >
              {ctx.selectedCampaign?.status}
            </span>
          </div>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            edge="end"
            onClick={() => ctx.setOpenPreview(!ctx.previewOpen)}
            aria-label="close"
          >
            <RiCloseLine />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container className="container">
        {ctx.selectedCampaign?.status === "IN_REVIEW" && (
          <DevButton
            background="#2A415D"
            color="white"
            onClick={ctx.handleClick}
          >
            Change Status
          </DevButton>
        )}
        <Menu
          anchorEl={ctx.anchorEl}
          keepMounted
          getContentAnchorEl={null}
          open={Boolean(ctx.anchorEl)}
          onClose={ctx.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={ctx.handleOpenApproveDialog}>
            <RiCheckboxCircleFill color="#0db469" size={20} />{" "}
            <span className="item_text">Approve</span>
          </MenuItem>
          <MenuItem onClick={ctx.handleOpenRejectDialog}>
            <RiCloseCircleFill color="red" size={20} />{" "}
            <span className="item_text">Reject</span>
          </MenuItem>
        </Menu>
        <DialogContent>
          <div>
            <Label>short Note</Label>
            <p>{ctx.selectedCampaign?.description}</p>
          </div>
          <HeaderText>Campaign Details</HeaderText>
          <div className="section">
            <div>
              <Label>Start Date</Label>
              <p>
                {ctx.selectedCampaign?.fromdate &&
                  format(
                    new Date(ctx.selectedCampaign?.fromdate),
                    "dd/MM/yyyy"
                  )}
              </p>
            </div>
            <div>
              <Label>End Date</Label>
              <p>
                {ctx.selectedCampaign?.enddate &&
                  format(new Date(ctx.selectedCampaign?.enddate), "dd/MM/yyyy")}
              </p>
            </div>
            <div>
              <Label>Target Amount</Label>
              <ReadOnlyMaskInput
                displayType={"text"}
                value={ctx.selectedCampaign?.target}
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
                {ctx.selectedCampaign?.beneficiary.firstName}{" "}
                {ctx.selectedCampaign?.beneficiary.lastName}
              </p>
            </div>
            <div>
              <Label>Date of Birth</Label>
              <p>
                {ctx.selectedCampaign?.beneficiary.dob &&
                  format(
                    new Date(ctx.selectedCampaign?.beneficiary.dob),
                    "dd/MM/yyyy"
                  )}
              </p>
            </div>
            <div>
              <Label>Address</Label>
              <p>{ctx.selectedCampaign?.beneficiary.address}</p>
            </div>
            <div>
              <Label>Phone Number</Label>
              <ReadOnlyMaskInput
                displayType={"text"}
                value={ctx.selectedCampaign?.beneficiary.phone}
                prefix={"+91"}
                format="+91 (###) ###-####"
              />
            </div>
            <div>
              <Label>Email</Label>
              <p>{ctx.selectedCampaign?.beneficiary.email}</p>
            </div>
            <div>
              <Label>PIN</Label>
              <p>{ctx.selectedCampaign?.beneficiary.pin}</p>
            </div>
            <div>
              <Label>Place</Label>
              <p>
                {ctx.selectedCampaign?.beneficiary.city},{" "}
                {ctx.selectedCampaign?.beneficiary.state}
              </p>
            </div>
            <div>
              <Label>Adhaar Number</Label>
              <ReadOnlyMaskInput
                displayType={"text"}
                value={ctx.selectedCampaign?.beneficiary.adhaar}
                format="#### #### #### ####"
              />
            </div>
          </div>
          <HeaderText>Attachments</HeaderText>
          <div className="section">
            <div>
              {ctx.selectedCampaign?.adhaar_photo &&
                ctx.selectedCampaign?.adhaar_photo.map((item: any) => {
                  return (
                    <div key={item.public_id} className="image_container">
                      <Label>Adhaar Card</Label>
                      <CloudinaryImage publicId={item.public_id} width={200} />
                    </div>
                  );
                })}
            </div>
            <div>
              {ctx.selectedCampaign?.beneficiary_photo &&
                ctx.selectedCampaign?.beneficiary_photo.map((item: any) => {
                  return (
                    <div key={item.public_id} className="image_container">
                      <Label>Benefiiciary photos</Label>
                      <CloudinaryImage publicId={item.public_id} width={200} />
                    </div>
                  );
                })}
            </div>
            <div>
              {ctx.selectedCampaign?.others &&
                ctx.selectedCampaign?.others.map((item: any) => {
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
              <p>
                {ctx.selectedCampaign?.bank &&
                  ctx.selectedCampaign?.bank.bankName}
              </p>
            </div>
            <div>
              <Label>Branch</Label>
              <p>
                {ctx.selectedCampaign?.bank &&
                  ctx.selectedCampaign?.bank.branch}
              </p>
            </div>
            <div>
              <Label>IFSC</Label>
              <p>
                {ctx.selectedCampaign?.bank &&
                  ctx.selectedCampaign?.bank.ifsccode}
              </p>
            </div>
            <div>
              <Label>Account Name</Label>
              <p>
                {ctx.selectedCampaign?.bank &&
                  ctx.selectedCampaign?.bank.accountName}
              </p>
            </div>
            <div>
              <Label>Account Number</Label>
              <p>
                {ctx.selectedCampaign?.bank &&
                  ctx.selectedCampaign?.bank.accountNumber}
              </p>
            </div>
          </div>
          <div>
            <Label>Long Description</Label>
            <RichText
              content={ctx.selectedCampaign?.longDescription}
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
