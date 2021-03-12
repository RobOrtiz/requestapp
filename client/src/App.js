import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import DJSignUp from "./pages/DJSignUp";
import DJHome from "./pages/DJHome";
import DJRequests from "./pages/DJRequests";
import DJActivity from "./pages/DJActivity";
import DJProfile from "./pages/DJProfile";
import Landing from "./pages/Landing";
import RequestPage from "./pages/RequestPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import { Auth0Provider } from "@auth0/auth0-react";
import ProtectedRoute from "../src/auth/protected-route";



// Auth0
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function App() {

  return (
    <Router>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
      >
        <div>
          <Switch>
            <Route exact path={["/", "/dj"]}>
              <Landing />
            </Route>
            {/* Customer-specific Routes */}
            <Route exact path="/request">
              {/* Select a DJ or Event for customer */}
              <RequestPage />
            </Route>
            <Route exact path="/request/:djid/:eventid">
              {/* Request page for customer */}
            </Route>
            <Route exact path="/request/confirmation">
              {/* Confirmation page for customer */}
              <ConfirmationPage />
            </Route>
            
            {/* DJ-specific Routes */}
            <ProtectedRoute exact path="/dj/signup" component={DJSignUp}></ProtectedRoute>
            <ProtectedRoute exact path="/dj/dashboard" component={DJHome}></ProtectedRoute>
            <ProtectedRoute exact path="/dj/requests" component={DJRequests}></ProtectedRoute>
            <ProtectedRoute exact path="/dj/activity" component={DJActivity}></ProtectedRoute>
            <ProtectedRoute exact path="/dj/profile" component={DJProfile}></ProtectedRoute>
            
            <Route>{/* <NoMatch /> */}</Route>
          </Switch>
        </div>
      </Auth0Provider>
    </Router>
  );
}

export default App;
