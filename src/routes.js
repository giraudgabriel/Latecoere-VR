import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const fallbackRender = ({
    shouldBeLogged = null,
    fallbackRouteLogin = "/",
    shouldBeAdmin = null,
    fallbackRouteAdmin = "/",
    component = null,
  }) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const isAdmin = user != null && user?.isAdmin;
    if (shouldBeLogged && !user) {
      return <Redirect to={fallbackRouteLogin ?? "/"} />;
    }

    if (shouldBeAdmin && fallbackRouteAdmin) {
      if (isAdmin) return component;
      return <Redirect to={fallbackRouteAdmin} />;
    }

    return component;
  };

  return (
    <>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/users"
            render={() =>
              fallbackRender({
                component: <Users />,
                shouldBeAdmin: true,
              })
            }
          />
          <Route
            exact
            path="/dashboard"
            render={() =>
              fallbackRender({
                component: <Dashboard />,
                shouldBeAdmin: true,
              })
            }
          />
          <Route
            exact
            path="/assembly"
            render={() =>
              fallbackRender({
                component: <Assembly />,
                shouldBeLogged: true,
              })
            }
          />
          <Route
            exact
            path="/vr"
            render={() =>
              fallbackRender({
                component: <VR />,
                shouldBeLogged: true,
              })
            }
          />
          <Route
            exact
            path="/ranking"
            render={() =>
              fallbackRender({ shouldBeLogged: true, component: <Ranking /> })
            }
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
