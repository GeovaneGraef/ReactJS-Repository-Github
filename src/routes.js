import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Sobre from './pages/Sobre';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/sobre-nos/:repository" component={Sobre} />
            </Switch>
        </BrowserRouter>
    );
}