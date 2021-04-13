import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 10px;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 12%) 1px 1px 5px !important;
`;
const ImageWrapper = styled.div`
  padding: 10px;
  width: 60px;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
`;
const TextWrapper = styled.div`
  padding: 10px;
  text-decoration: none;
  h1 {
    color: #2a415d;
    margin: 10px;
    font-size: 1.5em;
  }
  p {
    color: #767676;
    margin: 10px;
  }
`;

export const DevDashboardCard: React.FC<DashboardCard> = ({
  title,
  icon,
  description,
  handleClick
}) => {
  return (
    <CardWrapper onClick={handleClick}>
      <ImageWrapper>
        <img src={icon} alt={title} />
      </ImageWrapper>
      <TextWrapper>
        <h1>{title}</h1>
        <p>{description}</p>
      </TextWrapper>
    </CardWrapper>
  );
};
