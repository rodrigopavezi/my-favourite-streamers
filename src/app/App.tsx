import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Redirect from "features/auth/components/Redirect";
import HomeContainer from "features/home/components/HomeContainer";
import { Grommet } from "grommet";
export default function App() {
  return (
    <Grommet>
      <Router>
        <Switch>
          <Route path="/redirect">
            <Redirect />
          </Route>
          <Route path="/">
            <HomeContainer />
          </Route>
        </Switch>
      </Router>
    </Grommet>
  );
}
