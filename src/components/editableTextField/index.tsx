import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import "./index.scss";

const EditableTextField = styled.textarea<ITextFields>`
  padding: 10px 0px;
  width: 100%;
  resize: none;
  border-radius: 5px;
  border: ${(props) => (props.value === "" ? "2px solid #b30c0c" : "none")};
  margin: 5px 0;
  &:focus {
    border: 2px solid #0052cc;
    outline: none;
    background-color: transparent;
  }
  &:hover {
    outline: none;
    background-color: #f5f7fa;
  }
`;

const FieldWrapper = styled.div`
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
  rows, cols,
  className
}) => {
  const textareaRef = useRef<any>(null);

  useEffect(() => {
    if(textareaRef.current !== null) {
      textareaRef.current.style.height = "0px";
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);

  return (
    <FieldWrapper>
      <div>
        {label && <Label itemProp={label}>{label}</Label>}
      </div>
      <EditableTextField
        width={width}
        autoFocus={autoFocus}
        maxLength={maxLength}
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        requiredMessage={requiredMessage}
        required={required}
        cols={cols ? cols : 30}
        rows={rows ? rows : 2}
        onChange={onChange}
        ref={textareaRef}
        onBlur={onBlur}
      />
      <div>
        {value === "" && <Message>{requiredMessage ? requiredMessage : "This field is required"}</Message>}
      </div>
    </FieldWrapper>
  );
};
