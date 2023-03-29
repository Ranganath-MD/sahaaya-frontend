import { useLocation } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import {
  AdminLayout,
  Seo,
  DevCard,
  DevCardHeader,
  ReadOnlyMaskInput,
} from "components";
import { AdminDashboardContext, ProfileContext } from "context";
import styled from "styled-components";
import "./dashboard.scss";
import { FcMindMap, FcDonate, FcPortraitMode } from "react-icons/fc";
import { CampaignList } from "./allCampaigns";
import { Campaigners } from "./campaigners";
import { Grid } from "@material-ui/core";
import { Categories } from "./categories";

const DataCard = styled.div<{ borderColor?: string }>`
  padding: 0 20px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.12) !important;
  margin-right: 10px;
  position: relative;
  overflow: hidden;
  background: ghostwhite;
  border-left: 5px solid ${(props: any) => props.borderColor};
  h1 {
    font-size: 2.5rem;
    margin: 20px 0px;
  }
  .icon {
    position: absolute;
    right: -20px;
    bottom: -20px;
    width: 100px;
    height: 100px;
  }
`;

export const AdminDashboard: React.FC = () => {
  const ctx = useContext(AdminDashboardContext);
  const profile = useContext(ProfileContext);
  const location = useLocation();

  useEffect(() => {
    ctx.fetchDashboardData();
  }, []);

  return (
    <>
      <Seo title="Admin Dashboard" />
      <AdminLayout
        width={"250px"}
        headerText={profile?.user.username}
        headerSecondaryText={profile?.user.email}
        pathName={location && location.pathname}
      >
        <div className="cards">
          <DataCard borderColor="#3f51b5">
            <FcMindMap className="icon" />
            <p>Total Campaigns</p>
            <h1>{ctx.dashboardData?.total_campaigns}</h1>
          </DataCard>
          <DataCard borderColor="#ff9800">
            <FcDonate className="icon" />
            <p>Total Donation</p>
            <h1>
              <ReadOnlyMaskInput
                displayType={"text"}
                value={ctx.dashboardData?.total_donation}
                thousandSeparator={true}
                prefix={"₹"}
                wrapperStyle={{ padding: 0, margin: 0 }}
                thousandsGroupStyle="lakh"
              />
            </h1>
          </DataCard>
          <DataCard borderColor="#0db469c2">
            <FcPortraitMode className="icon" />
            <p>Total Fundrisers</p>
            <h1>{ctx.dashboardData?.total_campaigners}</h1>
          </DataCard>
        </div>
        <div className="campaign-list">
          <CampaignList />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <DevCard>
              <DevCardHeader headerText="Categories" showMenu={false} />
              <Categories />
            </DevCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <DevCard>
              <DevCardHeader headerText="Fundrisers" showMenu={false} />
              <Campaigners />
            </DevCard>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  );
};
