import axios from "axios";
import { formatISO } from "date-fns";
import React, { createContext, useContext, useState } from "react";
import { apiService, socket } from "utils";
import { CampaignContext } from "./campaignContext";
// import { navigate } from "@reach/router";
// import { addDays, formatISO } from "date-fns";
// import { apiService, socket } from "utils";

export const BeneficiaryContext = createContext<any>({});

export const BeneficiaryProvider: React.FC = ({ children }) => {
  const ctx = useContext(CampaignContext);
  const [firstName, setFirstName] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [dob, setDob] = useState<null | Date>(null);
  const [dobError, setDobError] = useState("");
  const [address, setAddress] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [phone, setPhone] = useState<number | null>(null);
  const [phoneError, setPhoneError] = useState<string>("");
  const [pin, setPin] = useState<number | null>(null);

  const handleDateofBirth = (date: any) => {
    setDob(date);
    if(date === null) setDobError("DOB is required");
    else {
      setDobError("");
      const dateObj = dob === null ? new Date() : dob;
      updateBeneficiary(ctx.campaignId, "dob", formatISO(dateObj as Date));
    }
  };
  const handleAddress = (e: any) => {
    if(address === "") setAddressError("Address is required");
    else {
      setAddressError("");
      updateBeneficiary(ctx.campaignId, "address", e.target.value);
    }
  };
  const handlePhone = (value: any) => {
    setPhone(value);
    if(value.length !== 10) setPhoneError("Phone number is required");
    else {
      setPhoneError("");
      updateBeneficiary(ctx.campaignId, "phone", value);
    }
  };

  const setBeneficiaryData = (data: any) => {
    setFirstName(data?.firstName);
    setLastName(data?.lastName);
    setAddress(data?.address);
    if(data?.dob) setDob(new Date(data.dob));
  };

  const getPINValue = async (value: number) => {
    try {
      const res = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
      if(res.data[0].PostOffice === null) {
        setCity("");
        setState("");
      }else {
        setCity(res.data[0].PostOffice[0].Block);
        setState(res.data[0].PostOffice[0].State);
      }
    }catch(err) {
      console.log(err);
    }
  };

  const handleFirstName = (e: any) => {
    if(firstName === "") setFirstNameError("First Name is Required");
    else {
      setFirstNameError("");
      updateBeneficiary(ctx.campaignId, "firstName", e.target.value);
    }
  };
  const handleLastName = (e: any) => {
    if(lastName === "") setLastNameError("Last Name is Required");
    else {
      setLastNameError("");
      updateBeneficiary(ctx.campaignId, "lastName", e.target.value);
    }
  };

  const updateBeneficiary = (id: string, key: string, value: any) => {
    const cmp: ICampaignPayload = {
      campaignId: id,
      campaignKey: key,
      value: value
    };
    socket.emit("update-beneficiary", cmp);
    socket.on("campaign", (data) => {
      setFirstName(data?.beneficiary.firstName);
    });

  };
  return (
    <BeneficiaryContext.Provider
      value={{
        dob, setDob,
        handleDateofBirth,
        firstName, setFirstName,
        lastName, setLastName,
        handleLastName,
        address, setAddress,
        email, setEmail,
        phone, setPhone,
        pin, setPin,
        city, setCity,
        state, setState,
        getPINValue, handleFirstName,
        setBeneficiaryData,
        firstNameError, lastNameError,
        dobError, handleAddress,
        addressError, handlePhone,
        phoneError
      }}
    >
      {children}
    </BeneficiaryContext.Provider>
  );
};
