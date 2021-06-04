import React, { createContext, useContext, useState } from "react";
import { apiService, socket } from "utils";
import { CampaignContext } from "./campaignContext";

export const AttachmentContext: React.Context<any> = createContext<any>({});

export const AttachmentProvider: React.FC = ({ children }) => {
  const ctx = useContext(CampaignContext);
  const [progress, setProgress] = useState(0);
  const [progress_b, setProgressB] = useState(0);
  const [progress_0, setProgressO] = useState(0);
  const [adhaarcard, setAdhaarcard] = useState([]);
  const [beneficiaryPhotos, setBeneficiaryPhotos] = useState([]);
  const [otherPhotos, setOtherPhotos] = useState([]);

  const setDocs = (result: any) => {
    setAdhaarcard(result.adhaar_photo);
  };
  const handleProgressA = (data: any) => {
    setProgress(Math.round((100 * data.loaded) / data.total));
  };
  const handleProgressB = (data: any) => {
    setProgressB(Math.round((100 * data.loaded) / data.total));
  };
  const handleProgressO = (data: any) => {
    setProgressO(Math.round((100 * data.loaded) / data.total));
  };
  const validateStep3 = () => {
    return adhaarcard.length === 0 || beneficiaryPhotos.length === 0;
  };
  const handleDeleteFiles = async (
    key: string,
    public_id: string) => {
    const payload = {
      key,
      campaignId: localStorage.getItem("campaignId"),
      public_id,
    };
    try {
      const result = await apiService.delete("campaign/files/delete", payload);
      return result;
    } catch (err) {
      return err;
    }
  };
  const deleteAdhaar = async (public_id: string) => {
    const result = await handleDeleteFiles("adhaar_photo", public_id);
    setAdhaarcard(result.data.files);
  };
  const deleteBeneficiaryPhoto = async (public_id: string) => {
    const result = await handleDeleteFiles("beneficiary_photo", public_id);
    setBeneficiaryPhotos(result.data.files);
  };
  const deleteOtherPhotos = async (public_id: string) => {
    const result = await handleDeleteFiles("others", public_id);
    setOtherPhotos(result.data.files);
  };
  const handlePhotos = async (files: any, key: any, handleProgress: any) => {
    const formData = new FormData();
    formData.append("image", files[0], files[0].name);
    formData.append("campaignId", localStorage.getItem("campaignId") as string);
    formData.append("key", key);
    const result = await apiService.upload(
      "/campaign/upload",
      formData,
      handleProgress
    );

    return result.data;
  };
  const handleSaveStep3 = () => {
    ctx.updateCampaignDetails(ctx.campaignId, "step3", true);
    socket.on("campaign", (data) => {
      ctx.setSteps(data);
    });
  };
  const handleBeneficiaryPhoto = async (files: any) => {
    const data = await handlePhotos(files, "beneficiary_photo", handleProgressB);
    setBeneficiaryPhotos(data.files);
    setProgressB(0);
  };
  const handleOtherPhoto = async (files: any) => {
    const data = await handlePhotos(files, "others", handleProgressO);
    setOtherPhotos(data.files);
    setProgressO(0);
  };
  const handleAdharcardupload = async (files: any) => {
    const data = await handlePhotos(files, "adhaar_photo", handleProgressA);
    setAdhaarcard(data.files);
    setProgress(0);
  };
  return (
    <AttachmentContext.Provider
      value={{
        progress,
        progress_b,
        progress_0,
        handleOtherPhoto,
        otherPhotos,
        deleteOtherPhotos,
        handleAdharcardupload,
        adhaarcard,
        setDocs,
        deleteAdhaar,
        handleBeneficiaryPhoto,
        deleteBeneficiaryPhoto,
        beneficiaryPhotos,
        validateStep3,
        handleSaveStep3
      }}
    >
      {children}
    </AttachmentContext.Provider>
  );
};
