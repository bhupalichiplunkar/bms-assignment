import React, { Component } from "react";
import { Redirect, Switch } from "react-router";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Assignment1 from "./organisms/assignment-1/Assignment1";
import Assignment2 from "./organisms/assignment-2/Assignment2";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header>
              <div className="bg-black flex-hbox flex-cross-center pd-lg">
                <div className="flex-auto pd-r-lg">
                  <NavLink
                    className="pd-b-sm text-upper"
                    activeClassName="navlink-selected"
                    to="/assignment-1"
                  >
                    Assignment 1
                  </NavLink>
                </div>
                <div className="flex-auto">
                  <NavLink
                    className="pd-b-sm text-upper"
                    activeClassName="navlink-selected"
                    to="/assignment-2"
                  >
                    Assignment 2
                  </NavLink>
                </div>
              </div>
            </header>
            <main>
              <div className="main-height">
                <Switch>
                  <Route
                    path="/"
                    exact
                    render={() => <Redirect to="/assignment-1" />}
                  />
                  <Route path="/assignment-1" component={Assignment1} />
                  <Route path="/assignment-2" component={Assignment2} />
                </Switch>
              </div>
            </main>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
