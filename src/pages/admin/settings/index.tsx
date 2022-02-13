import React, { useContext } from "react";
import { RouteComponentProps, useLocation } from "@reach/router";
import { AdminLayout, Seo } from "components";
import { ProfileContext } from "context";

export const Settings: React.FC<RouteComponentProps> = () => {
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
        <h1>Settings</h1>
      </AdminLayout>
    </>
  );
};
