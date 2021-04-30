import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import {
  DevDatePicker,
  ExpandablePanel,
  FormInput,
  MaskedInput,
  Phone,
} from "components";
import { BeneficiaryContext, CampaignContext } from "context";
import { RiContactsLine } from "react-icons/ri";

const iconStyle = {
  width: "1.1em",
  height: "1.1em",
};

export const BeneficiaryDetails: React.FC = () => {
  const [expand, setExpand] = useState(false);
  const ctx = useContext(CampaignContext);
  const ctx_b = useContext(BeneficiaryContext);

  useEffect(() => {
    if (ctx.activeSection === "step2") setExpand(true);
    else setExpand(false);
  }, [ctx.activeSection]);
  return (
    <ExpandablePanel
      headerText={"Beneficiary Details"}
      expanded={expand}
      onChange={() => setExpand(!expand)}
      showStatus={ctx.campaign?.step2}
      headerIcon={<RiContactsLine color="#0052CC" style={iconStyle} />}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} md={4}>
          <FormInput
            name="firstname"
            type="text"
            placeholder="Enter First Name"
            label="First Name"
            required
            error={!!ctx_b.firstNameError}
            errorMsg={ctx_b.firstNameError}
            value={ctx_b.firstName}
            onChange={(e) => ctx_b.setFirstName(e.target.value)}
            onBlur={ctx_b.handleFirstName}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormInput
            name="lastname"
            type="text"
            placeholder="Enter Last Name"
            label="Last Name"
            required
            value={ctx_b.lastName}
            error={!!ctx_b.lastNameError}
            errorMsg={ctx_b.lastNameError}
            onChange={(e) => ctx_b.setLastName(e.target.value)}
            onBlur={ctx_b.handleLastName}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DevDatePicker
            required
            selected={ctx_b.dob}
            onChange={ctx_b.handleDateofBirth}
            placeholderText="DD/MM/YYYY"
            maxDate={new Date()}
            error={!!ctx_b.dobError}
            message={ctx_b.dobError}
            showMonthDropdown
            showYearDropdown
            dateFormat="DD/MM/YYYY"
            withPortal={false}
            label="Date of Birth"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormInput
            name="address"
            type="text"
            placeholder="Enter full Address"
            label="Full Address"
            required
            error={!!ctx_b.addressError}
            errorMsg={ctx_b.addressError}
            value={ctx_b.address}
            onChange={(e) => ctx_b.setAddress(e.target.value)}
            onBlur={ctx_b.handleAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Phone
            format="+91 (###) ###-####"
            required
            type="tel"
            label="Phone Number"
            value={ctx_b.phone}
            error={!!ctx_b.phoneError}
            errormsg={ctx_b.phoneError}
            onValueChange={(amount: any) =>
              ctx_b.handlePhone(amount.value)
            }
            placeholder="+91 (###) ###-####"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormInput
            name="email"
            type="email"
            placeholder="Enter email"
            label="Email"
            required
            value={ctx_b.email}
            onChange={(e) => ctx_b.setEmail(e.target.value)}
            // onBlur={}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MaskedInput
            format="### ###"
            label="PIN Code"
            required
            value={ctx_b.pin}
            onValueChange={(amount: any) => {
              ctx_b.setPin(amount.value);
              ctx_b.getPINValue(amount.value);
            }}
            placeholder="Enter PIN"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormInput
            name="city"
            type="text"
            readOnly
            value={ctx_b.city}
            placeholder="City"
            label="City"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormInput
            name="state"
            type="text"
            value={ctx_b.state}
            readOnly
            placeholder="State"
            label="State"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MaskedInput
            format="#### #### #### ####"
            label="Adhaar card Number"
            placeholder="Enter Adhaar Number"
          />
        </Grid>
      </Grid>
    </ExpandablePanel>
  );
};
