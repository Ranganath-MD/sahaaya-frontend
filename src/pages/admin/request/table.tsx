import React, { useState, useContext, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { AdminDashboardContext } from "context";
import { CampaignItem } from "./item";
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

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const CampaignsTable: React.FC<RouteComponentProps> = () => {
  const ctx = useContext(AdminDashboardContext);
  const [id, setId] = useState("");

  useEffect(() => {
    ctx.fetchCampaignsUnderReview();
  }, [ctx.page, ctx.rowsPerPage]);

  const handleRefresh = () => {
    ctx.fetchCampaignsUnderReview();
  };

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
          headerText: "Campaigns to Review",
          handleRefresh: () => handleRefresh(),
          showLoading: ctx.isTableDataLoading,
        }}
      >
        <DevTableHead columns={columns}></DevTableHead>
        {ctx.campaignsForReview?.campaigns &&
          ctx.campaignsForReview?.campaigns.length === 0 && <NoRowOverlay />}
        <DevTableBody>
          {ctx.campaignsForReview?.campaigns?.map(
            (item: typeof ctx.campaignsForReview, index: number) => {
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
      <Pagination>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={ctx.count}
          rowsPerPage={ctx.rowsPerPage}
          page={ctx.page}
          onChangePage={ctx.handleChangePage}
          onChangeRowsPerPage={ctx.handleChangeRowsPerPage}
        />
      </Pagination>
    </>
  );
};
