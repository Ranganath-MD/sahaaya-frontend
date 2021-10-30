import { Container, Grid } from "@material-ui/core";
import {
  RouteComponentProps,
  useParams,
} from "@reach/router";
import { BaseContext } from "context";
import { DevButton, Message, RichText } from "components";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import "./browse.scss";
import { format } from "date-fns";
import styled from "styled-components";

const HeaderText = styled.p`
  font-weight: 600;
  color: #2a415d;
  margin: 10px 0;
  box-shadow: 1px 1px 5px #0000001f;
  padding: 10px;
`;

const Label = styled.span`
  color: #697384;
  font-size: 12px;
`;

export const CampaignView: React.FC<RouteComponentProps> =
  () => {
    const [show, setShow] = useState(false);
    const params = useParams();
    const ctx = useContext(BaseContext);

    useEffect(() => {
      ctx.fetchCampaignById(params.id);
    }, []);

    return (
      <Container className="view_container">
        <Grid container>
          <Grid item xs={12} sm={12} md={7}>
            <img
              src={
                ctx.campaignById?.beneficiary_photo[0].url
              }
              alt="beneficiary"
              className="view_image"
              onError={(e: any) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6";
              }}
            />
            <h2>{ctx.campaignById?.campaignName}</h2>
            <p>
              Started On{" "}
              {ctx.campaignById?.fromdate &&
                format(
                  new Date(ctx.campaignById?.fromdate),
                  "dd/MM/yyyy"
                )}
            </p>
            <div
              className={
                show ? "rich-text" : "rich-text-close"
              }
            >
              <RichText
                content={ctx.campaignById?.longDescription}
                readOnly
              />
              <DevButton onClick={() => setShow(!show)}>
                {show ? "Show less" : "Show more"}
              </DevButton>
            </div>
            <div>
              <HeaderText>Beneficiary</HeaderText>
              <div className="section">
                <div>
                  <Label>Name</Label>
                  <p>
                    {
                      ctx.campaignById?.beneficiary
                        .firstName
                    }{" "}
                    {ctx.campaignById?.beneficiary.lastName}
                  </p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p>
                    {ctx.campaignById?.beneficiary.email}
                  </p>
                </div>
                <div>
                  <Label>Address</Label>
                  <p>
                    {ctx.campaignById?.beneficiary.city},{" "}
                    {ctx.campaignById?.beneficiary.state}
                  </p>
                  <p>
                    {ctx.campaignById?.beneficiary.address},{" "}
                    {ctx.campaignById?.beneficiary.pin}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <HeaderText>Bank Details</HeaderText>
              <Message>
                You can donate directly to bank account
              </Message>
              <div className="section">
                <div>
                  <Label>Bank Name</Label>
                  <p>
                    {ctx.campaignById?.bank &&
                      ctx.campaignById?.bank.bankName}
                  </p>
                </div>
                <div>
                  <Label>Branch</Label>
                  <p>
                    {ctx.campaignById?.bank &&
                      ctx.campaignById?.bank.branch}
                  </p>
                </div>
                <div>
                  <Label>IFSC</Label>
                  <p>
                    {ctx.campaignById?.bank &&
                      ctx.campaignById?.bank.ifsccode}
                  </p>
                </div>
                <div>
                  <Label>Account Number</Label>
                  <p>
                    {ctx.campaignById?.bank &&
                      ctx.campaignById?.bank.accountNumber}
                  </p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={5}></Grid>
        </Grid>
      </Container>
    );
  };
