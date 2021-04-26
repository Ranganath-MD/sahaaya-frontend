/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  AccordionActions,
} from "@material-ui/core";
import styled from "styled-components";
import { RiArrowDownSLine, RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import { DevButton } from "components/button";

const HeaderText = styled.span`
  font-weight: 600;
  color: #697384;
  margin: 0 10px;
`;

export const ExpandlePanelActions: React.FC<Partial<ICustomAccordian>> = ({
  actionMenu = true,
  isSave = true,
  isCancel,
  children,
  onCancel,
  onSave,
  disableSave
}) => {
  return (
    <>
      {actionMenu && (
        <>
          <Divider />
          <AccordionActions>
            {children}
            {isCancel && (
              <DevButton onClick={onCancel} bordered>
                Cancel
              </DevButton>
            )}
            {isSave && (
              <DevButton onClick={onSave} primary disabled={disableSave}>
                Save
              </DevButton>
            )}
          </AccordionActions>
        </>
      )}
    </>
  );
};

export const ExpandablePanel: React.FC<ICustomAccordian> = ({
  expanded,
  onChange,
  headerText,
  secondaryText,
  children,
  actionMenu,
  isSave,
  defaultExpanded,
  isCancel,
  disabled,
  actionChildren,
  onSave,
  error,
  disableSave,
  errorMsg,
  onCancel,
  showStatus,
  headerIcon,
}) => {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      expanded={expanded}
      onChange={onChange}
      disabled={disabled}
    >
      <AccordionSummary expandIcon={<RiArrowDownSLine />}>
        {error ? <RiCloseCircleFill color={"red"} /> : showStatus ? <RiCheckboxCircleFill color={"#0db469"} /> : headerIcon}
        <HeaderText>{headerText}</HeaderText>
        {secondaryText ||
          (errorMsg && (
            <span>{errorMsg ? errorMsg : secondaryText}</span>
          ))}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
      <ExpandlePanelActions
        actionMenu={actionMenu}
        isSave={isSave}
        isCancel={isCancel}
        onSave={onSave}
        disableSave={disableSave}
        onCancel={onCancel}
      >
        {actionChildren}
      </ExpandlePanelActions>
    </Accordion>
  );
};
