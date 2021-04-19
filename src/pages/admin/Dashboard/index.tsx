import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Seo } from "components";
// import { AuthContext } from "../../../context";
// import { apiService } from "../../../utils/axiosBaseRequest";

export const AdminDashboard: React.FC<RouteComponentProps> = () => {
  // const context = useContext(AuthContext);

  // const getCategories = async () => {

  // };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <>
      <Seo title="Admin Dashboard"/>
      <h1>Admin Dashboard</h1>
    </>
  );
};
