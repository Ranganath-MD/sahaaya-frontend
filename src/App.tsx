import React from "react";
import { Provider } from "context";
import { Layout, PrivateRoute, AdminPrivateRoute } from "components";
import { Route, Routes } from "react-router-dom";
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse-campaign" element={<BrowseFundriser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/how-sahaaya-works" element={<HowItWorks />} />
          <Route path="/browse-campaign/:id" element={<CampaignView />} />

          <Route
            path="/admin/dashboard"
            element={
              <AdminPrivateRoute>
                <AdminDashboard />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <AdminPrivateRoute>
                <Analytics />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/campaign-requests"
            element={
              <AdminPrivateRoute>
                <CampaignRequests />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <AdminPrivateRoute>
                <Settings />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <AdminPrivateRoute>
                <AdminProfile />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <CampaignerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/create-campaign"
            element={
              <PrivateRoute>
                <CreateCampaign />
              </PrivateRoute>
            }
          />
          <Route
            path="campaign/:id"
            element={
              <PrivateRoute>
                <CreateCampaignForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Provider>
  );
};

export default App;
