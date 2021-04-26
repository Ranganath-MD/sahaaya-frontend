/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import "./index.scss";
import styled from "styled-components";

const Label = styled.div<{ required: boolean }>`
  color: #697384;
  font-size: 14px;
  &::after {
    content: ${(props) => (props.required ? "'*'" : false)};
    color: #2a415d;
  }
`;

export const MaskedInput: React.FC<NumberFormatProps> = (props) => {
  return (
    <>
      {props.label ? (
        <Label required={props.required as boolean}>{props.label}</Label>
      ) : null}
      <NumberFormat {...props} className="number-input" allowNegative={false} />
    </>
  );
};

export const CurrencyInput = ({
  value,
  label,
  onValueChange,
  handleBlur,
}: any) => {
  const input = useMemo(
    () => (
      <MaskedInput
        value={value}
        thousandSeparator={true}
        prefix={"₹"}
        thousandsGroupStyle="lakh"
        label={label}
        allowEmptyFormatting
        inputMode="numeric"
        onBlur={handleBlur}
        onValueChange={onValueChange}
      />
    ),
    [value]
  );

  return <>{input}</>;
};
