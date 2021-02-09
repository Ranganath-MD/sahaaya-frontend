import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

interface IButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: string;
  primary?: boolean;
  background?: string;
  loading?: boolean;
  disabled?: boolean;
  isShadow?: boolean;
  bordered?: boolean;
}
interface IStyledButtonProps {
  color?: string;
  bordered?: boolean;
  primary?: boolean;
  isShadow?: boolean;
  disabled?: boolean;
  loading?:boolean;
  background?: string;
}
interface IButtonSpinner{
  primary?: boolean;
}

const Button = styled.button<IStyledButtonProps>`
  outline: none;
  padding: 0.25rem 0.75rem;
  cursor: ${(props) => !props.disabled && "pointer"};
  min-height: 2rem;
  min-width: 2rem;
  color: ${ (props) =>
    props.color ? props.color :
      props.primary ? "white" : "black" };
  opacity: ${(props) => props.loading && ".6"};
  background: ${(props) =>
    props.disabled ? "#959595":
      props.background ? props.background :
        props.primary ? "#0db469" : "transparent" };
  border: ${(props) => props.bordered ? "1px solid #0db469" : "none" };
  font-weight: 600;
  box-shadow: ${(props) => props.isShadow ?
    `0px 3px 1px -2px rgba(0,0,0,0.2), 
    0px 2px 2px 0px rgba(0,0,0,0.14), 
    0px 1px 5px 0px rgba(0,0,0,0.12);` : null};
  border-radius: 4px;
  &:hover{
    border-color: #0db469;
  }
`;

const ButtonSpinner = styled.div<IButtonSpinner>`
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner{
    color: ${(props) => props.primary ? "#fff" : "black"};
    margin-right: .5rem ;
  }
`;
export const DevButton: React.FC<IButtonProps> = (
  { onClick, children, primary, loading, disabled, background, isShadow, color, bordered }) => {
  return (
    <div>
      <Button
        onClick={disabled ? undefined : onClick}
        primary={primary}
        disabled={disabled}
        loading={loading}
        background={background}
        isShadow={isShadow}
        color={color}
        bordered={bordered}
      >
        {loading ?
          <ButtonSpinner>
            <CircularProgress size={20} className="spinner"/>
            <span>loading...</span>
          </ButtonSpinner>: children }
      </Button>
    </div>
  );
};
