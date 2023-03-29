/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { NumericFormat, PatternFormat, NumericFormatProps } from "react-number-format";
import "./index.scss";
import styled from "styled-components";

const Label = styled.div<{ required?: boolean }>`
  color: #697384;
  font-size: 12px;
  &::after {
    content: ${(props) => (props.required ? "'*'" : false)};
    color: #b30c0c;
  }
`;
interface Props extends NumericFormatProps {
  error?: boolean;
  label?: string;
  required?: boolean;
  errormsg?: string;
  format?: string;
}

const Message = styled.div<{ error?: boolean }>`
  height: 5px;
  font-size: 10px;
  color: ${(props) => (props.error ? "#b30c0c" : "#0052cc")};
  font-weight: 600;
`;

export const MaskedInput: React.FC<Props> = ({ error = false, ...props }) => {
  return (
    <>
      {props.label ? (
        <Label required={props.required as boolean}>{props.label}</Label>
      ) : null}
      <NumericFormat
        {...props}
        className={(error as boolean) ? "error" : "normal"}
        allowNegative={false}
      />
      <Message error={error}>{props.errormsg}</Message>
    </>
  );
};

export const ReadOnlyMaskInput = ({ wrapperStyle, ...props }: any) => {
  return (
    <p style={wrapperStyle}>
      <PatternFormat {...props} allowNegative={false} />
    </p>
  );
};

export const CurrencyInput = ({
  value,
  label,
  onValueChange,
  handleBlur,
  displayType
}: any) => {
  const input = useMemo(
    () => (
      <MaskedInput
        value={value}
        thousandSeparator={true}
        prefix={"₹"}
        thousandsGroupStyle="lakh"
        label={label}
        displayType={displayType}
        inputMode="numeric"
        onBlur={handleBlur}
        required
        onValueChange={onValueChange}
      />
    ),
    [value]
  );

  return <>{input}</>;
};
export const AgeInput = ({ value, label, onValueChange, handleBlur }: any) => {
  const handleMaxValue = (inputObj: any) => {
    const MAX_VAL = 100;
    const { value } = inputObj;
    if (value <= MAX_VAL && value > 0) return inputObj;
  };
  const input = useMemo(
    () => (
      <MaskedInput
        value={value}
        label={label}
        onBlur={handleBlur}
        onValueChange={onValueChange}
        isAllowed={handleMaxValue}
        required
      />
    ),
    [value]
  );

  return <>{input}</>;
};

export const Phone = ({
  value,
  required,
  label,
  onValueChange,
  error,
  errormsg,
  placeholder,
  format
}: any) => {
  const input = useMemo(
    () => (
      <MaskedInput
        value={value}
        label={label}
        format={format}
        onValueChange={onValueChange}
        required={required}
        error={error || false}
        errormsg={errormsg}
        placeholder={placeholder}
      />
    ),
    [value]
  );

  return <>{input}</>;
};
