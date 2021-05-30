import React from "react";
import { LayoutProvider } from "./layoutContext";
import { AuthProvider } from "./authContext";
import { RouteComponentProps, LocationProvider } from "@reach/router";
import { CampaignProvider } from "./campaignContext";
import { BaseProvider } from "./baseContext";
import { BeneficiaryProvider } from "./beneficiaryContext";
import { AttachmentProvider } from "./attachmentContext";
import { BankProvider } from "./bankContext";
import { DashboardProvider } from "./dashboardContext";
import { ProfileProvider } from "./profileContext";

export const Provider: React.FC<RouteComponentProps> = ({ children }) => {
  return (
    <LocationProvider>
      <LayoutProvider>
        <BaseProvider>
          <ProfileProvider>
            <AuthProvider>
              <DashboardProvider>
                <CampaignProvider>
                  <BeneficiaryProvider>
                    <AttachmentProvider>
                      <BankProvider>{children}</BankProvider>
                    </AttachmentProvider>
                  </BeneficiaryProvider>
                </CampaignProvider>
              </DashboardProvider>
            </AuthProvider>
          </ProfileProvider>
        </BaseProvider>
      </LayoutProvider>
    </LocationProvider>
  );
};

export * from "./layoutContext";
export * from "./authContext";
export * from "./campaignContext";
export * from "./baseContext";
export * from "./beneficiaryContext";
export * from "./bankContext";
export * from "./dashboardContext";
export * from "./attachmentContext";
export * from "./profileContext";
