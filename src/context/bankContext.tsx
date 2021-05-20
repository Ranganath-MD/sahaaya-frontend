// import { navigate } from "@reach/router";
import React, { createContext, useContext, useState } from "react";
import { useDebounce } from "react-use";
import { apiService, socket } from "utils";
import { CampaignContext } from "./campaignContext";

// import { apiService } from "utils";

export const BankContext = createContext<any>({});

export const BankProvider: React.FC = ({ children }) => {
  const ctx = useContext(CampaignContext);

  const [bankName, setBankName] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [ifsc, setIfsc] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [ifscError, setIfscError] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [accountNameError, setAccountNameError] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState(null);
  const [accountNumberError, setAccountNumberError] = useState("");

  const [,] = useDebounce(() => getBankDetails(), 2000, [ifsc]);
  const [,] = useDebounce(() => updateBank("accountNumber", accountNumber), 2000, [accountNumber]);

  const getBankDetails = async () => {
    if (ifsc === "") return;
    if (ifsc === undefined) return null;
    try {
      const bankDetail = await apiService.get(`campaign/ifsc/${ifsc}`);
      if (bankDetail?.data.error) {
        setIfscError(bankDetail?.data.error);
        setIsVerified(false);
        setBankName("");
        setBranch("");
      }else {
        setIfscError("");
        setBankName(bankDetail.data.BANK);
        setBranch(bankDetail.data.BRANCH);
        setIsVerified(true);
        updateBank("bankName", bankDetail.data.BANK);
        updateBank("branch", bankDetail.data.BRANCH);
        updateBank("ifsccode", ifsc);
      }
    }catch(err){
      if (err) setIsVerified(false);
    }
  };

  const handleIFSC = (e: any) => {
    setIfsc(e.target.value);
    if (e.target.value === "") setIfscError("IFSC Code is Required");
    else {
      setIfscError("");
    }
  };

  const handleAccountName = (e: any) => {
    if (accountName === "") setAccountNameError("Account Name is required");
    else {
      setAccountNameError("");
      setAccountName(e.target.value);
      updateBank("accountName", e.target.value);
    }
  };
  const clear = () => {
    setBankName("");
    setBranch("");
    setIfsc("");
    setAccountName("");
    setAccountNumberError("");
    setIfscError("");
    setIsVerified(false);
  };
  const handleAccountNumber = (value: any) => {
    setAccountNumber(value);
    if (value === "") setAccountNumberError("Account Number is required");
    else {
      setAccountNumberError("");
    }
  };
  const setBankDetails = (data: any) => {
    setBankName(data?.bankName);
    setBranch(data?.branch);
    setIfsc(data?.ifsccode);
    setAccountName(data?.accountName);
    setAccountNumber(data?.accountNumber);
  };

  const isValidStep4 = () => {
    return !isVerified || accountName === "" ||  accountNumber === "";
  };

  const updateBank = (key: string, value: any) => {
    if (!ctx.campaignId) return null;
    const cmp: ICampaignPayload = {
      campaignId: ctx.campaignId,
      campaignKey: key,
      value: value,
    };
    socket.emit("update-bank-details", cmp);
    // socket.on("campaign", (data) => {
    // });
  };

  const handleSaveStep4 = () => {
    ctx.updateCampaignDetails(ctx.campaignId, "step4", true);
    socket.on("campaign", (data) => {
      ctx.setSteps(data);
    });
  };

  return (
    <BankContext.Provider
      value={{
        bankName,
        branch,
        ifsc,
        ifscError,
        accountName,
        accountNumber,
        handleIFSC,
        handleAccountName,
        handleAccountNumber,
        isVerified,
        accountNameError,
        accountNumberError,
        setAccountName,
        setAccountNumber,
        setBankDetails,
        isValidStep4,
        handleSaveStep4,
        clear
      }}
    >
      {children}
    </BankContext.Provider>
  );
};
