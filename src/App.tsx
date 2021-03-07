import React from "react";
import { Provider } from "./context/index";
import { Layout } from "./components";
import { Router } from "@reach/router";
import { NotFound } from "./pages/notFound";
import { Home } from "./pages/home";
import { BrowseFundriser } from "./pages/browseCampaigns";
import { HowItWorks } from "./pages/howitWorks";
import { StartFundRiser } from "./pages/startCampaign";
import { Login } from "./pages/userAuth/loginComponent";
import { Register } from "./pages/userAuth/register";

const App: React.FC = () => {
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
          <NotFound path="/:statuscode" default />
        </Router>
      </Layout>
    </Provider>
  );
};

export default App;
