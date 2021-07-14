import React, { useState, useContext } from "react";
import { AdminDashboardContext } from "context";
import { CampaignItem } from "../request/item";
import { Column } from "../../../../typings/table";
import {
  TableFromComponent,
  DevTableBody,
  DevTableRow,
  DevTableHead,
} from "components";
import { Paper } from "@material-ui/core";
import { NoRowOverlay } from "components/tables/noRows";
import { CgSearch } from "react-icons/cg";
import styled from "styled-components";

const columns: Column[] = [
  { id: 1, label: "CampaignName" },
  { id: 2, label: "Category" },
  { id: 3, label: "Target Amount" },
  { id: 4, label: "Campaigner" },
  { id: 5, label: "Submitted Date" },
  { id: 6, label: "Status" },
];

const Input = styled.input`
  width: 80%;
  padding: 1.2em 0;
  outline: none;
  border: none;
  font-size: 1em;
`;

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
      <Paper className="search-paper">
        <Input type="text" placeholder="Search Campaign by Name" value={ctx.searchText} onChange={ctx.handleSearch}/>
        <CgSearch size={25} />
      </Paper>
      <TableFromComponent
        toolbarProps={{
          headerText: "All Campaigns",
          showLoading: ctx.isTableDataLoading,
          noRefresh: true,
        }}
      >
        <DevTableHead columns={columns}></DevTableHead>
        {ctx.allCampaigns &&
          ctx.allCampaigns.length === 0 && <NoRowOverlay />}
        <DevTableBody>
          {ctx.allCampaigns?.map(
            (item: typeof ctx.allCampaigns, index: number) => {
              return (
                <DevTableRow
                  key={index}
                  selected={item._id === id}
                  onClick={() => handlePreview(item)}
                >
                  <CampaignItem item={item} showStatus />
                </DevTableRow>
              );
            }
          )}
        </DevTableBody>
      </TableFromComponent>
    </>
  );
};
