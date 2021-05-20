import { Grid } from "@material-ui/core";
import { ExpandablePanel, FormInput, MaskedInput } from "components";
import { BankContext, CampaignContext } from "context";
import React, { useContext, useEffect, useState } from "react";
import { RiBankCard2Line, RiCheckboxCircleFill } from "react-icons/ri";

const iconStyle = {
  width: "1.1em",
  height: "1.1em",
};
export const BankDetails: React.FC = () => {
  const ctx_c = useContext(CampaignContext);
  const ctx = useContext(BankContext);
  const [expand, setExpand] = useState<boolean>(false);

  useEffect(() => {
    if (ctx_c.activeSection === "step4") setExpand(true);
    else setExpand(false);
  }, [ctx_c.activeSection, ctx_c.campaign?.step4]);

  return (
    <>
      <ExpandablePanel
        headerText={"Bank Details"}
        headerIcon={<RiBankCard2Line color="#0052CC" style={iconStyle} />}
        expanded={expand}
        showStatus={ctx_c.campaign?.step4}
        onChange={() => setExpand(!expand)}
        disableSave={ctx.isValidStep4()}
        disabled={!ctx_c.campaign?.step3}
        onSave={ctx.handleSaveStep4}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={4}>
            <FormInput
              name="ifscCode"
              type="text"
              required
              error={!!ctx.ifscError}
              errorMsg={ctx.ifscError}
              onChange={ctx.handleIFSC}
              value={ctx.ifsc}
              placeholder="Enter IFSC Code"
              label="IFSC Code"
            />
            {ctx.isVerified && (
              <p className="verified">
                <RiCheckboxCircleFill /> <span>Verified</span>
              </p>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormInput
              name="bankName"
              type="text"
              readOnly
              value={ctx.bankName}
              placeholder="Bank Name"
              label="Bank Name"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormInput
              name="branch"
              type="text"
              readOnly
              value={ctx.branch}
              placeholder="Branch Name"
              label="Branch"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormInput
              name="accountName"
              type="text"
              required
              error={!!ctx.accountNameError}
              errorMsg={ctx.accountNameError}
              onChange={(e: any) => ctx.setAccountName(e.target.value)}
              onBlur={ctx.handleAccountName}
              value={ctx.accountName}
              placeholder="Enter Account Name"
              label="Account Holder Name"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MaskedInput
              label="Account Number"
              required
              error={!!ctx.accountNumberError}
              errormsg={ctx.accountNumberError}
              value={ctx.accountNumber}
              onValueChange={(amount: any) => {
                ctx.handleAccountNumber(amount.value);
              }}
              placeholder="Enter Account Number"
            />
          </Grid>
        </Grid>
      </ExpandablePanel>
    </>
  );
};
