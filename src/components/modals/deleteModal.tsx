import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@material-ui/core";
import { DevButton } from "components";
import styled from "styled-components";
import "./modal.scss";

interface Iprops extends DialogProps {
  onCancel: any;
  onDelete: any;
  isDeleteLoading?: boolean;
}

const Title = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
`;
export const DeleteModal: React.FC<Iprops> = ({
  onCancel,
  onDelete,
  open,
  onClose,
  isDeleteLoading,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Title>Delete</Title>
      </DialogTitle>
      <DialogContent>
        Are you sure want to delete this record permanetly?
      </DialogContent>
      <DialogActions style={{ marginTop: 20 }}>
        <DevButton background="black" color="white" onClick={onCancel}>
          Cancel
        </DevButton>
        <DevButton
          background="red"
          color="white"
          onClick={onDelete}
          isloading={isDeleteLoading}
          loadingText={"Deleting"}
        >
          Delete
        </DevButton>
      </DialogActions>
    </Dialog>
  );
};
