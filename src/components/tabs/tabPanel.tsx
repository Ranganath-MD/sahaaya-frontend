import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children, value, index, ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};