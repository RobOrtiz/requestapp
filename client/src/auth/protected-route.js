import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingScreen  from "../components/LoadingScreen";

// This parent component blocks routes/pages from being accessed by users who are not logged in
const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <LoadingScreen />,
    })}
    {...args}
  />
);

export default ProtectedRoute;