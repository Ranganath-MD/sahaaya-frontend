import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AdminLayout, Seo } from "components";
import { ProfileContext } from "context";

export const Settings: React.FC = () => {
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
