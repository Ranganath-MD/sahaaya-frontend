import React, { useEffect } from "react";
import { Provider } from "./context/index";
import { Layout, PrivateRoute } from "./components";
import { Router } from "@reach/router";
import { NotFound } from "./pages/notFound";
import { Home } from "./pages/home";
import { BrowseFundriser } from "./pages/browseCampaigns";
import { HowItWorks } from "./pages/howitWorks";
import { StartFundRiser } from "./pages/startCampaign";
import { Login } from "./pages/userAuth/loginComponent";
import { Register } from "./pages/userAuth/register";
import { AdminDashboard } from "./pages/admin";
import { CampaignerDashboard } from "./pages/campaigner";
import { AdminPrivateRoute } from "./components/PrivateRoute/AdminPrivateRoute";
import { socket } from "./utils/socketClient";

const App: React.FC = () => {

  useEffect(() => {
    socket.on("init", () => {
      console.log("connected");
    });
    socket.emit("init", { data: "data-============" });
  }, []);

  return (
    <Provider>
      <Layout>
        <Router>
          <Home path="/" />
          <BrowseFundriser path="browse-campaign" />
          <HowItWorks path="how-sahaaya-works" />
          <StartFundRiser path="start-campaign" />
          <Register path="register" />
          <Login path="login" />
          <AdminPrivateRoute path="admin" component={AdminDashboard}>
            <AdminDashboard path="dashboard" />
          </AdminPrivateRoute>
          <PrivateRoute path="dashboard" component={CampaignerDashboard}/>
          <NotFound path="/:statuscode" default />
        </Router>
      </Layout>
    </Provider>
  );
};

export default App;
