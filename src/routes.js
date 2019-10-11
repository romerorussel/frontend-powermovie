import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Index from './pages/Index';
import Detalhes from './pages/Detalhes/detalhes';
import New from './pages/New';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/detalhes/:movie_id" component={Detalhes} />
                <Route path="/cadastro" component={New} />
            </Switch>
        </BrowserRouter>
    );

}