import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard";
import VRScene from "./components/VRScene";
import Login from "./components/Login";
import Assembly from "./components/Assembly";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/assembly" component={Assembly}/>
                <Route path="/vr" component={VRScene}/>
            </Switch>
        </BrowserRouter>
    );
}
