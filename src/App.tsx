import React from "react";
import { Provider } from "context";
import {
  Layout,
  PrivateRoute,
  AdminPrivateRoute,
} from "components";
import { Route, BrowserRouter, Routes } from "react-router-dom";
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
    // <Provider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/browse-campaign" element={<BrowseFundriser />} />
          <Route path="/browse-campaign/:id" element={<CampaignView />} />
          <Route path="/how-sahaaya-works" element={<HowItWorks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <AdminPrivateRoute
            index
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
          <AdminPrivateRoute index path="profile" element={<AdminProfile />} />
          <AdminPrivateRoute index path="analytics" element={<Analytics />} />
          <AdminPrivateRoute
            index
            path="campaign-requests"
            element={<CampaignRequests />}
          />
          <AdminPrivateRoute index path="settings" element={<Settings />} />
          <PrivateRoute index path="dashboard" element={<CampaignerDashboard />} />
          <PrivateRoute index path="create-campaign" element={<CreateCampaign />} />
          <PrivateRoute index path="campaign/:id" element={<CreateCampaignForm />} />
          <PrivateRoute index path="/user/profile" element={<UserProfile />} />
          <NotFound index path="/:statuscode" default /> */}
        </Routes>
      </Layout>
    // </Provider>
  );
};

export default App;
