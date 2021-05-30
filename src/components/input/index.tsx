import React from "react";
import styled from "styled-components";

const EditableTextField = styled.input<ITextFields>`
  padding: 10px;
  width: ${(props) => props.width ? props.width : "100%"};
  resize: none;
  border-radius: 5px;
  text-align: center;
  font-size: ${(props) => (props.textSize ? props.textSize : "16px")};
  border: ${(props) => (props.value === "" ? "2px solid #b30c0c" : "none")};
  margin: 5px 0;
  font-weight: ${(props) => props.bold ? "bold" : "200"};
  &:focus {
    border: 2px solid #0052cc;
    outline: none;
    background-color: transparent;
  }
  &:hover {
    outline: none;
    background-color: #f5f7fa;
    cursor: pointer;
  }
`;

const FieldWrapper = styled.div`
  width: 100%;
  margin: 5px 0px;
`;
const Label = styled.span`
  color: #697384;
  font-size: 12px;
  &::after {
    content: ${(props) => props.itemProp && "'*'"};
    color: #b30c0c;
  }
`;
const Message = styled.span`
  height: 5px;
  font-size: 10px;
  color: #b30c0c;
`;

export const EditableInput: React.FC<ITextFields> = ({
  width,
  placeholder,
  defaultValue,
  value,
  onChange,
  autoFocus,
  maxLength,
  onBlur,
  required,
  label,
  requiredMessage,
  className,
  textSize,
  bold
}) => {

  return (
    <FieldWrapper>
      {label && <Label itemProp={label}>{label}</Label>}
      <EditableTextField
        width={width}
        autoFocus={autoFocus}
        maxLength={maxLength}
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        textSize={textSize}
        requiredMessage={requiredMessage}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        bold={bold}
      />
      <div>
        {value === "" && <Message>{requiredMessage ? requiredMessage : "This field is required"}</Message>}
      </div>
    </FieldWrapper>
  );
};
