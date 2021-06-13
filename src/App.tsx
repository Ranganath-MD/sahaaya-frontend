import React from "react";
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
  UserProfile,
  AdminProfile,
  ChangePassword
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
          <AdminPrivateRoute path="admin/dashboard" component={AdminDashboard} />
          <AdminPrivateRoute path="profile" component={AdminProfile}/>
          <AdminPrivateRoute path="profile/change-password" component={ChangePassword}/>
          <PrivateRoute path="dashboard" component={CampaignerDashboard} />
          <PrivateRoute path="create-campaign" component={CreateCampaign} />
          <PrivateRoute path="campaign/:id" component={CreateCampaignForm} />
          <PrivateRoute path="/user/profile" component={UserProfile} />
          <NotFound path="/:statuscode" default />
        </Router>
      </Layout>
    </Provider>
  );
};

export default App;
