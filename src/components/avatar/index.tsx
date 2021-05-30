import React from "react";
import "./index.scss";
import { Badge, Avatar } from "@material-ui/core";
import { VscEdit } from "react-icons/vsc";

interface IUpload {
  alt?: string;
  src?: string;
  onChange?: any
}
export const UserAvatar: React.FC<IUpload> = ({ alt, src, onChange }) => {
  return (
    <div className="avatar_container">
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <div>
            <input
              className="input_uplaod"
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg, .svg"
              onChange={onChange}
            />
            <label htmlFor="imageUpload">
              <VscEdit />
            </label>
          </div>
        }
      >
        <Avatar
          alt={alt ? alt : "Avatar"}
          src={src ? src : ""}
          style={{ width: 80, height: 80 }}
        />
      </Badge>
    </div>
  );
};
