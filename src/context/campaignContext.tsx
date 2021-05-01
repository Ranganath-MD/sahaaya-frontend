import { navigate } from "@reach/router";
import { addDays, formatISO } from "date-fns";
import React, { createContext, useContext, useState } from "react";
import { apiService, socket } from "utils";
import { BeneficiaryContext } from "./beneficiaryContext";

export const CampaignContext = createContext<any>({});

export const CampaignProvider: React.FC = ({ children }) => {
  const ctx = useContext(BeneficiaryContext);
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

  const clear = () => {
    setCampaign(null);
    setSelectedFromDate(new Date());
    setSelectedEndDate(addDays(selectedFromDate, 5));
    setTargetAmount(0);
    setActiveSection("step1");
  };

  const isValidStep1 = () => {
    return (
      targetAmount === undefined || targetAmount === 0 || targetAmount === ""
    );
  };

  const handleSaveStep1 = () => {
    updateCampaignDetails(campaignId, "fromdate", formatISO(selectedFromDate));
    updateCampaignDetails(campaignId, "enddate", formatISO(selectedEndDate));
    updateCampaignDetails(campaignId, "target", targetAmount);
    updateCampaignDetails(campaignId, "step1", true);
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
  const setCampaignData = (data: any) => {
    setCampaign(data);
    setCategory(data.category);
    setCampaignId(data._id);
    setDescription(data.description);
    setCampaignName(data.campaignName);
    setTargetAmount(data.target && data.target);
    setSteps(data);
    ctx.setFirstName(data.beneficiary?.firstName);
    if(data.fromdate !== undefined) setSelectedFromDate(new Date(data.fromdate));
    if(data.enddate !== undefined) setSelectedEndDate(new Date(data.enddate));
  };

  const handleFromDateChange = (value: any) => {
    setSelectedFromDate(value);
  };
  const handleEndDateChange = (value: any) => {
    setSelectedEndDate(value);
  };

  const updateCampaignDetails = (campaignId: string, campaignKey: string, value: any ) => {
    const cmp: ICampaignPayload = {
      campaignId,
      campaignKey,
      value
    };
    socket.emit("update-campaign", cmp);
    socket.on("campaign", (data) => {
      setCampaign(data);
      setSteps(data);
      // if(data?.step4) setActiveSection("step2");

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
    updateCampaignDetails(campaignId, "campaignName", value);
  };
  const handleDescriptionOnBlur = (value: string) => {
    updateCampaignDetails(campaignId, "description", value);
  };

  return (
    <CampaignContext.Provider
      value={{
        createCampaign,
        campaign,
        campaignId,
        setCampaign,
        campaignName,
        setCampaignName,
        setLoading,
        category,
        setCategory,
        handleCreateCampaign,
        setCampaignData,
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
        clear,
        setSteps,
        updateCampaignDetails,
        activeSection, setActiveSection
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
