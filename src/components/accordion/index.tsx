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
import { RiArrowDownSLine, RiCloseCircleFill } from "react-icons/ri";

const HeaderText = styled.span`
  font-weight: 600;
  color: #697384;
  margin: 0 10px;
`;

export const ExpandlePanelActions: React.FC<Partial<ICustomAccordian>> = ({
  actionMenu = true,
  isSave = true,
  isCancel = true,
  children,
  onCancel,
  onSave,
}) => {
  return (
    <>
      {actionMenu && (
        <>
          <Divider />
          <AccordionActions>
            {children}
            {isCancel && (
              <Button onClick={onCancel} size="small">
                Cancel
              </Button>
            )}
            {isSave && (
              <Button onClick={onSave} size="small" color="primary">
                Save
              </Button>
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
  errorMsg,
  onCancel,
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
        {error ? <RiCloseCircleFill color={"red"} /> : headerIcon}
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
        onCancel={onCancel}
      >
        {actionChildren}
      </ExpandlePanelActions>
    </Accordion>
  );
};
