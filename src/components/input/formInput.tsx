/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 60px;
    width: 98%;
    position: relative;
`;
const Label = styled.label`
    font-size: 12px;
    font-wieght: 600;
    padding: 5px 0;
`;
const Input = styled.input<InputProps>`
    width: 95%;
    outline: none;
    padding: 10px;
    margin: ${(props) => props.error ? "10px 0 0" : "10px 0"};
    border: ${(props) => props.error ? "1px solid #b30c0c" : "1px solid #f1f1f1"};
    background: #fff;
    color: rgba(3,27,78,.7);
    &:focus {
      outline: none;
      box-shadow: 0px 0px 2px #ff9800;
    }
`;

const Icon = styled.div<{ type: string }>`
    cursor: ${(props) => props.type === "password" && "pointer"};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
`;
const Message = styled.span`
    height: 5px;
    font-size: 10px;
    color: #b30c0c;
`;

export const FormInput: React.FC<InputProps> = ({ ...props }) => {
  return (
    <Wrapper>
      <Label>{props.label}</Label>
      <Input
        autoComplete="off"
        type={props.type}
        error={props.error}
        value={props.value}
        width={props.width}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        required={props.required}
        autoFocus={props.autoFocus}
        maxLength={props.maxlength ? props.maxlength : 128}
      />
      <Message>{props.errorMsg}</Message>
      {
        props.icon && <Icon type={props.type}>{props.icon}</Icon>
      }
    </Wrapper>
  );
};
