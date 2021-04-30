import React, { useMemo } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";
import styled from "styled-components";
import { MaskedInput } from "components/maskedInput";

const Label = styled.div<{ required: boolean }>`
  color: #697384;
  font-size: 12px;
  &::after {
    content: ${(props) => (props.required ? "'*'" : false)};
    color: #b30c0c;
  }
`;

const Message = styled.div<{ error?: boolean }>`
  height: 5px;
  font-size: 10px;
  color: ${(props) => (props.error ? "#b30c0c" : "#0052cc")};
  font-weight: 600;
`;

interface Props extends ReactDatePickerProps {
  label?: string;
  error?: boolean;
  message?: string;
}
export const DevDatePicker: React.FC<Props> = (props) => {
  const datepicker = useMemo(
    () => (
      <>
        {props.label && (
          <Label required={props.required as boolean}>{props.label}</Label>
        )}
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={props.selected}
          onChange={props.onChange}
          minDate={props.minDate}
          maxDate={props.maxDate}
          showMonthDropdown={props.showMonthDropdown}
          showYearDropdown={props.showYearDropdown}
          placeholderText={props.placeholderText}
          withPortal={props.withPortal}
          selectsRange={props.selectsRange}
          customInput={
            <MaskedInput
              format="##/##/####"
              error={props.error}
              placeholder="MM/DD/YYYY"
            />
          }
        />
        <Message error={props.error}>{props.message}</Message>
      </>
    ),
    [props]
  );
  return <>{datepicker}</>;
};
