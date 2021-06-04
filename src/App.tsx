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
  UserProfile,
  AdminProfile
} from "pages";
import { Login, Register } from "pages/userAuth";
import { socket } from "utils";

const App: React.FC = () => {
  useEffect(() => {
    socket.on("authenticated", (data) => {
      // eslint-disable-next-line no-console
      console.log("connected with", data);
    });
    socket.emit("init", { data: "ping" });
  }, []);

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
          <PrivateRoute path="dashboard" component={CampaignerDashboard} />
          <PrivateRoute path="create-campaign" component={CreateCampaign} />
          <PrivateRoute path="campaign/:id" component={CreateCampaignForm} />
          <PrivateRoute path="profile" component={UserProfile} />
          <NotFound path="/:statuscode" default />
        </Router>
      </Layout>
    </Provider>
  );
};

export default App;
