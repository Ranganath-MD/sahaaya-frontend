import { FormControl, InputLabel, Input, InputAdornment, IconButton, FormHelperText } from "@material-ui/core";
import React from "react";


interface IDevInput {
  type: string
  icon?: React.ReactChild
  value: string
  // eslint-disable-next-line no-unused-vars
  handleChange: ((_: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void) | undefined
  id: string
  label: string
  onclickIcon?: () => void
  error?: boolean
  required?: boolean
  fullwidth?: boolean
  autoFocus?: boolean
  helperText?: string
}
const inputStyle = {
  margin: "10px 0"
};

export const DevInput: React.FC<IDevInput> = ({
  ...props
}) => {
  return (
    <FormControl fullWidth={props.fullwidth} error={props.error} style={inputStyle}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Input
        id={props.id}
        error={props.error}
        type={props.type}
        autoFocus={props.autoFocus}
        required={props.required}
        value={props.value}
        onChange={props.handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={props.onclickIcon}
            >
              {props.icon}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

