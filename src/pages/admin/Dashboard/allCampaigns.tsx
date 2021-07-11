import React, { useState, useContext, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { AdminDashboardContext } from "context";
import { CampaignItem } from "../request/item";
import { Column } from "../../../../typings/table";
import { TableFromComponent, DevTableBody, DevTableRow, DevTableHead } from "components";
import { NoRowOverlay } from "components/tables/noRows";
import { TablePagination } from "@material-ui/core";
import styled from "styled-components";

const columns: Column[] = [
  { id: 1, label: "CampaignName" },
  { id: 2, label: "Category" },
  { id: 3, label: "Target Amount" },
  { id: 4, label: "Campaigner" },
  { id: 5, label: "Submitted Date" },
  { id: 6, label: "Description" },
];

export const CampaignList: React.FC = () => {
  const ctx = useContext(AdminDashboardContext);
  const [id, setId] = useState("");

  const handlePreview = (item: any) => {
    setId(item._id);
    ctx.setSelectedCampaign(item);
    ctx.setOpenPreview(true);
    ctx.setCampaignId(item._id);
  };

  return (
    <>
      <TableFromComponent
        toolbarProps={{
          headerText: "All Campaigns",
          showLoading: ctx.isTableDataLoading,
          noRefresh: true
        }}
      >
        <DevTableHead columns={columns}></DevTableHead>
        {ctx.dashboardData?.campaigns &&
          ctx.dashboardData?.campaigns.length === 0 && <NoRowOverlay />}
        <DevTableBody>
          {ctx.dashboardData?.campaigns?.map(
            (item: typeof ctx.dashboardData.campaigns, index: number) => {
              return (
                <DevTableRow
                  key={index}
                  selected={item._id === id}
                  onClick={() => handlePreview(item)}
                >
                  <CampaignItem item={item} />
                </DevTableRow>
              );
            }
          )}
        </DevTableBody>
      </TableFromComponent>
    </>
  );
};
