import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";

// Auth0
// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// ReactDOM.render(
//   <Auth0Provider
//     domain={domain}
//     clientId={clientId}
//     redirectUri={window.location.origin}>
//     <App />
//   </Auth0Provider>,
//   document.getElementById("root")
// );

ReactDOM.render(
    <App />,
  document.getElementById("root")
);

registerServiceWorker();
