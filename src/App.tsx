import React, { useEffect } from "react";
import { Provider } from "context";
import {
  Layout,
  PrivateRoute,
  AdminPrivateRoute,
} from "components";
import { Router, useLocation } from "@reach/router";
import {
  NotFound,
  Home,
  BrowseFundriser,
  HowItWorks,
  AdminDashboard,
  CampaignerDashboard,
  CreateCampaign,
  CreateCampaignForm,
  UserProfile,
  AdminProfile,
  Analytics,
  CampaignRequests,
  Settings,
  CampaignView,
} from "pages";
import { Login, Register } from "pages/userAuth";

const App: React.FC = () => {

  return (
    <Provider>
      <Layout>
        <Router>
          <Home path="/" />
          <BrowseFundriser path="browse-campaign" />
          <CampaignView path="/browse-campaign/:id" />
          <HowItWorks path="how-sahaaya-works" />
          <Register path="register" />
          <Login path="login" />
          <AdminPrivateRoute
            path="admin/dashboard"
            component={AdminDashboard}
          />
          <AdminPrivateRoute
            path="profile"
            component={AdminProfile}
          />
          <AdminPrivateRoute
            path="analytics"
            component={Analytics}
          />
          <AdminPrivateRoute
            path="campaign-requests"
            component={CampaignRequests}
          />
          <AdminPrivateRoute
            path="settings"
            component={Settings}
          />
          <PrivateRoute
            path="dashboard"
            component={CampaignerDashboard}
          />
          <PrivateRoute
            path="create-campaign"
            component={CreateCampaign}
          />
          <PrivateRoute
            path="campaign/:id"
            component={CreateCampaignForm}
          />
          <PrivateRoute
            path="/user/profile"
            component={UserProfile}
          />
          <NotFound path="/:statuscode" default />
        </Router>
      </Layout>
    </Provider>
  );
};

export default App;
