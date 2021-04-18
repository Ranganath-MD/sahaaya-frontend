/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import "./tabs.scss";

interface TabProps {
  icon?: React.ReactChild;
  label: string;
  endIcon?: React.ReactChild;
  value: any;
  index?: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick: any;
}

const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
  min-width: 60%;
  margin: 0 10px;
`;

export const DevTab: React.FC<TabProps> = ({
  icon, label, endIcon, value, index, onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={value === index ? "active-tab" : "tab"}
    >
      <div>
        {icon && icon}
      </div>
      <Label>{label}</Label>
      <div>
        {endIcon && endIcon}
      </div>
    </div>
  );
};