import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Seo } from "../../components/layout/Seo";

export const CampaignerDashboard: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Seo title="Campaigner Dashboard"/>
      <h1>Campaigner Dashboard</h1>
    </>
  );
};
