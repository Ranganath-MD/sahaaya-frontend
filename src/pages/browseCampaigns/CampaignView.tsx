import {
  Card,
  Container,
  Grid,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";
import { useParams, useLocation } from "react-router-dom";
import { BaseContext } from "context";
import {
  CurrencyInput,
  DevButton,
  FormInput,
  Message,
  ReadOnlyMaskInput,
  RichText,
} from "components";
import React, { useContext, useEffect, useState } from "react";
import "./browse.scss";
import { format } from "date-fns";
import styled from "styled-components";
import { apiService } from "utils";

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

const loadScript = (src: any) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const CampaignView: React.FC = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [name, setName] = useState("");
  const [input_amount, setAmount] = useState(0);
  const params = useParams();
  const ctx = useContext(BaseContext);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  useEffect(() => {
    ctx.fetchCampaignById(params.id);

    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const displayRazorpay = async () => {
    const rupees = input_amount * 100;
    const result = await apiService.post("campaign/payment/orders", {
      name,
      amount: rupees,
    });

    if (!result) {
      return;
    }
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_b5WTh8A33TQ0dO",
      amount: amount.toString(),
      currency: currency,
      name,
      description: "Donation to Campaign",
      order_id: order_id,
      handler: async function (response: any) {
        const data = {
          name,
          amount: rupees,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        const result = await apiService.post(
          `campaign/payment/success/${params.id}`,
          data
        );
        if (!result) {
          return;
        } else {
          ctx.setCampaign(result.data.data);
          setName("");
          setAmount(0);
          setShowDonateForm(false);
          setOpen(true);
        }
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const handleFormSubmit = () => {
    if (!showDonateForm && !name && !input_amount) {
      setShowDonateForm(true);
      return;
    }
    displayRazorpay();
  };

  return (
    <Container className="view_container">
      <Grid container spacing={10}>
        <Grid item xs={12} sm={12} md={7}>
          <img
            src={ctx.campaignById?.beneficiary_photo[0].url}
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
              format(new Date(ctx.campaignById?.fromdate), "dd/MM/yyyy")}
          </p>
          <div className={show ? "rich-text" : "rich-text-close"}>
            <RichText content={ctx.campaignById?.longDescription} readOnly />
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
                  {ctx.campaignById?.beneficiary.firstName}{" "}
                  {ctx.campaignById?.beneficiary.lastName}
                </p>
              </div>
              <div>
                <Label>Email</Label>
                <p>{ctx.campaignById?.beneficiary.email}</p>
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
            <Message>You can donate directly to bank account</Message>
            <div className="section">
              <div>
                <Label>Bank Name</Label>
                <p>
                  {ctx.campaignById?.bank && ctx.campaignById?.bank.bankName}
                </p>
              </div>
              <div>
                <Label>Branch</Label>
                <p>{ctx.campaignById?.bank && ctx.campaignById?.bank.branch}</p>
              </div>
              <div>
                <Label>IFSC</Label>
                <p>
                  {ctx.campaignById?.bank && ctx.campaignById?.bank.ifsccode}
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
        <Grid item xs={12} sm={12} md={5}>
          <Card className="card_preview">
            <h2>
              Goal:{" "}
              <ReadOnlyMaskInput
                displayType={"text"}
                value={ctx.campaignById?.target}
                thousandSeparator={true}
                prefix={"₹ "}
                thousandsGroupStyle="lakh"
              />
            </h2>
            <LinearProgress
              value={
                (ctx.campaignById?.donation / ctx.campaignById?.target) * 100
              }
              className="linear-progress"
              variant="determinate"
            />
            <p className="donation">
              Raised <b>{ctx.campaignById?.donation}</b> of{" "}
              <b>{ctx.campaignById?.target}</b>
            </p>
            <HeaderText>Beneficiary</HeaderText>
            <div className="section">
              <div>
                <Label>Name</Label>
                <p>
                  {ctx.campaignById?.beneficiary.firstName}{" "}
                  {ctx.campaignById?.beneficiary.lastName}
                </p>
              </div>
              <div>
                <Label>Date of Birth</Label>
                <p>
                  {ctx.campaignById?.beneficiary.dob &&
                    format(
                      new Date(ctx.campaignById?.beneficiary.dob),
                      "dd/MM/yyyy"
                    )}
                </p>
              </div>
              <div>
                <Label>Address</Label>
                <p>{ctx.campaignById?.beneficiary.address}</p>
              </div>
            </div>
            {showDonateForm && (
              <div>
                <FormInput
                  name="name"
                  onChange={handleChange}
                  label="Your Name"
                  value={name}
                  width="300px"
                />
                <br />
                <CurrencyInput
                  label="Amount"
                  value={input_amount}
                  onValueChange={(input: any) => setAmount(input.floatValue)}
                />
              </div>
            )}

            <DevButton
              background="#0db469"
              color="white"
              fullWidth
              onClick={handleFormSubmit}
            >
              Donate Now
            </DevButton>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        onClose={() => setOpen(false)}
        message="Thanks for your donation"
        autoHideDuration={3000}
      />
    </Container>
  );
};
