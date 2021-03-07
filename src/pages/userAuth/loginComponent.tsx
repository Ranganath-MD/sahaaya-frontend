import React, { useEffect } from "react";
import { Seo } from "../../components/layout/Seo";
import { RouteComponentProps } from "@reach/router";
import axios from "axios";
import { apiService } from "../../utils/axiosBaseRequest";

export const Login: React.FC<RouteComponentProps> = () => {
  useEffect(() => {
    try {
      const result = apiService.get("/categories");
      console.log(result)
    }catch(err){
      console.log(err);
    }
  }, []);
  return (
    <>
      <Seo title="Login to Sahaaya"/>
      <h1>Login</h1>
    </>
  );
};

