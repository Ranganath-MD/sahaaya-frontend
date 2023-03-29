import { Container } from "@material-ui/core";
import React, { useContext } from "react";
import styled from "styled-components";
import { CategoryCard } from "components";
import { BankContext, BaseContext, BeneficiaryContext, CampaignContext } from "context";
import { Spinner } from "components/progressbar/global";

const Heading = styled.h1`
  text-align: center;
  margin-top: 10vh;
`;
const SubHeading = styled.p`
  text-align: center;
  color: #767676;
`;
export const CreateCampaign: React.FC = () => {
  const ctx = useContext(BaseContext);
  const campaign_ctx = useContext(CampaignContext);
  const beneficiary_ctx = useContext(BeneficiaryContext);
  const bank = useContext(BankContext);

  const handleClick = (c: string) => {
    campaign_ctx.clear();
    beneficiary_ctx.clear();
    bank.clear();
    campaign_ctx.handleCreateCampaign(c);
  };

  return (
    <Container>
      {campaign_ctx.isLoading && <Spinner />}
      <div>
        <Heading>Start a Campaign</Heading>
        <SubHeading>
          Select one of the categories to start a campaign
        </SubHeading>
      </div>
      <div className="section-flex">
        {ctx.categories?.map((c: any) => (
          <CategoryCard
            key={c.key}
            iconComponent={ctx.renderCategoryIcons(c.key)}
            title={c.title}
            description={c.description}
            onClick={() => handleClick(c.title)}
          />
        ))}
      </div>
    </Container>
  );
};
