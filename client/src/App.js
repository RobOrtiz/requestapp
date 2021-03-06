import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import DJSignUp from "./pages/DJSignUp";
import DJHome from "./pages/DJHome";
import DJRequests from "./pages/DJRequests";
import DJActivity from "./pages/DJActivity";
import DJProfile from "./pages/DJProfile";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Nav /> */}
          <Switch>
            <Route exact path={["/", "/request"]}></Route>
            <Route exact path="/request/:djid"></Route>
            <Route exact path="/request/:djid/:requestid"></Route>
            <Route exact path="/request/:djid/:confirmation"></Route>
            <Route exact path="/dj">
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
