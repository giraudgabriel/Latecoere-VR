import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import VR from "./pages/VR";
import Login from "./pages/Login";
import Assembly from "./pages/Assembly";
import Register from "./pages/Register";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import Ranking from "./pages/Ranking";

export default function Routes() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const isAdmin = user && user.isAdmin;

  const goBackToLogin = (route, verifyAdmin) => {
    if (!user || (verifyAdmin && !isAdmin)) {
      return <Redirect to="/" />;
    }
    return route;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route
          exact
          path="/users"
          render={() => goBackToLogin(<Users />, true)}
        />
        <Route
          exact
          path="/dashboard"
          render={() => goBackToLogin(<Dashboard />, true)}
        />
        <Route
          exact
          path="/assembly"
          render={() => goBackToLogin(<Assembly />, false)}
        />
        <Route exact path="/vr" render={() => goBackToLogin(<VR />, false)} />
        <Route
          exact
          path="/ranking"
          render={() => goBackToLogin(<Ranking />, false)}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
