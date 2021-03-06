import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import DJSignUp from "./pages/DJSignUp";
import DJHome from "./pages/DJHome";
import DJRequests from "./pages/DJRequests";
import DJActivity from "./pages/DJActivity";
import DJProfile from "./pages/DJProfile";
import Landing from "./pages/Landing";
// import NoMatch from "./pages/NoMatch";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path={["/", "/dj"]}>
              <Landing />
            </Route>
            {/* Customer-specific Routes */}
            <Route exact path="/request">
              {/* Select a DJ or Event for customer */}
            </Route>
            <Route exact path="/request/:djid/:eventid">
              {/* Request page for customer */}
            </Route>
            <Route exact path="/request/:djid/:confirmation">
              {/* Confirmation page for customer */}
            </Route>
            {/* DJ-specific Routes */}
            <Route exact path="/dj/signin">
              <DJSignUp />
            </Route>
            <Route exact path="/dj/dashboard">
              <DJHome />
            </Route>
            <Route exact path="/dj/requests">
              <DJRequests />
            </Route>
            <Route exact path="/dj/activity">
              <DJActivity />
            </Route>
            <Route exact path="/dj/profile">
              <DJProfile />
            </Route>
            <Route>
              {/* <NoMatch /> */}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
