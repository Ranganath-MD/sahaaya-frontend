import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@material-ui/core";
import { DevButton, FormInput } from "components";
import styled from "styled-components";
import "./modal.scss";

interface Iprops extends DialogProps {
  onCancel?: any;
  onApprove?: any;
  onClick?: any;
  name?: string;
  title?: string;
  loadingText: string;
  buttonText: "Approve" | "Reject";
  isLoading?: boolean;
  inputError?: boolean;
}

const Title = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const StatusChangeModal: React.FC<Iprops> = ({
  onCancel,
  onClick,
  open,
  onClose,
  name,
  title,
  isLoading,
  loadingText,
  buttonText,
}) => {
  const [input, setInput] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  const statusBackground = () => {
    switch (buttonText) {
    case "Approve":
      return "#0db469";
    case "Reject":
      return "red";
    default:
      return "#2A415D";
    }
  };

  const handleBlur = () => {
    if (input === "") setInputError("Reason is required");
    else {
      setInputError("");
    }
  };

  const handleCancel = () => {
    setInput("");
    setInputError("");
    onCancel();
  };

  const handleChange = (value: string) => {
    setInput(value);
    if (value === "") setInputError("Reason is required");
    else {
      setInputError("");
    }
  };

  const handleClick = (e: any) => {
    if (buttonText !== "Reject")
      return onClick({
        ...e,
        status: buttonText,
      });
    else {
      if (input === "") return null;
      else {
        return onClick({
          ...e,
          status: buttonText,
          inputText: input
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        <Title>{title || name}</Title>
      </DialogTitle>
      {buttonText === "Reject" ? (
        <DialogContent style={{ minHeight: "8rem" }}>
          <p>Are you sure want to {name} this request?</p>
          <FormInput
            autoFocus
            name="reject"
            type="text"
            placeholder="Reason"
            label="Reason"
            required
            error={!!inputError}
            errorMsg={inputError}
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
          />
        </DialogContent>
      ) : (
        <DialogContent>
          <p>Are you sure want to {name} this request?</p>
        </DialogContent>
      )}
      <DialogActions style={{ marginTop: 20 }}>
        <DevButton background="black" color="white" onClick={handleCancel}>
          Cancel
        </DevButton>
        <DevButton
          background={statusBackground()}
          color="white"
          onClick={handleClick}
          isloading={isLoading}
          loadingText={loadingText}
        >
          {buttonText}
        </DevButton>
      </DialogActions>
    </Dialog>
  );
};
