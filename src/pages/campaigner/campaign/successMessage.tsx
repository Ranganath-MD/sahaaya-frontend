import { Dialog, DialogContent } from "@material-ui/core";
import { navigate } from "@reach/router";
import { DevButton } from "components";
import { CampaignContext } from "context";
import React, { useContext } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import styled from "styled-components";

const iconStyle = {
  width: "3rem",
  height: "4rem",
};

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justfy-content: center;
  align-items: center;

  p {
    font-size: 18px;
    font-weight: 600;
    color: #2a415d;
  }
  button {
    margin: 15px 0;
  }
`;

export const SuccessMessage: React.FC = () => {
  const ctx = useContext(CampaignContext);

  const handleNavigate = () => {
    navigate("/dashboard", {
      replace: true
    });
  };
  return (
    <Dialog open={ctx.openSuccess}>
      <DialogContent>
        <MessageWrapper>
          <RiCheckboxCircleFill color="green" style={iconStyle}/>
          <p>Your Request has been submitted for review</p>
          <DevButton bordered onClick={handleNavigate}>Go Back to Dashboard</DevButton>
        </MessageWrapper>
      </DialogContent>
    </Dialog>
  );
};