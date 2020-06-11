import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Dashboard from './Dashboard';
import VRScene from './components/VRScene';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={VRScene}/>
                <Route path="/dashboard" component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    )
}