import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Nav /> */}
          <Switch>
            <Route exact path={["/", "/request"]}>
              {/* page container */}
              <div className="App">
                <div className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                  To get started, edit <code>src/App.js</code> and save to
                  reload.
                </p>
              </div>
            </Route>
            <Route exact path="/request/:djid"></Route>
            <Route exact path="/request/:djid/:requestid"></Route>
            <Route exact path="/request/:djid/:confirmation"></Route>
            <Route exact path="/request/dj"></Route>
            <Route exact path="/request/dj/event"></Route>
            <Route exact path="/request/dj/event/:eventid"></Route>
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
