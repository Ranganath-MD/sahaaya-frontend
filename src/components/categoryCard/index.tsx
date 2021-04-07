import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 20px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12) !important;
  margin: 10px;
`;
const Title = styled.span`
  margin: 0;
  font-size: 1.1em;
  font-weight: bold;
  color: #2A415D;
`;
const Description = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #767676;
  line-height: 1.4rem;
  margin: 5px 0 0;
  display: block;
`;
const Icon = styled.div`
  margin-bottom: 10px
`;

export const CategoryCard: React.FC<CardProps> = ({
  iconComponent, title, description
}) => {
  return (
    <Card>
      <Icon>{iconComponent}</Icon>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};
