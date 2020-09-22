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
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            JSON.parse(sessionStorage.getItem("user")) !== null ? (
              JSON.parse(sessionStorage.getItem("user"))?.isAdmin ? (
                <Redirect to="/dashboard" />
              ) : (
                <Redirect to="/assembly" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/register"
          render={() =>
            JSON.parse(sessionStorage.getItem("user")) ? (
              JSON.parse(sessionStorage.getItem("user")).isAdmin ? (
                <Redirect to="/dashboard" />
              ) : (
                <Redirect to="/assembly" />
              )
            ) : (
              <Register />
            )
          }
        />
        <Route
          exact
          path="/users"
          render={() =>
            JSON.parse(sessionStorage.getItem("user"))?.isAdmin ? (
              <Users />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          render={() =>
            JSON.parse(sessionStorage.getItem("user"))?.isAdmin ? (
              <Dashboard />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/assembly"
          render={() =>
            JSON.parse(sessionStorage.getItem("user")) ? (
              <Assembly />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/vr"
          render={() =>
            JSON.parse(sessionStorage.getItem("user")) ? <VR /> : <Login />
          }
        />
        <Route
          exact
          path="/ranking"
          render={() =>
            JSON.parse(sessionStorage.getItem("user")) ? <Ranking /> : <Login />
          }
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
