import { RouteComponentProps } from "@reach/router";
import React, { useContext } from "react";
import { NavigationSidebar, Seo } from "components";
import { AdminDashboardContext } from "context";
// import { apiService } from "../../../utils/axiosBaseRequest";

export const AdminDashboard: React.FC<RouteComponentProps> = () => {
  const ctx = useContext(AdminDashboardContext);

  // const getCategories = async () => {

  // };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <>
      <Seo title="Admin Dashboard" />
      <h1>Admin Dashboard</h1>

      <NavigationSidebar
        variant="permanent"
        open={ctx.openSideBar}
        onClose={() => ctx.setOpenSideBar(!ctx.openSideBar)}
      />
    </>
  );
};
