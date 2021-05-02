import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  CurrencyInput,
  DevDatePicker,
  ExpandablePanel,
  Message,
  RichText,
} from "components";
import { CampaignContext } from "context";
import { BiDetail } from "react-icons/bi";
import { FormHelperText, Grid } from "@material-ui/core";

const iconStyle = {
  width: "1.1em",
  height: "1.1em",
};
export const CampaignDetails: React.FC = () => {
  const ctx = useContext(CampaignContext);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (ctx.activeSection === "step1") setExpand(true);
    else setExpand(false);
  }, [ctx.activeSection, ctx.campaign?.step1]);

  const renderRichText = useMemo(
    () => (
      <>
        <RichText
          label="Tell more about campaign"
          required
          content={ctx.desc}
          onChange={(content: any) => ctx.handleRichText(content)}
        />
        <Message>Min of 500 characters</Message>
      </>
    ),
    [ctx.desc]
  );
  return (
    <>
      <ExpandablePanel
        headerText={"Campaign Details"}
        headerIcon={<BiDetail color="#0052CC" style={iconStyle} />}
        expanded={expand}
        showStatus={ctx.campaign?.step1}
        onChange={() => setExpand(!expand)}
        disableSave={ctx.isValidStep1()}
        onSave={ctx.handleSaveStep1}
      >
        <Grid container spacing={5}>
          <Grid item sm={6} md={4}>
            <DevDatePicker
              required
              selected={ctx.selectedFromDate}
              onChange={ctx.handleFromDateChange}
              placeholderText="Select Start Date"
              minDate={new Date()}
              withPortal
              label="Campaign Start Date"
            />
          </Grid>
          <Grid item sm={6} md={4}>
            <DevDatePicker
              required
              onChange={ctx.handleEndDateChange}
              selected={ctx.selectedEndDate}
              minDate={ctx.selectedFromDate}
              placeholderText="Select End Date"
              label="Campaign End Date"
              withPortal
              error={!!ctx.endDateError}
              message={
                "Note: End date is 5 days greater than start date by default but You can change the date"
              }
            />
          </Grid>
          <Grid item sm={6} md={4}>
            <CurrencyInput
              hintText="Target Amount"
              label="Target Amount"
              value={ctx.targetAmount}
              onValueChange={(amount: any) =>
                ctx.handleTargetAmount(amount.value)
              }
            />
            <FormHelperText error={!!ctx.targetAmountError}>
              {ctx.targetAmountError}
            </FormHelperText>
          </Grid>
          <Grid item sm={12} md={12}>
            {renderRichText}
          </Grid>
        </Grid>
      </ExpandablePanel>
    </>
  );
};
