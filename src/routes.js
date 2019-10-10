import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Index from './pages/Index';
import Detalhes from './pages/Detalhes/detalhes';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/detalhes/:movie_id" component={Detalhes} />
            </Switch>
        </BrowserRouter>
    );

}