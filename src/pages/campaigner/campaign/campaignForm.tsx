import { RouteComponentProps, useParams } from "@reach/router";
import React, { useContext, useEffect } from "react";
import { CampaignContext } from "../../../context";

export const CreateCampaignForm: React.FC<RouteComponentProps> = () => {
  const ctx = useContext(CampaignContext);
  const params = useParams();

  useEffect(() => {
    ctx.getCampaignById(params.id);
  }, []);

  return (
    <>
      <h1>create campaign form</h1>
    </>
  );
};
