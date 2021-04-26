import { navigate } from "@reach/router";
import { addDays, formatISO } from "date-fns";
import React, { createContext, useState } from "react";
import { apiService, socket } from "utils";

export const CampaignContext = createContext<any>({});

export const CampaignProvider: React.FC = ({ children }) => {
  const [campaign, setCampaign] = useState(null);
  const [campaignId, setCampaignId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [campaignName, setCampaignName] = useState<string>("New Campaign");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("Description");
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(
    addDays(selectedFromDate, 5)
  );
  const [targetAmount, setTargetAmount] = useState<number | string>(0);
  const [targetAmountError, setTargetAmountError] = useState<string>("");
  const [activeSection, setActiveSection] = useState("step1");

  const createCampaign = async (payload: any) => {
    const result = await apiService.post("/campaign", payload);
    if (result) {
      setCampaignId(result.data._id);
      navigate(`campaign/${result.data._id}`, { replace: true });
    }
  };

  const isValidStep1 = () => {
    return (
      targetAmount === undefined || targetAmount === 0 || targetAmount === ""
    );
  };

  const handleSaveStep1 = () => {
    const fromdate: ICampaignPayload = {
      campaignId,
      campaignKey: "fromdate",
      value: formatISO(selectedFromDate),
    };
    socket.emit("update-campaign", fromdate);
    const enddate: ICampaignPayload = {
      campaignId,
      campaignKey: "enddate",
      value: formatISO(selectedEndDate),
    };
    socket.emit("update-campaign", enddate);
    const target: ICampaignPayload = {
      campaignId,
      campaignKey: "target",
      value: targetAmount,
    };
    socket.emit("update-campaign", target);
    const step1: ICampaignPayload = {
      campaignId,
      campaignKey: "step1",
      value: true,
    };
    socket.emit("update-campaign", step1);
  };
  const handleCreateCampaign = (category: string) => {
    const payload = {
      campaignName,
      category,
    };
    setCategory(category);
    createCampaign(payload);
  };

  const setSteps = (data: any) => {
    const { step1, step2, step3, step4 } = data;
    if(step1) setActiveSection("step2");
    if(step2) setActiveSection("step3");
    if(step3) setActiveSection("step4");
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
      setSelectedFromDate(new Date(result.data.fromdate));
      setSelectedEndDate(new Date(result.data.enddate));
      setTargetAmount(result.data.target);
      setSteps(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleFromDateChange = (value: any) => {
    setSelectedFromDate(value);
  };
  const handleEndDateChange = (value: any) => {
    setSelectedEndDate(value);
  };

  const updateCampaignDetails = (cmp: ICampaignPayload) => {
    socket.emit("update-campaign", cmp);
    socket.on("campaign", (data) => {
      setCampaignName(data?.campaignName);
      setDescription(data?.description);
    });
  };

  const handleTargetAmount = (value: number) => {
    if (value && value < 25000) {
      setTargetAmountError("Amount should be greater than 25,000");
    } else {
      setTargetAmountError("");
      setTargetAmount(value);
    }
  };

  const handleOnBlur = (value: string) => {
    if (!campaignId) return null;
    const cmp: ICampaignPayload = {
      campaignId,
      campaignKey: "campaignName",
      value,
    };
    updateCampaignDetails(cmp);
  };
  const handleDescriptionOnBlur = (value: string) => {
    const cmp: ICampaignPayload = {
      campaignId,
      campaignKey: "description",
      value,
    };
    updateCampaignDetails(cmp);
  };

  return (
    <CampaignContext.Provider
      value={{
        createCampaign,
        campaign,
        setCampaign,
        campaignName,
        setCampaignName,
        category,
        setCategory,
        handleCreateCampaign,
        getCampaignById,
        loading,
        handleOnBlur,
        handleDescriptionOnBlur,
        description,
        setDescription,
        selectedFromDate,
        setSelectedFromDate,
        selectedEndDate,
        setSelectedEndDate,
        handleFromDateChange,
        handleEndDateChange,
        targetAmount,
        setTargetAmount,
        isValidStep1,
        handleSaveStep1,
        targetAmountError,
        setTargetAmountError,
        handleTargetAmount,
        activeSection, setActiveSection
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
