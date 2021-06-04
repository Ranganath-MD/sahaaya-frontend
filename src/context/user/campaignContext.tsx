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
  const [activeSection, setActiveSection] = useState<string>("step1");
  const [desc, setDesc] = useState<string>("");
  const [textLegth, setTextLegth] = useState<number>(0);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createCampaign = async (payload: any) => {
    const result = await apiService.post("/campaign", payload);
    if (result) {
      localStorage.setItem("campaignId", result.data._id);
      setCampaignId(result.data._id);
      setIsLoading(false);
      navigate(`campaign/${result.data._id}`, { replace: true });
    }
  };

  const clear = () => {
    setCampaignName("New Campaign");
    setDescription("Description");
    setSelectedFromDate(new Date());
    setSelectedEndDate(addDays(selectedFromDate, 5));
    setTargetAmount(0);
    setDesc("");
    setTextLegth(0);
    setActiveSection("step1");
    setOpenSuccess(false);
    setPreviewOpen(false);
    setCampaign(null);
  };

  const isValidStep1 = () => {
    return (
      targetAmount === undefined ||
      targetAmount === 0 ||
      targetAmount === "" ||
      textLegth <= 500
    );
  };

  const changeStatus = () => {
    setOpenSuccess(!openSuccess);
    updateCampaignDetails(campaignId, "status", "IN_REVIEW");
  };

  const handleSaveStep1 = () => {
    updateCampaignDetails(campaignId, "fromdate", formatISO(selectedFromDate));
    updateCampaignDetails(campaignId, "enddate", formatISO(selectedEndDate));
    updateCampaignDetails(campaignId, "target", targetAmount);
    updateCampaignDetails(campaignId, "step1", true);
    setActiveSection("step2");
  };
  const handleCreateCampaign = (category: string) => {
    setIsLoading(true);
    const payload = {
      campaignName: "New Campaign",
      category,
    };
    setCategory(category);
    createCampaign(payload);
  };

  const setSteps = (data: any) => {
    const { step1, step2, step3, step4 } = data;
    if (step1) setActiveSection("step2");
    if (step2) setActiveSection("step3");
    if (step3) setActiveSection("step4");
    if (step4) setActiveSection("");
  };
  const setCampaignData = (data: any) => {
    setCampaign(data);
    setCategory(data.category);
    setCampaignId(data._id);
    setDescription(data.description);
    setCampaignName(data.campaignName);
    setTargetAmount(data.target && data.target);
    setDesc(data?.longDescription);
    setSteps(data);
    if (data.fromdate !== undefined)
      setSelectedFromDate(new Date(data.fromdate));
    if (data.enddate !== undefined) setSelectedEndDate(new Date(data.enddate));
  };

  const handleFromDateChange = (value: any) => {
    setSelectedFromDate(value);
  };
  const handleEndDateChange = (value: any) => {
    setSelectedEndDate(value);
  };

  const updateCampaignDetails = (
    campaignId: string,
    campaignKey: string,
    value: any
  ) => {
    if (!campaignId) return null;
    const cmp: ICampaignPayload = {
      campaignId,
      campaignKey,
      value,
    };
    socket.emit("update-campaign", cmp);
    socket.on("campaign", (data) => {
      setCampaign(data);
      // setSteps(data);
      // if(data?.step4) setActiveSection("step2");
    });
  };

  const handleRichText = (content: any) => {
    setDesc(content.value);
    setTextLegth(content.length);
    updateCampaignDetails(campaignId, "longDescription", desc);
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
        textLegth,
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
        desc,
        setSteps,
        updateCampaignDetails,
        activeSection,
        setActiveSection,
        handleRichText,
        previewOpen,
        setPreviewOpen,
        changeStatus,
        openSuccess,
        setOpenSuccess,
        isLoading,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
