import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  DevButton,
  Message,
} from "components";
import "./index.scss";
import styled from "styled-components";
import { LinearProgress } from "@material-ui/core";
import { RiDragDropLine } from "react-icons/ri";

const DropzoneWrapper = styled.div`
  width: 100%;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div<{ required?: boolean }>`
  color: #697384;
  font-size: 12px;
  &::after {
    content: ${(props) => (props.required ? "'*'" : false)};
    color: #b30c0c;
  }
`;

interface IUploadFileProps {
  title?: string;
  progress?: number;
  handleUpload?: any;
  required?: boolean;
}
export const Uplaod: React.FC<IUploadFileProps> = ({
  title,
  progress = 0,
  handleUpload,
  required,
}) => {
  const [open, setOpen] = useState(false);
  const handleDrop = (files: any) => {
    if (files.length === 0) return null;
    else {
      handleUpload(files);
    }
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1,
    accept: "image/jpeg, image/jpg, image/png, image/svg",
  });

  return (
    <DropzoneWrapper>
      <HeaderWrapper>
        <Label required={required}>{title}</Label>
        <DevButton onClick={() => setOpen(!open)}>
          <RiDragDropLine color="#005c22" className="icon"/>{" "}{open ? "Close" : "Open"}
        </DevButton>
      </HeaderWrapper>
      {open && (
        <>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps({ className: "dropzone_input" })} />
            <p>Drag n drop files here..</p>
          </div>
          <div>
            {progress ? (
              <LinearProgress variant="determinate" value={progress} />
            ) : null}
          </div>
        </>
      )}
      <aside>
        {fileRejections.length !== 0 ? (
          <Message error>
            Only Jpeg, Jpg, png and svg images and max one image allowed
          </Message>
        ) : null}
      </aside>
    </DropzoneWrapper>
  );
};
