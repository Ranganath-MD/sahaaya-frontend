import React from "react";
import { Provider } from "./context/index";
import { Layout } from "./components";
import { Router } from "@reach/router";
import { NotFound } from "./pages/notFound";
import { Home } from "./pages/home";
import { BrowseFundriser } from "./pages/browseCampaigns";
import { HowItWorks } from "./pages/howitWorks";
import { StartFundRiser } from "./pages/startCampaign";

const App: React.FC = () =>  {

  return (
    <Provider>
      <Layout>
        <Router>
          <Home path="/" />
          <BrowseFundriser path="browse-campaign" />
          <HowItWorks path="how-sahaaya-works" />
          <StartFundRiser path="start-campaign" />
          <NotFound default/>
        </Router>
      </Layout>
    </Provider>
  );
};

export default App;
