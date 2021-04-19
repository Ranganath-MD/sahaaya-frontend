import { Container } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React, { useContext } from "react";
import "./index.scss";
import { Seo } from "components";
import { DashboardCard } from "./dashboard";
import { AuthContext } from "context";

export const CampaignerDashboard: React.FC<RouteComponentProps> = () => {
  const cxt = useContext(AuthContext);
  return (
    <>
      <Seo title="Campaigner Dashboard" />
      <Container>
        <h1 className="welcome-msg">Welcome, { cxt.currentUser ? cxt.currentUser?.username : "..." }</h1>
        <DashboardCard />
      </Container>
    </>
  );
};
