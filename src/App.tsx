import React from "react";
import { Provider } from "./context/index";
import { Layout } from "./components";
import { Router } from "@reach/router";
import { Dummy } from "./pages/users/dummy";
import { Home } from "./pages/users/home";

const App: React.FC = () =>  {

  return (
    <Provider>
      <Layout>
        <Router>
          <Home path="/" />
          <Dummy path="dummy" />
        </Router>
      </Layout>
    </Provider>
  );
};

export default App;
