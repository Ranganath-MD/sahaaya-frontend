import React from "react";
import { ReadOnlyMaskInput, DevTableCell } from "components";

interface ICampaignItem {
  item: any;
  showStatus?: boolean;
}
export const CampaignItem: React.FC<ICampaignItem> = ({ item, showStatus }) => {
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
      <DevTableCell>
        {item.submittedDate ? item.submittedDate : "-"}
      </DevTableCell>
      {showStatus ? (
        <DevTableCell>
          <span
            className={
              item?.status === "IN_REVIEW"
                ? "in_review"
                : item?.status === "APPROVED"
                  ? "status_approved"
                  : "status_rejected"
            }
          >
            {item?.status}
          </span>
        </DevTableCell>
      ) : (
        <DevTableCell>{item.description}</DevTableCell>
      )}
    </>
  );
};
