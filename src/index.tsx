import "styles/global.scss";
import { createRoot } from "react-dom/client";
import App from "App";
import { BrowserRouter } from "react-router-dom";

const app = document.getElementById("root");

// create a root
const root = createRoot(app as Element);

//render app to root
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

