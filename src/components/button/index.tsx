/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Button = styled.button<IButtonProps>`
  outline: none;
  padding: 0.25rem 0.75rem;
  cursor: ${(props) => !props.disabled && "pointer"};
  min-height: ${(props) => props.minHeight ? props.minHeight : "2rem"};
  min-width: ${(props) => props.fullWidth ? "100%" : "2rem"};
  color: ${(props) =>
    props.color ? props.color : props.primary ? "white" : "black"};
  opacity: ${(props) => props.loading && ".6"};
  background: ${(props) =>
    props.disabled
      ? "#959595"
      : props.background
        ? props.background
        : props.primary
          ? "#0db469"
          : "transparent"};
  border: ${(props) => (props.bordered ? "1px solid #0db469" : "none")};
  font-weight: 600;
  box-shadow: ${(props) =>
    props.isShadow
      ? `0px 3px 1px -2px rgba(0,0,0,0.2), 
    0px 2px 2px 0px rgba(0,0,0,0.14), 
    0px 1px 5px 0px rgba(0,0,0,0.12);`
      : null};
  border-radius: 4px;
  &:hover {
    border-color: #0db469;
  }
`;

const ButtonSpinner = styled.div<IButtonSpinner>`
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    color: ${(props) => (props.primary ? "#fff" : "black")};
    margin-right: 0.5rem;
  }
`;
export const DevButton: React.FC<IButtonProps> = ({
  ...props
}) => {
  return (
    <div>
      <Button
        onClick={props.disabled ? undefined : props.onClick}
        primary={props.primary}
        disabled={props.disabled}
        loading={props.loading}
        background={props.background}
        isShadow={props.isShadow}
        color={props.color}
        bordered={props.bordered}
        fullWidth={props.fullWidth}
        type={props.submit ? "submit" : "button"}
        minHeight={props.minHeight}
      >
        {props.loading ? (
          <ButtonSpinner>
            <CircularProgress size={20} className="spinner" />
            <span>{props.loadingText ? props.loadingText : "Loading..."}</span>
          </ButtonSpinner>
        ) : (
          props.children
        )}
      </Button>
    </div>
  );
};
