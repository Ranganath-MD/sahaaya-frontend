import React from "react";
import { ReadOnlyMaskInput, DevTableCell } from "components";

interface ICampaignItem {
  item: any;
}
export const CampaignItem: React.FC<ICampaignItem> = ({ item }) => {

  return (
    <>
      <DevTableCell>{item.campaignName}</DevTableCell>
      <DevTableCell>{item.category}</DevTableCell>
      <DevTableCell>
        <ReadOnlyMaskInput
          displayType={"text"}
          value={item.target}
          thousandSeparator={true}
          prefix={"₹"}
          wrapperStyle={{ padding: 0, margin: 0 }}
          thousandsGroupStyle="lakh"
        />
      </DevTableCell>
      <DevTableCell>{item.campaigner?.username}</DevTableCell>
      <DevTableCell>{item.submittedDate ? item.submittedDate : "-"}</DevTableCell>
      <DevTableCell>{item.description}</DevTableCell>
    </>
  );
};
