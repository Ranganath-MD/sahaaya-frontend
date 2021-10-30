import { CloudinaryContext, Transformation, Image, CloudinaryComponentProps } from "cloudinary-react";
import React from "react";

export const CloudinaryImage: React.FC<CloudinaryComponentProps> = ({
  publicId, width=20, crop="scale", angle
}) => {
  return (
    <CloudinaryContext cloudName="devsahaaya">
      <Image publicId={publicId}>
        <Transformation width={width} crop={crop} angle={angle}/>
      </Image>
    </CloudinaryContext>
  );
};
