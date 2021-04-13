import { navigate } from "@reach/router";
import React, { createContext, useState } from "react";
import { apiService } from "../utils/axiosBaseRequest";

export const CampaignContext = createContext<any>({});

export const CampaignProvider: React.FC = ({ children  }) => {
  const [campaign, setCampaign] = useState(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [campaignName, setCampaignName] = useState<string>("New Campaign");
  const [category, setCategory] = useState<string>("");

  const createCampaign = async (payload:any) => {
    const result = await apiService.post("/campaign", payload);
    if(result) {
      navigate(`campaign/${result.data._id}`, { replace: true });
    }
  };

  const handleCreateCampaign = (category: string) => {
    const payload = {
      campaignName,
      category
    };
    setCategory(category);
    createCampaign(payload);
  };

  const getCampaignById = async (id: string) => {
    setLoading(true);
    try {
      const result = await apiService.get(`campaign/${id}`);
      setCampaign(result.data);
      setLoading(false);
    }catch(err) {
      setLoading(false);
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        createCampaign,
        campaign, setCampaign,
        campaignName, setCampaignName,
        category, setCategory,
        handleCreateCampaign,
        getCampaignById,
        loading
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
