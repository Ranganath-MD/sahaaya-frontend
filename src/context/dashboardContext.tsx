import React, { createContext, useState } from "react";
import { apiService } from "utils";

export const DashBoardContext = createContext<any>({});

export const DashboardProvider: React.FC = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingPreview, setPreviewLoading] = useState<boolean>(false);
  const [campaignId, setCampaignId] = useState<string>("");

  const getUserCampaigns = async () => {
    setIsLoading(true);
    try {
      const result = await apiService.get("/campaign/all");
      setCampaigns(result.data);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const deleteCampaign = async (id: string) => {
    setLoadingDelete(true);
    try {
      const result = await apiService.delete(`/campaign/${id}`);
      setCampaigns(result.data.campaigns);
      setLoadingDelete(false);
      setOpenDelete(false);
    }catch {
      setLoadingDelete(false);
    }
  };

  return (
    <DashBoardContext.Provider
      value={{
        campaigns,
        getUserCampaigns,
        isLoading,
        openDelete,
        setOpenDelete,
        loadingDelete,
        deleteCampaign,
        campaignId, setCampaignId,
        loadingPreview, setPreviewLoading
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
};
