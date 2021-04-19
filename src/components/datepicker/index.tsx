import React, { useMemo } from "react";
import { DatePicker, DatePickerProps, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import { date } from "../../utils/dateUtils";

export const DevDatePicker: React.FC<DatePickerProps> = (props) => {
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <DatePicker
        {...props}
        value={props.value}
        placeholder="DD/MM/YYYY"
        format="DD/MM/YYYY"
        maxDateMessage={"Date should not be after maximum date"}
        minDateMessage={"Date should not be before maximum date"}
      />
    </MuiPickersUtilsProvider>
  );
};

export const FromDate: React.FC<DatePickerProps> = (props) => {
  const fromDate = useMemo(
    () => (
      <DevDatePicker
        {...props}
        autoOk
        value={props.value}
        onChange={props.onChange}
        minDate={date.now}
        inputVariant={"outlined"}
      />
    ),
    [props.value]
  );
  return <>{fromDate}</>;
};

export const EndDate: React.FC<DatePickerProps> = (props) => {
  const endDate = useMemo(
    () => (
      <DevDatePicker
        {...props}
        autoOk
        value={props.value}
        onChange={props.onChange}
        minDate={date.now}
        inputVariant={"outlined"}
      />
    ),
    [props.value]
  );
  return <>{endDate}</>;
};
