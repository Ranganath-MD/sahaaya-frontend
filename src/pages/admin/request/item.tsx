import React from "react";
import { TableCell } from "@material-ui/core";
import { ReadOnlyMaskInput } from "components";

interface ICampaignItem {
  item: any;
}
export const CampaignItem: React.FC<ICampaignItem> = ({ item }) => {

  return (
    <>
      <TableCell>{item.campaignName}</TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>
        <ReadOnlyMaskInput
          displayType={"text"}
          value={item.target}
          thousandSeparator={true}
          prefix={"₹"}
          wrapperStyle={{ padding: 0, margin: 0 }}
          thousandsGroupStyle="lakh"
        />
      </TableCell>
      <TableCell>{item.campaigner?.username}</TableCell>
      <TableCell>{item.submittedDate ? item.submittedDate : "-"}</TableCell>
      <TableCell>{item.description}</TableCell>
    </>
  );
};
