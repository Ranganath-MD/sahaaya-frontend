import { RouteComponentProps } from "@reach/router";
import React, { useContext, useEffect } from "react";
import { Seo } from "../../../components/layout/Seo";
import { AuthContext } from "../../../context";
import { apiService } from "../../../utils/axiosBaseRequest";

export const AdminDashboard: React.FC<RouteComponentProps> = () => {
  const context = useContext(AuthContext);

  const getCategories = async () => {
    if(localStorage.getItem("token")){
      const result = await apiService.get("/categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Seo title="Admin Dashboard"/>
      <h1>Admin Dashboard</h1>
    </>
  );
};
