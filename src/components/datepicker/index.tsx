import React, { useMemo } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";
import styled from "styled-components";

const Label = styled.div<{ required: boolean }>`
  color: #697384;
  font-size: 14px;
  &::after {
    content: ${(props) => props.required ? "'*'" : false};
    color: #2a415d;
  }
`;

const Message = styled.span`
    height: 5px;
    font-size: 10px;
    color: #0052cc;
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
        {props.label && <Label required={props.required as boolean}>{props.label}</Label>}
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={props.selected}
          onChange={props.onChange}
          className={props.error ? "error" : "normal"}
          minDate={props.minDate}
          maxDate={props.maxDate}
          placeholderText={props.placeholderText}
          withPortal
          selectsRange={props.selectsRange}
          // customInput={<DevInput value={props.value} handleChange={props.onChange}/>}
        />
        <Message>{props.message}</Message>
      </>
    ),
    [props]
  );
  return <>{datepicker}</>;
};
