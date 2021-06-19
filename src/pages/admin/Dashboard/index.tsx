import { RouteComponentProps, useLocation } from "@reach/router";
import React, { useContext } from "react";
import { AdminLayout, Seo } from "components";
import { AdminDashboardContext, ProfileContext } from "context";

export const AdminDashboard: React.FC<RouteComponentProps> = () => {
  const ctx = useContext(AdminDashboardContext);
  const profile = useContext(ProfileContext);
  const location = useLocation();

  return (
    <>
      <Seo title="Admin Dashboard" />
      <AdminLayout
        width={"250px"}
        headerText={profile?.user.username}
        headerSecondaryText={profile?.user.email}
        pathName={location && location.pathname}
      >
        <div>
          <div>
            <h3>#Campaigns</h3>
          </div>
          <div>
            <h3>#Campaigners</h3>
          </div>
          <div>
            <h3>#Campaigns</h3>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};
