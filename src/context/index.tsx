import React from "react";
import { LayoutProvider } from "./layoutContext";
import { AuthProvider } from "./authContext";
import { RouteComponentProps, LocationProvider } from "@reach/router";
import { CampaignProvider } from "./campaignContext";
import { BaseProvider } from "./baseContext";
import { BeneficiaryProvider } from "./beneficiaryContext";

export const Provider: React.FC<RouteComponentProps> = ({ children }) => {
  return (
    <LocationProvider>
      <LayoutProvider>
        <BaseProvider>
          <AuthProvider>
            <CampaignProvider>
              <BeneficiaryProvider>{children}</BeneficiaryProvider>
            </CampaignProvider>
          </AuthProvider>
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
