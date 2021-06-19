import React, { useContext } from "react";
import { RouteComponentProps, useLocation } from "@reach/router";
import { AdminLayout, Seo } from "components";
import { AdminDashboardContext, ProfileContext } from "context";

export const CampaignRequests: React.FC<RouteComponentProps> = () => {
  const ctx = useContext(AdminDashboardContext);
  const profile = useContext(ProfileContext);
  const location = useLocation();
  return (
    <>
      <Seo title={`${profile?.user.username} - Profile`}  />
      <AdminLayout
        width={"250px"}
        headerText={profile?.user.username}
        headerSecondaryText={profile?.user.email}
        pathName={location && location.pathname}
      >
        <h1>Requests</h1>
      </AdminLayout>
    </>
  );
};
