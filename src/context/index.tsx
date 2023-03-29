import React from "react";
import { LayoutProvider } from "./layoutContext";
import { AuthProvider } from "./authContext";
// import { RouteComponentProps } from "react-router-dom";
import { CampaignProvider } from "./user/campaignContext";
import { BaseProvider } from "./baseContext";
import { BeneficiaryProvider } from "./user/beneficiaryContext";
import { AttachmentProvider } from "./user/attachmentContext";
import { BankProvider } from "./user/bankContext";
import { DashboardProvider } from "./user/dashboardContext";
import { ProfileProvider } from "./user/profileContext";
import { AdminDashboardProvider } from "./Admin/adminDashBoard";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DashboardProvider>
      <CampaignProvider>
        <BeneficiaryProvider>
          <AttachmentProvider>
            <BankProvider>{children}</BankProvider>
          </AttachmentProvider>
        </BeneficiaryProvider>
      </CampaignProvider>
    </DashboardProvider>
  );
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AdminDashboardProvider>{children}</AdminDashboardProvider>;
};

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // <LocationProvider>
    <LayoutProvider>
      <BaseProvider>
        <ProfileProvider>
          <AuthProvider>
            <AdminProvider>
              <UserProvider>{children}</UserProvider>
            </AdminProvider>
          </AuthProvider>
        </ProfileProvider>
      </BaseProvider>
    </LayoutProvider>
    // </LocationProvider>
  );
};

export * from "./layoutContext";
export * from "./authContext";
export * from "./baseContext";
export * from "./user/attachmentContext";
export * from "./user/campaignContext";
export * from "./user/beneficiaryContext";
export * from "./user/bankContext";
export * from "./user/dashboardContext";
export * from "./user/profileContext";
export * from "./Admin/adminDashBoard";
