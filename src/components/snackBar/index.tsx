/* eslint-disable no-unused-vars */
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { VscClose } from "react-icons/vsc";

export const MessageBox = (props: ISnackbarProps) => {

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={props.open}
      autoHideDuration={5000}
      onClose={props.handleClose}
      message={props.message}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={props.handleClose}
          >
            <VscClose />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};
