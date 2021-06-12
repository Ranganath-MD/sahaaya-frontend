import React, { useEffect } from "react";
import { Provider } from "context";
import { Layout, PrivateRoute, AdminPrivateRoute } from "components";
import { Router } from "@reach/router";
import {
  NotFound,
  Home,
  BrowseFundriser,
  HowItWorks,
  AdminDashboard,
  CampaignerDashboard,
  CreateCampaign,
  CreateCampaignForm,
} from "pages";
import { Login, Register } from "pages/userAuth";

const App: React.FC = () => {
  return (
    <Provider>
      <Layout>
        <Router>
          <Home path="/" />
          <BrowseFundriser path="browse-campaign" />
          <HowItWorks path="how-sahaaya-works" />
          <Register path="register" />
          <Login path="login" />
          <AdminPrivateRoute path="admin" component={AdminDashboard}>
            <AdminDashboard path="dashboard" />
          </AdminPrivateRoute>
          <PrivateRoute path="dashboard" component={CampaignerDashboard} />
          <PrivateRoute path="create-campaign" component={CreateCampaign} />
          <PrivateRoute path="campaign/:id" component={CreateCampaignForm} />
          <NotFound path="/:statuscode" default />
        </Router>
      </Layout>
    </Provider>
  );
};

export default App;
