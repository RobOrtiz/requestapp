import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import DJSignUp from "./pages/DJSignUp";
import DJHome from "./pages/DJHome";
import DJRequests from "./pages/DJRequests";
import DJActivity from "./pages/DJActivity";
import DJProfile from "./pages/DJProfile";
import Landing from "./pages/Landing";
import SelectDj from "./pages/SelectDj";
import RequestPage from "./pages/RequestPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import SuccessPage from "./pages/Success";
import NoMatch from "./pages/NoMatch";
import EditProfile from "./pages/EditProfile";

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
        useRefreshTokens={true}
      >
        <div>
          <Switch>
            <Route exact path={["/", "/dj"]}>
              <Landing />
            </Route>
            {/* Customer-specific Routes */}
            <Route exact path="/request">
              {/* Select a DJ or Event for customer */}
              <SelectDj />
            </Route>
            <Route exact path="/request/:djid">
              {/* Request page for customer */}
              <RequestPage />
            </Route>
            <Route exact path="/request/confirmation/:djid">
              {/* Confirmation page for customer */}
              <ConfirmationPage />
            </Route>
            <Route exact path="/request/success/:djid">
              {/* Confirmation page for customer */}
              <SuccessPage />
            </Route>
            
            {/* DJ-specific Routes */}
            <ProtectedRoute exact path="/dj/signup" component={DJSignUp}></ProtectedRoute>
            <ProtectedRoute exact path="/dj/dashboard" component={DJHome}></ProtectedRoute>
            <ProtectedRoute exact path="/dj/requests" component={DJRequests}></ProtectedRoute>
            <ProtectedRoute exact path="/dj/activity" component={DJActivity}></ProtectedRoute>
            <ProtectedRoute exact path="/dj/profile" component={DJProfile}></ProtectedRoute>
            <ProtectedRoute exact path="/dj/editprofile" component={EditProfile}></ProtectedRoute>
            
            <Route><NoMatch /></Route>
          </Switch>
        </div>
      </Auth0Provider>
    </Router>
  );
}

export default App;
