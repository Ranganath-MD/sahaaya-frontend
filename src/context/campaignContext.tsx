import { navigate } from "@reach/router";
import React, { createContext, useState } from "react";
import { apiService } from "../utils/axiosBaseRequest";
import { socket } from "../utils/socketClient";

export const CampaignContext = createContext<any>({});

export const CampaignProvider: React.FC = ({ children  }) => {
  const [campaign, setCampaign] = useState(null);
  const [campaignId, setCampaignId] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(false);
  const [campaignName, setCampaignName] = useState<string>("New Campaign");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("Description");

  const createCampaign = async (payload:any) => {
    const result = await apiService.post("/campaign", payload);
    if(result) {
      setCampaignId(result.data._id);
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
      setCategory(result.data.category);
      setCampaignId(result.data._id);
      setDescription(result.data.description);
      setCampaignName(result.data.campaignName);
      setLoading(false);
    }catch(err) {
      setLoading(false);
    }
  };

  const updateCampaignDetails = (cmp: ICampaignPayload) => {
    socket.emit("update-campaign",  cmp);
    socket.on("campaign", (data) => {
      setCampaignName(data?.campaignName);
      setDescription(data?.description);
    });
  };

  const handleOnBlur = (value: string) => {
    if(!campaignId) return null;
    const cmp: ICampaignPayload = {
      campaignId,
      campaignKey: "campaignName",
      value
    };
    updateCampaignDetails(cmp);
  };
  const handleDescriptionOnBlur = (value: string) => {
    const cmp: ICampaignPayload = {
      campaignId,
      campaignKey: "description",
      value
    };
    updateCampaignDetails(cmp);
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
        loading,handleOnBlur,
        handleDescriptionOnBlur,
        description, setDescription
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
