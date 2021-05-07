import axios from "axios";
import { formatISO } from "date-fns";
import React, { createContext, useContext, useState } from "react";
import { socket } from "utils";
import { CampaignContext } from "./campaignContext";

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
  const [emailError, setEmailError] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [phone, setPhone] = useState<number | null>(null);
  const [phoneError, setPhoneError] = useState<string>("");
  const [pin, setPin] = useState<number | null>(null);
  const [pinError, setPinError] = useState<string>("");
  const [adhaar, setAdhaar] = useState<number | null>(null);
  const [adhaarError, setAdhaarError] = useState<string>("");
  const handleDateofBirth = (date: any) => {
    setDob(date);
    if (date === null) setDobError("DOB is required");
    else {
      setDobError("");
      const dateObj = dob === null ? new Date() : dob;
      updateBeneficiary(ctx.campaignId, "dob", formatISO(dateObj as Date));
    }
  };
  const handleAddress = (e: any) => {
    if (address === "") setAddressError("Address is required");
    else {
      setAddressError("");
      updateBeneficiary(ctx.campaignId, "address", e.target.value);
    }
  };
  const handlePhone = (value: any) => {
    setPhone(value);
    if (value.length !== 10) setPhoneError("Phone number is required");
    else {
      setPhoneError("");
      updateBeneficiary(ctx.campaignId, "phone", value);
    }
  };

  const setBeneficiaryData = (data: any) => {
    setFirstName(data?.firstName);
    setLastName(data?.lastName);
    setAddress(data?.address);
    setPhone(data?.phone);
    setEmail(data?.email);
    setPin(data?.pin);
    setAdhaar(data?.adhaar);
    if (data?.dob) setDob(new Date(data.dob));
  };

  const getPINValue = async (value: number) => {
    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${value}`
      );
      if (res.data[0].PostOffice === null) {
        setPinError("Invalid PIN Code");
        setCity("");
        setState("");
      } else {
        setPinError("");
        setCity(res.data[0].PostOffice[0].Block);
        setState(res.data[0].PostOffice[0].State);
        updateBeneficiary(ctx.campaignId, "pin", value);
        updateBeneficiary(
          ctx.campaignId,
          "city",
          res.data[0].PostOffice[0].Block
        );
        updateBeneficiary(
          ctx.campaignId,
          "state",
          res.data[0].PostOffice[0].State
        );
      }
    } catch (err) {
      if (err) setPinError("Invalid PIN Code");
    }
  };

  const handleFirstName = (e: any) => {
    if (firstName === "") setFirstNameError("First Name is Required");
    else {
      setFirstNameError("");
      updateBeneficiary(ctx.campaignId, "firstName", e.target.value);
    }
  };
  const handleLastName = (e: any) => {
    if (lastName === "") setLastNameError("Last Name is Required");
    else {
      setLastNameError("");
      updateBeneficiary(ctx.campaignId, "lastName", e.target.value);
    }
  };
  const isValidStep2 = () => {
    return (
      firstNameError !== "" ||
      lastNameError !== "" ||
      dobError !== "" ||
      addressError !== "" ||
      emailError !== "" ||
      pinError !== "" ||
      adhaarError !== ""
    );
  };

  const handleSaveStep2 = () => {
    ctx.updateCampaignDetails(ctx.campaignId, "step2", true);
    socket.on("campaign", (data) => {
      ctx.setSteps(data);
    });
  };

  const handleAdhaar = (value: any) => {
    setAdhaar(value);
    if (value.length !== 16)
      setAdhaarError("Adhaar Number should be of 16 Characters");
    else {
      setAdhaarError("");
      updateBeneficiary(ctx.campaignId, "adhaar", value);
    }
  };

  const handleEmail = (e: any) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email === "") setEmailError("Email is required");
    if (!regex.test(e.target.value)) {
      setEmailError("Invalid Email address");
    } else {
      setEmailError("");
      updateBeneficiary(ctx.campaignId, "email", e.target.value);
    }
  };

  const updateBeneficiary = (id: string, key: string, value: any) => {
    if (!id) return null;
    const cmp: ICampaignPayload = {
      campaignId: id,
      campaignKey: key,
      value: value,
    };
    socket.emit("update-beneficiary", cmp);
    // socket.on("campaign", (data) => {
    // });
  };
  return (
    <BeneficiaryContext.Provider
      value={{
        dob,
        setDob,
        handleDateofBirth,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        handleLastName,
        address,
        setAddress,
        email,
        setEmail,
        phone,
        setPhone,
        pin,
        setPin,
        city,
        setCity,
        state,
        setState,
        getPINValue,
        handleFirstName,
        setBeneficiaryData,
        firstNameError,
        lastNameError,
        dobError,
        handleAddress,
        addressError,
        handlePhone,
        phoneError,
        emailError,
        handleEmail,
        pinError,
        adhaar,
        setAdhaar,
        adhaarError,
        handleAdhaar,
        isValidStep2,
        handleSaveStep2
      }}
    >
      {children}
    </BeneficiaryContext.Provider>
  );
};
